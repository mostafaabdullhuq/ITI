// import required functions, classes, variables from main script file

import { getCookie, Todo, todoUsers } from "./script.js";

// get todos container
let todoContainer = document.getElementById("todos");

// check if there's cookies in the session, if so get the user object with cookies
var user = todoUsers.validateLoginCookies(getCookie("user_id"), getCookie("username"));

// if user returned
if (user) {
    // scroll to the top of the page

    // function to dynamically add event listner to show todo controls i
    function addShowTodoControlsEvents(showTodoControls) {
        // add event for click in show todo controls
        showTodoControls.addEventListener("click", function (e) {
            // toggle the active class in the edit and delete controls container
            this.parentElement.querySelector("ul.controls-container").classList.toggle("active");
        });
    }

    // function to dynamically add event listner to edit todo
    function addEditTodoEvents(user, editItem) {
        // add event for click in edit button
        editItem.addEventListener("click", function (e) {
            // remove animations from status spans
            updateStatusSpans();

            // find the parent todo li
            let parentTodoContainer = this.parentElement.parentElement;

            // make the parent todo editable
            parentTodoContainer.toggleAttribute("contenteditable");

            // hide the controls popup
            this.parentElement.classList.remove("active");

            // change todo status to non completed
            todoUsers.changeTodoStatus(user, parentTodoContainer.getAttribute("data-todo-id"), false);

            // remove the completed effect from todo
            parentTodoContainer.classList.remove("completed");

            // update status spans
            updateStatusSpans(user);
        });
    }

    // function to dynamically add event listner to delete todo
    function addDeleteTodoEvents(deleteItem) {
        // add event for click in delete todo button
        deleteItem.addEventListener("click", function (e) {
            // find the parent todo li
            let todoElement = e.path.find((eachElement) => {
                    return eachElement instanceof HTMLLIElement && eachElement.classList.contains("todo");
                }),
                // get the id of the todo
                todoID = todoElement.getAttribute("data-todo-id");

            // delete the todo from user todos
            todoUsers.deleteTodo(user, todoID);

            // animate the deletion
            todoElement.classList.add("animate__animated", "animate__bounceOutLeft");

            // wait 700ms then remove it from the document
            setTimeout(() => {
                todoElement.remove();

                // check if there's any todo left
                checkNoTodo();
            }, 500);

            // wait 300 seconds then add animation classes to complete span and update the value of it
            setTimeout(() => {
                // update status spans
                updateStatusSpans(user);
            }, 200);

            // remove animation classes from completed span
            updateStatusSpans();
        });
    }
    // function to dynamically add event listner to todo
    function addTodosEvents(todo) {
        // when mouse move in the todo item, show the controls bullets
        todo.addEventListener("mouseenter", function (e) {
            this.querySelector(".show-todo-controls").classList.add("active");
        });

        // when mouse move out the todo item, hide the controls bullets
        todo.addEventListener("mouseleave", function (e) {
            this.querySelector(".show-todo-controls").classList.remove("active");
        });
        // when any todo is clicked
        todo.addEventListener("click", function (e) {
            // if the todo is not in edit mode and the controls popup is not visible and not clicked on show controls bullets
            if (!this.hasAttribute("contenteditable") && !this.querySelector("ul").classList.contains("active") && !e.target.classList.contains("show-todo-controls")) {
                // toggle the completed class

                this.classList.toggle("completed");
                // get the todo id
                let todoId = this.getAttribute("data-todo-id");

                // check for todo state and update in user object
                this.classList.contains("completed") ? todoUsers.changeTodoStatus(user, todoId, true) : todoUsers.changeTodoStatus(user, todoId, false);

                // wait 300 seconds then add animation classes to complete span and update the value of it
                setTimeout(() => {
                    updateStatusSpans(user);
                }, 200);

                // remove animation classes from completed span
                updateStatusSpans();
            }
        });

        // when todo element hovered out, add event
        todo.addEventListener("blur", function () {
            let todoText = "";
            // if todo was in edit mode, loop through each child in todo
            document.querySelector("li.todo[contenteditable]").childNodes.forEach(function (child) {
                // if the current child is the main text, add it to todo text
                child instanceof Text ? (todoText += child.textContent) : "";
                // if the current child is div, loop through it's children
                if (child instanceof HTMLDivElement) {
                    child.childNodes.forEach((subChild) => {
                        // if div child is text , add it to todo text and add new line
                        subChild instanceof Text ? (todoText += "\n" + subChild.textContent) : "";
                    });
                }
            });
            todoUsers.changeTodoText(user, Number(this.getAttribute("data-todo-id")), todoText);
            this.toggleAttribute("contenteditable");
        });
    }

    // function to check if there's no todos
    function checkNoTodo() {
        // if user have todos
        if (todoUsers.userTodosCount(user) > 0) {
            // remove classes of no todos message if found
            noTodosMessage.classList.remove("animate__bounceIn");
            noTodosMessage.classList.remove("active");
            // show the cards container
            cardsContainer.classList.add("active");
            return false;
        }
        // if user don't have todos
        else {
            noTodosMessage.classList.add("animate__animated", "animate__bounceIn");
            noTodosMessage.classList.add("active");
            cardsContainer.classList.remove("active");
            return true;
        }
    }

    // select required elements
    let todosCountSpan = document.getElementById("todos-count"),
        completedTodosSpan = document.getElementById("completed-count"),
        logoutButton = document.getElementById("logout"),
        noTodosMessage = document.getElementById("no-todos-message"),
        addTodoButton = document.getElementById("add-todo"),
        todoTextInput = document.getElementById("todo-text"),
        cardsContainer = document.getElementById("cards-container"),
        todosListContainer = document.getElementById("todos-list");

    // a function to update completed and todos count spans
    function updateStatusSpans(user = false) {
        // if user is given as argument
        if (user) {
            // add animation classes and update text values
            completedTodosSpan.classList.add("animate__animated", "animate__bounceIn");
            completedTodosSpan.textContent = todoUsers.completedTodosCount(user);
            todosCountSpan.classList.add("animate__animated", "animate__bounceIn");
            todosCountSpan.textContent = todoUsers.userTodosCount(user);
        }
        // if user not given
        else {
            // remove animation classes
            completedTodosSpan.classList.remove("animate__animated", "animate__bounceIn");
            todosCountSpan.classList.remove("animate__animated", "animate__bounceIn");
        }
    }

    // get user todos
    let userTodos = todoUsers.userTodosList(user);

    // update todos, completed count spans values
    updateStatusSpans(user);
    // function to create todo element and add it to the page
    function createTodo(todo) {
        // create show-todo-controls, controls container and todo container
        let showTodoControls = document.createElement("i"),
            controlsContainer = document.createElement("ul"),
            editTodoLi = document.createElement("li"),
            deleteTodoLi = document.createElement("li"),
            todoContainer = document.createElement("li");

        // add classes to todo controls and show controls
        showTodoControls.classList.add("fa-solid", "fa-ellipsis", "show-todo-controls");
        controlsContainer.classList.add("list-group", "list-group-flush", "controls-container");
        editTodoLi.classList.add("todo-control", "list-group-item", "edit-item");
        deleteTodoLi.classList.add("todo-control", "list-group-item", "delete-item");
        editTodoLi.appendChild(document.createTextNode("Edit"));
        deleteTodoLi.appendChild(document.createTextNode("Delete"));
        controlsContainer.appendChild(editTodoLi);
        controlsContainer.appendChild(deleteTodoLi);

        // add classes to the card container, and check if todo is completed to add completed class
        if (todo.isCompleted) {
            todoContainer.classList.add("completed");
        }
        todoContainer.classList.add("todo", "list-group-item");

        // add todo id
        todoContainer.setAttribute("data-todo-id", todo.id);
        // create text node contains the todo text and append it to the container
        todoContainer.appendChild(document.createTextNode(todo.text));
        // append todo controls and show controls
        todoContainer.appendChild(showTodoControls);
        todoContainer.appendChild(controlsContainer);
        todosListContainer.appendChild(todoContainer);
        return [todoContainer, showTodoControls, editTodoLi, deleteTodoLi];
    }

    // if there's todos
    if (!checkNoTodo()) {
        // for each todo in user todos
        userTodos.map((todo) => {
            // create the todo and append it to the page
            createTodo(todo);
        });
    }

    // for each click in the body of the page
    document.querySelector("body").addEventListener("click", (e) => {
        // if the body element is clicked
        if (e.target instanceof HTMLBodyElement) {
            // remove all controls containers
            document.querySelectorAll(".controls-container").forEach((controlsContainer) => {
                controlsContainer.classList.remove("active");
            });
        }
    });

    // add event for click in add todo button
    addTodoButton.addEventListener("click", function (e) {
        // get the todo text input value
        let todoText = todoTextInput.value;

        // if value is not empty
        if (todoText) {
            // add todo to user todos
            let todo = todoUsers.addTodo(user, new Todo(todoText));
            // if todo added to user todo
            if (todo) {
                // create todo in dom and return the created elements, then assign them to variables
                let [createdTodo, showTodoControls, editTodoLi, deleteTodoLi] = createTodo(todo);

                // smooth scroll to the created element
                createdTodo.scrollIntoView({ behavior: "smooth", block: "end" });

                // add animation to created todo
                createdTodo.classList.add("animate__animated", "animate__bounceInLeft");
                // reset todo input text
                todoTextInput.value = "";

                // remove no todo classes to hide it
                noTodosMessage.classList.remove("animate__bounceIn");
                noTodosMessage.classList.remove("active");
                cardsContainer.classList.add("active");

                // wait 300 seconds then add animation classes to complete span and update the value of it
                setTimeout(() => {
                    updateStatusSpans(user);
                }, 200);
                setTimeout(() => {
                    createdTodo.classList.remove("animate__animated", "animate__bounceInLeft");
                }, 500);
                // sync events for all todos and controls
                addTodosEvents(createdTodo);
                addShowTodoControlsEvents(showTodoControls);
                addEditTodoEvents(user, editTodoLi);
                addDeleteTodoEvents(deleteTodoLi);
                // update stats spans
                updateStatusSpans();
            }
        }
    });

    // select all todos and call a function for each one to add events
    document.querySelectorAll("li.todo").forEach(function (todo) {
        addTodosEvents(todo);
    });

    // select all show todo controls and call a function for each one to add events
    document.querySelectorAll("i.show-todo-controls").forEach(function (eachShowTodoControls) {
        addShowTodoControlsEvents(eachShowTodoControls);
    });

    // select all edit todo controls and call a function for each one to add events
    document.querySelectorAll("li.edit-item").forEach(function (editItem) {
        addEditTodoEvents(user, editItem);
    });

    // select all delete todo controls and call a function for each one to add events
    document.querySelectorAll("li.delete-item").forEach(function (deleteItem) {
        addDeleteTodoEvents(deleteItem);
    });

    // when logout button clicked, add event
    logoutButton.addEventListener("click", (e) => {
        // logout from the user account
        todoUsers.logOut("user-id", "username");
    });
}
// if cookies not validated, redirect to login page
else {
    window.location.href = "../index.html";
}
