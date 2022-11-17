// function to be called when button clicked
function assignment1() {
    /* 
- Assignment [1] 
Create a web-page
Ask the user to enter his first name
Ask the user to enter his last name
Confirm the full name.
Ask the user to enter his birth year.
Welcome the user using his full name and age.
(Ex: Welcome Ahmed Hossam you are 35years old)
    */

    // get user first name via prompt
    let fName = prompt("Enter First Name"),
        // get user last name via prompt
        lName = prompt("Enter Last Name");

    // if both first name and last name are given
    if (fName && lName) {
        // get user birth date via prompt
        let birthDate = prompt("Enter Birth Date");

        // if birthdate is given
        if (birthDate) {
            // display an alert with a message
            alert(`Welcome ${fName} ${lName}, You are ${birthDate} years old.`);
        }
    }
}

// function to be called when button clicked
function assignment2() {
    /* 
- Assignment [2] 
Show a message to tell the user that it’s the first release of a calculator that only has a summation feature.
Ask the user to enter the first number
Ask the user to enter second number
Show the summation result (ex: 30 + 6 = 36)
    */

    // function to add two numbers and return the result of the sum
    let sum = (n1, n2) => {
        return n1 + n2;
    };

    // show a message to user
    alert("Welcome, this is the first release of a calculator that only has a summation feature.");

    // get first number from user
    let num1 = Number(prompt("Enter first number")),
        // get second number from user
        num2 = Number(prompt("Enter second number"));

    // antonymous function: if both inputs are numbers print the sum of them, else show a message to user
    num1 && num2 ? alert(`${num1} + ${num2} = ${sum(num1, num2)}`) : alert("Please enter valid numbers");
}
