// when page loads
window.onload = () => {
    //* login page
    let loginForm = document.getElementById("login-form");
    // if in login page
    if (loginForm) {
        // add an event listener when the login form is submitted
        loginForm.addEventListener("submit", (e) => {
            // prevent the submit behavior
            e.preventDefault();
            // get the username and password from the form
            let usernameInput = document.getElementById("username"),
                passwordInput = document.getElementById("password"),
                notfBar = document.getElementById("login-notification");

            // remove classes of notification bar if found
            notfBar.classList.remove("active");
            notfBar.classList.remove("animate__bounceIn");
            usernameInput.classList.remove("invalid");
            passwordInput.classList.remove("invalid");

            // wait 100ms then validate
            setTimeout(function () {
                if (usernameInput.value == "admin" && passwordInput.value == "123") {
                    loginForm.classList.add("animate__hinge");
                    setTimeout(() => {
                        window.location = "../docs/todo.html";
                    }, 1950);
                } else {
                    notfBar.classList.add("active");
                    notfBar.classList.add("animate__bounceIn");
                    usernameInput.classList.add("invalid");
                    passwordInput.classList.add("invalid");
                }
            }, 100);
        });
    }
    // if in todo page
    else {
        //* todo page

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
    }
};
