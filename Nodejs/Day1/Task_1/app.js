const http = require("http"),
    fileHandler = require("fs"),
    port = 8080;

// create new server and start listening to port
app = http.createServer(routeHandler).listen(port);

// function to handle request and response to server
function routeHandler(request, response) {
    // get request url

    let url = request.url;

    // route the urls
    if (url === "/" || url === "/index.html" || url === "/home") {
        requestHandler("/index.html", response);
    } else if (url === "/about") {
        requestHandler("/about.html", response);
    } else if (url === "/contact") {
        requestHandler("/contact.html", response);
    }
    // if page not found in routes, 404 error
    else {
        response.writeHead(404, {
            "Content-Type": "text/html",
        });
    }
}

// function to handle requests sent from routehandler
function requestHandler(fileName, response) {
    // get the content of the required file
    fileHandler.readFile(__dirname + fileName, (error, htmlData) => {
        // set response headers
        response.writeHead(200, {
            "Content-Type": "text/html",
        });
        // write the file data into the document
        response.write(htmlData);
        // end the request
        response.end();
    });
}
