$(function () {
    let todosContainer = $(".todos-container"),
        todoInput = $(".todo-text-input");
    // when add todo button is clicked
    $(".add-todo").on("click", function () {
        // get the todo text
        let todoText = todoInput.val();

        // if todo text is not empty
        if (todoText) {
            todoInput.removeClass("invalid");

            // reset the input text
            todoInput.val("");
            // create new todo and append it to the page
            let todo = `
                <div class="todo d-flex col py-2 mb-3">
                    <div class="todo-text px-4 py-3 col rounded-2 me-3 flex-grow-1 fs-5 ">${todoText}</div>
                    <button class="me-3 rounded-2 complete fs-6">Complete</button>
                    <button class="rounded-2 delete fs-6">Delete</button>
                </div>`;

            todosContainer.append(todo);
            // animate the created todo
            $(".todo").last().hide().effect("slide", "slow");

            // when complete button is clicked
            $(".complete").on("click", function () {
                // get the todo text
                let currentTodoText = $(this).siblings(".todo-text");
                // if todo text is not striked
                if (!currentTodoText.hasClass("striked")) {
                    // strike the todo text
                    currentTodoText.addClass("striked");
                    // change the complete button text
                    $(this).text("Uncomplete");
                    $(this).css("background-color", "#26ae7c");
                } else {
                    // un-strike the todo text
                    currentTodoText.removeClass("striked");
                    // change the complete button text
                    $(this).text("Complete");
                    $(this).css("background-color", "#3164d1");
                }
            });
            // when delete button is clicked
            $(".delete").on("click", function () {
                // remove the todo
                $(this)
                    .parent()
                    .hide("slide", "slow", function () {
                        $(this).remove();
                    });
            });
        } else {
            todoInput.addClass("invalid");
        }
    });
});
