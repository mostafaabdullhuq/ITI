const express = require("express"),
    fs = require("fs"),
    app = express(),
    bodyParser = require("body-parser"),
    bodyParserForm = bodyParser.urlencoded();

app.listen(8080);
// set engine to ejs
app.set("view engine", "ejs");

function loadFiles() {
    fs.readFile("books.db", (err, data) => {
        if (!err) {
            books = JSON.parse(data);
        }
    });

    fs.readFile("settings.db", (err, data) => {
        if (!err) {
            settings = JSON.parse(data);
        }
    });
}

function saveFiles() {
    fs.writeFile("books.db", JSON.stringify(books), (err) => console.log(err));
    fs.writeFile("settings.db", JSON.stringify(settings), (err) => console.log(err));
}

let books = [],
    settings = {};

loadFiles();

// home page
app.get("/", function (req, res) {
    // Path: views/index.ejs
    res.render("index.ejs", {
        books,
        settings,
    });
});

// load css style file
app.get("/style.css", function (req, res) {
    res.sendFile(__dirname + "/style.css");
});

// load bootstrap files

app.get("/bootstrap.min.css", function (req, res) {
    res.sendFile(__dirname + "/node_modules/bootstrap/dist/css/bootstrap.min.css");
});

app.get("/bootstrap.bundle.min.js", function (req, res) {
    res.sendFile(__dirname + "/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js");
});

// load cover photo
app.get("/book-cover-placeholder.png", function (req, res) {
    res.sendFile(__dirname + "/imgs/book-cover-placeholder.png");
});

// when user click on add new book + sign
app.get("/addbook", function (req, res) {
    // Path: views/bookcontrols.ejs
    res.render("bookcontrols.ejs", {
        settings,
        pageTitle: "Add New Book",
        book: false,
    });
});

// when user submit add new book
app.post("/addbook", bodyParserForm, function (req, res) {
    req.body.id = settings.idCounter + 1;
    settings.idCounter++;
    req.body.image = "/book-cover-placeholder.png";
    books.push(req.body);
    res.redirect("/addbook");
    saveFiles();
});

app.get("/deletebook", function (req, res) {
    // get the index of the book to be deleted from array using book id param
    let bookIndex = books.indexOf(
        books.filter((book) => {
            return +book.id === +req.query.id;
        })[0]
    );

    // remove from array
    books.splice(bookIndex, 1);
    saveFiles();
    // redirect to homepage
    res.redirect("/");
});

// when user click on edit book
app.get("/editbook", function (req, res) {
    // get book details for given id
    let bookDetails = books.filter((book) => {
        return +book.id === +req.query.id;
    })[0];

    res.render("bookcontrols.ejs", {
        settings,
        pageTitle: "Edit Book",
        book: bookDetails,
    });
});

// when user click on edit book
app.post("/editbook", bodyParserForm, function (req, res) {
    // get the index of the book to be deleted from array using book id param
    let bookIndex = books.indexOf(
        books.filter((book) => {
            return +book.id === +req.body.id;
        })[0]
    );
    books[bookIndex].title = req.body.title;
    books[bookIndex].author = req.body.author;
    saveFiles();
    res.redirect("/");
});

app.get("/search", function (req, res) {
    let searchResults = books.filter((book) => {
        return book.title.toLowerCase().includes(req.query.q.toLowerCase()) || book.author.toLowerCase().includes(req.query.q.toLowerCase());
    });

    res.render("index.ejs", {
        books: searchResults,
        settings,
    });
});
