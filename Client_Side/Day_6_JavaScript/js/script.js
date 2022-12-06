// a function to create a new cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// a function to get a value of a specific cookie
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
// a function to delete a specific cookie
function deleteCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
}

// a function to validate password requirements
var isPassValid = (passWord) => {
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
var isUserNameValid = (userName) => {
    // check if username is true and not empty
    return userName
        ? // if condition met, check if username have whitespaces.
          userName.search(/\s/) >= 0
            ? // if condition met, return false
              [false, "Username cannot have whitespace."]
            : // if condition doesn't met, check for username length
            userName.length >= 8 && userName.length <= 16
            ? // if username length is between 8 and 16 return true
              [true, ""]
            : // if username length doesn't met the requirements, return false
              [false, "Username must be 8 to 16 characters."]
        : // if username is empty or false
          [false, "Please enter a username."];
};

// check for email validation
var isEmailValid = (emailAddress) => {
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

// class that contains alll users operations
class Users {
    // private property
    #usersName = "todo_members";
    constructor(usersList = []) {
        // users list
        this.usersList = usersList;
        // if there's no users list with the same name in the local storage
        !localStorage.getItem(this.#usersName)
            ? // add the users list to the local storage
              this.syncUpload
            : // if there's already a users list in the local storage, sync it with the current one
              this.syncDownload;
    }

    /*
        a method to create a new user, returns an object contains boolean value represents the state of creation 
        and a text value contains the error if the state is false
    */

    // syncs the localstorage with the current users list
    get syncUpload() {
        localStorage.setItem(this.#usersName, JSON.stringify(this.usersList));
    }

    // syncs the current users list with the local storage
    get syncDownload() {
        this.usersList = JSON.parse(localStorage.getItem(this.#usersName));
    }
    createAccount(userData) {
        // initialize the return response object
        let response = {
            isCreated: true,
            error: "",
        };
        // loop through all users
        this.usersList.forEach((user) => {
            // if the user's email is the same as the email of the user being created
            if (userData.emailAddress == user.emailAddress) {
                // cannot create account because email duplication
                response.isCreated = false;
                response.error = "Email Address is already exists.";
            }
            // if the user's username is the same as the username of the user being created
            if (userData.userName == user.userName) {
                // cannot create account because username duplication
                response.isCreated = false;
                response.error = "Username is already exists.";
            }
        });

        if (response.isCreated) {
            this.usersList.push(userData);
            console.log(this.usersList);
            localStorage.setItem(this.#usersName, JSON.stringify(this.usersList));
        }
        // return the response object
        return response;
    }

    // a method to check for username and password at login
    loginAccount(userName, passWord) {
        /*
        find if there's a user with the same username and password in the users list
        if there's a user return the user, if user not found return false
        */
        return this.usersList.find((user) => {
            return user.userName === userName && user.passWord === passWord;
        });
    }

    get usersCount() {
        return this.usersList.length;
    }

    // method to sync user todos changes
    syncUsersData(userID, newTodosList) {
        // loop on each user in users list
        this.usersList.forEach((user) => {
            // if the user id is the same as the given user id
            if (user.id == userID) {
                // update the list of tweets for the given user
                user.todosList = newTodosList;
            }
        });

        // sync with the local storage
        this.syncUpload;
    }
    validateLoginCookies(userID, userName) {
        return this.usersList.find((user) => user.id == userID && user.userName == userName);
    }
    logOut(...cookiesNames) {
        // set cookies value to 0 and 0 and expire time to 0 to clear it

        cookiesNames.map((cookie) => {
            setCookie(cookie, 0, 0);
        });
    }
}
// create new Users Object to store all website users
var todoUsers = new Users();

// class that represents one user only
class User {
    // initialize the user todos list
    todosList = [];
    constructor(id, firstName, lastName, emailAddress, userName, passWord) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.passWord = passWord;
    }

    // property to get the list of user todos
    get todosList() {
        return this.todosList;
    }

    // property to get the todos count of the user
    get todosCount() {
        return this.todosList.length;
    }

    // method to add new todo to user todo list
    addTodo(todo) {
        // set an id to the todo
        todo.id = this.todosCount + 1;
        // add the todo to the user todos list
        this.todosList.push(todo);
        // replace the user new todos with the old todos
        todoUsers.syncUsersData(this.id, this.todosList);
    }

    // method to delete specific user todo
    deleteTodo(todoID) {
        this.todosList.forEach((todo, index) => {
            if (todo.id === todoID) {
                this.todosList.splice(index, 1);
            }
        });
        // replace the user new todos with the old todos
        todoUsers.syncUsersData(this.id, this.todosList);
    }

    // method to change specific todo complete status
    changeTodoStatus(todoID, isCompleted) {
        this.todosList.forEach((todo) => {
            if (todo.id == todoID) {
                todo.isCompleted = isCompleted;
            }
        });
        // replace the user new todos with the old todos
        todoUsers.syncUsersData(this.id, this.todosList);
    }

    // method to change specific todo text
    changeTodoText(todoID, newText) {
        this.todosList.forEach((todo) => {
            if (todo.id == todoID) {
                todo.text = newText;
            }
        });
        // replace the user new todos with the old todos
        todoUsers.syncUsersData(this.id, this.todosList);
    }
}

// create admin account
todoUsers.createAccount(new User(todoUsers.usersCount + 1, "Admin", "Admin", "admin@admin.com", "admin", "Admin@123"));

// todos class
class Todo {
    constructor(text) {
        this.id = false;
        this.text = text;
        this.isCompleted = false;
    }
}

// get each page main element
let loginForm = document.getElementById("login-form"),
    regForm = document.getElementById("register-form"),
    todoContainer = document.getElementById("todos"),
    notficationBar = document.getElementById("notification-bar");

// a function to show invalid alert
function showNotificationBar(alertText, alertElement) {
    alertElement.textContent = alertText;
    notficationBar.classList.add("active");
    notficationBar.classList.add("animate__bounceIn");
}
// a function to hide invalid alert
function resetNotificationBar() {
    // remove classes
    notficationBar.classList.remove("active");
    notficationBar.classList.remove("animate__bounceIn");
}

// a function to show invalid effect on elements
function showInputError(...errorElements) {
    // add invalid class for all elements
    errorElements.map((element) => {
        element.classList.add("invalid");
    });
}

// a function to hide invalid effect on elements
function resetInputError(...errorElements) {
    // remove invalid class for all elements
    errorElements.map((element) => {
        element.classList.remove("invalid");
    });
}

//! if in login page
if (loginForm) {
    console.log("login page");
    // add an event listener when the login form is submitted
    loginForm.addEventListener("submit", (e) => {
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
                        console.log(document.cookie);
                        window.location = "../docs/todo.html";
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
}
//! if in register page
else if (regForm) {
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
                            // create an account
                            let accountCreate = todoUsers.createAccount(new User(todoUsers.usersCount + 1, fName, lName, emailAddress, userName, passWord));

                            if (accountCreate.isCreated) {
                                window.location = "../docs/todo.html";
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
}

//! if in todo page
else if (todoContainer) {
    // check if there's cookies in the session, if so get the user with cookies
    let user = todoUsers.validateLoginCookies(getCookie("user_id"), getCookie("username"));
    if (user) {
        window.scrollTo(0, 0);
        let navbar = document.querySelector("nav.navbar"),
            todosCountSpan = document.getElementById("todos-count"),
            completedTodosSpan = document.getElementById("completed-count"),
            logoutButton = document.getElementById("logout"),
            noTodosMessage = document.getElementById("no-todos-message");

        // get user todos
        let userTodos = user.todosList;

        // if user have todos
        if (user.todosCount > 0) {
            // remove classes of no todos message if found
            noTodosMessage.classList.remove("animate__bounceIn");
            noTodosMessage.classList.remove("active");

            // create show-todo-controls, controls container, and add classes and text to them
            let todosList = document.getElementById("todos-list"),
                cardsContainer = document.getElementById("cards-container"),
                showTodoControls = document.createElement("i"),
                controlsContainer = document.createElement("ul"),
                editTodoLi = document.createElement("li"),
                deleteTodoLi = document.createElement("li");
            showTodoControls.classList.add("fa-solid", "fa-ellipsis", "show-todo-controls");
            controlsContainer.classList.add("list-group", "list-group-flush", "controls-container");
            editTodoLi.classList.add("todo-control", "list-group-item", "edit-item");
            deleteTodoLi.classList.add("todo-control", "list-group-item", "delete-item");
            editTodoLi.appendChild(document.createTextNode("Edit"));
            deleteTodoLi.appendChild(document.createTextNode("Delete"));
            controlsContainer.appendChild(editTodoLi);
            controlsContainer.appendChild(deleteTodoLi);

            // for each todo in user todos
            userTodos.map((todo) => {
                // create todo container
                let todoContainer = document.createElement("li");
                // add classes to the card container, and check if todo is completed to add completed class
                todoContainer.classList.add("todo", "list-group-item", todo.isCompleted ? "completed" : "");
                // add todo id
                todoContainer.setAttribute("data-todo-id", todo.id);
                // create text node contains the todo text and append it to the container
                todoContainer.appendChild(document.createTextNode(todo.text));
                // append todo controls and show controls
                todoContainer.appendChild(showTodoControls);
                todoContainer.appendChild(controlsContainer);
                todosList.appendChild(todoContainer);
            });
            // show the cards container
            cardsContainer.classList.add("active");
        }
        // if user don't have todos
        else {
            noTodosMessage.classList.add("animate__bounceIn");
            noTodosMessage.classList.add("active");
        }

        // get all todos
        let todos = document.querySelectorAll("li.todo"),
            // get all todos controls dots
            todoShowControls = document.querySelectorAll("i.show-todo-controls"),
            // get all todos edit controls
            editItem = document.querySelectorAll("li.edit-item"),
            // get all todos delete controls
            deleteItem = document.querySelectorAll("li.delete-item");

        // for each todo
        todos.forEach(function (todo) {
            // when mouse move in the todo item, show the controls bullets
            todo.addEventListener("mouseenter", function (e) {
                this.querySelector(".show-todo-controls").classList.add("active");
            });

            // when mouse move out the todo item, hide the controls bullets
            todo.addEventListener("mouseleave", function (e) {
                // console.log(e);
                this.querySelector(".show-todo-controls").classList.remove("active");
            });
            // when any todo is clicked
            todo.addEventListener("click", function (e) {
                // if the todo is not in edit mode and the controls popup is not visible and not clicked on show controls bullets
                if (!this.hasAttribute("contenteditable") && !this.querySelector("ul").classList.contains("active") && !e.target.classList.contains("show-todo-controls")) {
                    // toggle the completed class
                    this.classList.toggle("completed");
                }
            });
            ////////todo
            todo.addEventListener("blur", function () {
                let todoText = "";
                document.querySelector("li.todo[contenteditable]").childNodes.forEach(function (child) {
                    console.log(child.nodeType);
                });
                this.toggleAttribute("contenteditable");
            });
        });
        todoShowControls.forEach(function (todoShow) {
            todoShow.addEventListener("click", function (e) {
                console.log("clicked");

                this.parentElement.querySelector("ul.controls-container").classList.toggle("active");
            });
        });
        editItem.forEach(function (item) {
            item.addEventListener("click", function (e) {
                this.parentElement.parentElement.toggleAttribute("contenteditable");
                this.focus();
                this.parentElement.classList.remove("active");
            });
        });
        deleteItem.forEach(function (item) {
            item.addEventListener("click", function (e) {
                this.parentElement.parentElement.remove();
                this.parentElement.classList.toggle("active");
            });
        });
        logoutButton.addEventListener("click", (e) => {
            todoUsers.logOut("user-id", "username");
        });
    }
    // if cookies not validated, redirect to login page
    else {
        window.location = "../index.html";
    }
}
