const express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    port = 8080;

// start app
app.listen(port);

let isPassValid = (passWord) => {
    if (passWord) {
        // check if password is less than 8 characters
        if (passWord.length < 8 || passWord.length > 30) return [false, "Password must be [8-30] characters."];
        // check if password contains small letters
        else if (passWord.search(/[a-z]/) < 0) return [false, "Password must contain one or more small letter."];
        // check if password contains capital letters
        else if (passWord.search(/[A-Z]/) < 0) return [false, "Password must contain one or more capital letter."];
        // check if password contains digits
        else if (passWord.search(/[\d]/) < 0) return [false, "Password must contain one or more digit."];
        // check if password contains special characters
        else if (passWord.search(/[\$\!\_\-\&\%\?\@]/) < 0) return [false, "Password must contain one or more special character [$,!,_,-,&,%,?,@]."];
        // check for whitespaces in password
        else if (passWord.search(/\s/) >= 0) return [false, "Password cannot have whitespace."];
        // if all requirements are met.
        else return [true, ""];
    }
    // if password is false or empty, return false and a warning
    return [false, "Please enter a password."];
};

// check for username if less than 8 characters
let isUserNameValid = (userName) => {
    // check if username is true and not empty
    return userName
        ? // if condition met, check if username have whitespaces.
          userName.search(/\s/) >= 0
            ? // if condition met, return false
              [false, "Username cannot have whitespace."]
            : // if condition doesn't met, check for username length
            userName.length >= 5 && userName.length <= 16
            ? // if username length is between 8 and 16 return true
              [true, ""]
            : // if username length doesn't met the requirements, return false
              [false, "Username must be 8 to 16 characters."]
        : // if username is empty or false
          [false, "Please enter a username."];
};

let isEmailValid = (emailAddress) => {
    // check if email address is true and not empty
    return emailAddress // if email met the conditions
        ? // check for email validation by regex
          emailAddress.search(/^([a-zA-Z1-9]*\.?\_?\-?)*@([a-zA-Z1-9]*\.[a-zA-Z1-9]*){1,2}$/) == 0
            ? // if email pass the regex validation, return true
              [true, ""]
            : // if email doesn't pass the regex validation, return false
              [false, "Please enter a valid email address"]
        : // if email is empty or false, return false
          [false, "Please enter an email address."];
};

let formParser = bodyParser.urlencoded();

// load html files

// when user enters homepage (login page)
app.get("/index.html", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

// when user get registration page
app.get("/docs/register.html", (req, response) => {
    response.sendFile(__dirname + "/docs/register.html");
});

// when user submit login form
app.post("/login", formParser, function (request, response) {
    let userName = request.body.username,
        passWord = request.body.password,
        passValidation = isPassValid(passWord),
        userValidation = isUserNameValid(userName);
    if (passValidation[0] && userValidation[0] && userName == "admin" && passWord == "Admin@123") {
        response.sendFile(__dirname + "/docs/todo.html");
    } else {
        if (!userValidation[0] || !passValidation[0]) {
            if (passValidation[0] === false) response.send(`<h1>${passValidation[1]}</h1>`);
            if (userValidation[0] === false) response.send(`<h1>${userValidation[1]}</h1>`);
        } else {
            response.send("<h1>Invalid username or password</h1>");
        }
    }
});

// when user submit registration form
app.post("/register", formParser, function (request, response) {
    let userName = request.body.username,
        passWord = request.body.password,
        email = request.body.email,
        firstName = request.body.fName,
        lastName = request.body.lName,
        passValidation = isPassValid(passWord),
        userValidation = isUserNameValid(userName),
        emailValidation = isEmailValid(email);

    if (passValidation[0] && userValidation[0] && emailValidation[0] && firstName && lastName) {
        response.sendFile(__dirname + "/docs/todo.html");
    } else {
        if (userValidation[0] === false) response.send(`<h1>${userValidation[1]}</h1>`);
        else if (passValidation[0] === false) response.send(`<h1>${passValidation[1]}</h1>`);
        else if (emailValidation[0] === false) response.send(`<h1>${emailValidation[1]}</h1>`);
        else if (!firstName) response.send("<h1>Please enter first name.</h1>");
        else if (!lastName) response.send("<h1>Please enter last name.</h1>");
    }
});

// when user enter todo list page redirect to home page to login
app.get("/docs/todo.html", (request, response) => {
    response.redirect("/index.html");
});

// load css files
app.get("/css/styles.css", (request, response) => {
    response.sendFile(__dirname + "/css/styles.css");
});

app.get("/css/bootstrap.min.css", (request, response) => {
    response.sendFile(__dirname + "/css/bootstrap.min.css");
});

// load js files
app.get("/js/bootstrap.min.js", (request, response) => {
    response.sendFile(__dirname + "/js/bootstrap.min.js");
});
app.get("/js/sweetalert2.js", (request, response) => {
    response.sendFile(__dirname + "/js/sweetalert2.js");
});
