// import required functions, classes, variables from main script file
import { setCookie, getCookie, isPassValid, isUserNameValid, isEmailValid, User, todoUsers, showNotificationBar, resetNotificationBar, showInputError, resetInputError } from "./script.js";

let regForm = document.getElementById("register-form");

// if user is already logged in, redirect him to todo page

if (todoUsers.validateLoginCookies(getCookie("user_id"), getCookie("username"))) {
    window.location.href = "./todo.html";
}

regForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let fNameInput = document.getElementById("reg-fName"),
        lNameInput = document.getElementById("reg-lName"),
        emailInput = document.getElementById("reg-email"),
        userInput = document.getElementById("reg-username"),
        passInput = document.getElementById("reg-password"),
        regAlert = document.getElementById("reg-alert"),
        fName = fNameInput.value,
        lName = lNameInput.value,
        emailAddress = emailInput.value,
        userName = userInput.value,
        passWord = passInput.value;

    // reset notification bar and inputs classes
    resetNotificationBar();
    resetInputError(fNameInput, lNameInput, emailInput, userInput, passInput);

    // wait 100ms to let the animation happen
    setTimeout(function () {
        // check if all inputs are given
        if (fName && lName && emailAddress && userName && passWord) {
            // validate password
            let passValidation = isPassValid(passWord);

            // if pass is valid
            if (passValidation[0]) {
                // validate email
                let emailValidation = isEmailValid(emailAddress);

                // if email is valid
                if (emailValidation[0]) {
                    // validate username
                    let userValidation = isUserNameValid(userName);

                    // if username is valid
                    if (userValidation[0]) {
                        let userDetails = new User(todoUsers.usersCount + 1, fName, lName, emailAddress, userName, passWord);
                        // create an account
                        let accountCreate = todoUsers.createAccount(userDetails);

                        if (accountCreate.isCreated) {
                            regForm.classList.add("animate__hinge");
                            setTimeout(() => {
                                setCookie("user_id", userDetails.id, 3);
                                setCookie("username", userDetails.userName, 3);
                                window.location.href = "./todo.html";
                            }, 1950);
                        } else {
                            // show alert bar with the message returned from create account
                            showNotificationBar(accountCreate.error, regAlert);
                        }
                    }

                    // if username is not valid
                    else {
                        // show alert bar with the message returned from user validation
                        showNotificationBar(userValidation[1], regAlert);
                        // show input error on user input
                        showInputError(userInput);
                    }
                }
                // if email is not valid
                else {
                    // show alert bar with the message returned from email validation
                    showNotificationBar(emailValidation[1], regAlert);
                    // show input error on email input
                    showInputError(emailInput);
                }
            }
            // if pass is not valid
            else {
                // show alert bar with the message returned from password validation
                showNotificationBar(passValidation[1], regAlert);
                // show input error on password input
                showInputError(passInput);
            }
        }
        // if some elements values not given
        else {
            // show notification bar
            showNotificationBar("Please fill all fields.", regAlert);
            // for each input who's value not given, show input error
            [fNameInput, lNameInput, emailInput, userInput, passInput].map((element) => {
                if (!element.value) {
                    showInputError(element);
                }
            });
        }
    }, 100);
});
