// wait until the page loads, then invoke this function
$(function () {
    /* 
- Assignment [1] 

 Ask the user to enter his age. You must validate the user input (positive numbers only)
 Show the status of the user knowing that
 Child is between 1-10
 Teenager is between 11-18
 Grown up is between 19-50
 Old is greater than 50
 keep asking the user to enter another age until he clicks cancel 


*/
    // when assignment 1 button clicked, invoke this arrow func.
    $("button#assignment_1").click((e) => {
        // prevent the default behavior of the button
        e.preventDefault();

        // infinite loop
        while (true) {
            // prompt user to enter age
            let userAge = prompt("Enter your age");
            // if user press cancel
            if (userAge === null) {
                // stop the loop
                break;
            }
            // validate user input (if user enter a number that is greater than 0)
            else if (userAge > 0 && Number(userAge) !== NaN) {
                // check for age type and alert that type
                if (userAge >= 1 && userAge <= 10) {
                    alert("Child");
                } else if (userAge >= 11 && userAge <= 18) {
                    alert("Teenager");
                } else if (userAge >= 19 && userAge <= 50) {
                    alert("Grown up");
                } else if (userAge > 50) {
                    alert("Old");
                }
            }
            // if user entered 0, negative number, or a value that is not a number
            else {
                alert("Please enter a valid age.");
            }
        }
    });

    /* 
- Assignment [2] 

 - Ask the user to enter a string
 Count the number of vowels in that string (a,e,o,u,i) 



*/

    $("button#assignment_2").click((e) => {
        // prevent the default behavior of the button
        e.preventDefault();
        // prompt user to enter a string
        let userString = prompt("Enter a text");
        // initialize the number of vowels count
        let noOfVowels = 0;
        // if user press didn't press cancel
        if (userString !== null) {
            // convert string to array
            let textArray = userString.split("");
            // loop through the array elements
            textArray.forEach((char) => {
                // if the current character is vowel
                switch (char) {
                    case "a":
                    case "e":
                    case "o":
                    case "u":
                    case "i":
                        // increment the number of vowels
                        noOfVowels++;
                }
            });

            // alert the number of vowels
            alert(`The number of vowels in the text is ${noOfVowels}`);
        }
    });

    /* 
- Assignment [3] 


 Write a JavaScript program to convert the 24-hour clock to 12 , adding am or pm based on its value.
 Examples 

0 -> 12AM
 11 -> 11AM
 13 -> 1PM 


*/

    $("button#assignment_3").click((e) => {
        // prevent the default behavior of the button
        e.preventDefault();
        // prompt user to enter a time
        let userTime = prompt("Enter a time in 24-hour clock format");

        // if user didn't press cancel
        if (userTime !== null) {
            // validate user input ( if the time is between 0~24 and it's a number)
            if (userTime >= 0 && Number(userTime) !== NaN && userTime <= 24) {
                // if the time is between 0~12 alert the same time in AM, else convert the time to 12-hour format and alert it in PM
                userTime <= 12 ? alert(`Time in 12-hour format is : ${userTime}AM`) : alert(`Time in 12-hour format is : ${userTime - 12}PM`);
            } else {
                // alert the user
                alert("Please enter a valid time.");
            }
        }
    });
});
