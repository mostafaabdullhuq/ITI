// import required functions, classes, variables from main script file

import { setCookie, getCookie, todoUsers, showNotificationBar, resetNotificationBar, showInputError, resetInputError } from "./script.js";

// select the login form
let loginForm = document.getElementById("login-form");

// if user is already logged in, redirect him to todo page
if (todoUsers.validateLoginCookies(getCookie("user_id"), getCookie("username"))) {
    window.location.href = "./docs/todo.html";
}

// add an event listener when the login form is submitted
loginForm.addEventListener("submit", (e) => {
    console.log("here");
    // prevent the submit behavior
    e.preventDefault();
    // select username input, password input, alert notification container and alert container
    let loginUserNameInput = document.getElementById("login-username"),
        loginPassWordInput = document.getElementById("login-password"),
        loginAlert = document.getElementById("login-alert"),
        // get username and password values
        userName = loginUserNameInput.value,
        passWord = loginPassWordInput.value;

    // reset notification bar and inputs classes
    resetNotificationBar();
    resetInputError(loginUserNameInput, loginPassWordInput);

    // wait 100ms then validate
    setTimeout(function () {
        // if username and password is given
        if (userName && passWord) {
            // validate username and password
            let loginDetails = todoUsers.loginAccount(userName, passWord);
            if (loginDetails) {
                loginForm.classList.add("animate__hinge");
                setTimeout(() => {
                    setCookie("user_id", loginDetails.id, 3);
                    setCookie("username", loginDetails.userName, 3);
                    window.location.href = "./docs/todo.html";
                }, 1950);
            } else {
                showNotificationBar("Incorrect username or password.", loginAlert);
                showInputError(loginUserNameInput, loginPassWordInput);
            }
        } else {
            showNotificationBar("Please fill all required fields.", loginAlert);
            showInputError(loginUserNameInput, loginPassWordInput);
        }
    }, 100);
});
