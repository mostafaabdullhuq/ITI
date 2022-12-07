// a function to create a new cookie
export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// a function to get a value of a specific cookie
export function getCookie(cname) {
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
export function deleteCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
}

// a function to validate password requirements
export var isPassValid = (passWord) => {
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
export var isUserNameValid = (userName) => {
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
export var isEmailValid = (emailAddress) => {
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
export class Users {
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
    //! Users methods
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

    // a method to create a new user
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
            return user.userName.toLowerCase() === userName.toLowerCase() && user.passWord === passWord;
        });
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

    // a method that returns the count of users in this users object
    get usersCount() {
        return this.usersList.length;
    }

    //! User methods

    // a method that returns specific user todos count
    userTodosCount(user) {
        return user.todosList.length;
    }

    // a method that returns the list of todos for specific user
    userTodosList(user) {
        return user.todosList;
    }

    // method to add new todo to specific user todo list
    addTodo(user, todo) {
        // set an id to the todo
        todo.id = this.userTodosCount(user) + 1;
        // add the todo to the user todos list
        user.todosList.push(todo);
        // replace the user new todos with the old todos
        this.syncUsersData(user.id, user.todosList);

        return todo;
    }

    // method to delete specific user todo
    deleteTodo(user, todoID) {
        user.todosList.forEach((todo, index) => {
            if (todo.id == todoID) {
                user.todosList.splice(index, 1);
            }
        });
        // replace the user new todos with the old todos
        this.syncUsersData(user.id, user.todosList);
    }

    // method to change specific user todo complete status
    changeTodoStatus(user, todoID, isCompleted) {
        user.todosList.forEach((todo) => {
            if (todo.id == todoID) {
                todo.isCompleted = isCompleted;
            }
        });
        // replace the user new todos with the old todos
        this.syncUsersData(user.id, user.todosList);
    }

    // method to change specific user todo text
    changeTodoText(user, todoID, newText) {
        user.todosList.forEach((todo) => {
            if (todo.id == todoID) {
                todo.text = newText;
            }
        });
        // replace the user new todos with the old todos
        this.syncUsersData(user.id, user.todosList);
    }

    // get number of completed todos for specific user
    completedTodosCount(user) {
        // initialize count to 0
        let completedTodosCount = 0;

        // loop through each todo
        user.todosList.forEach((todo) => {
            // if the todo is completed
            if (todo.isCompleted) {
                // increment the counter
                completedTodosCount++;
            }
        });

        // return the completed count
        return completedTodosCount;
    }
}
// create new Users Object to store all website users
export var todoUsers = new Users();

// class that represents one user only
export class User {
    // initialize the user todos list
    constructor(id, firstName, lastName, emailAddress, userName, passWord) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.passWord = passWord;
        this.todosList = [];
    }
}

// if you want to create admin account to test
let admin = new User(todoUsers.usersCount + 1, "Admin", "Admin", "admin@admin.com", "admin", "123");
todoUsers.createAccount(admin);

// todos class
export class Todo {
    constructor(text) {
        this.id = false;
        this.text = text;
        this.isCompleted = false;
    }
}

// a function to show invalid alert
export function showNotificationBar(alertText, alertElement) {
    let notificationBar = document.getElementById("notification-bar");
    alertElement.textContent = alertText;
    notificationBar.classList.add("active");
    notificationBar.classList.add("animate__bounceIn");
}

// a function to hide invalid alert
export function resetNotificationBar() {
    let notificationBar = document.getElementById("notification-bar");
    // remove classes
    notificationBar.classList.remove("active");
    notificationBar.classList.remove("animate__bounceIn");
}

// a function to show invalid effect on elements
export function showInputError(...errorElements) {
    // add invalid class for all elements
    errorElements.map((element) => {
        element.classList.add("invalid");
    });
}

// a function to hide invalid effect on elements
export function resetInputError(...errorElements) {
    // remove invalid class for all elements
    errorElements.map((element) => {
        element.classList.remove("invalid");
    });
}
