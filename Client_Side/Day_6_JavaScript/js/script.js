// add an event listener when page loads
window.addEventListener("load", (e) => {
    let loginForm = document.getElementById("login-form");
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
});
