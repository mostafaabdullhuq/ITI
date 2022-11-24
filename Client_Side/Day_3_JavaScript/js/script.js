// wait until the page loads, then invoke this function
$((e) => {
    /* 
- Part [1] - Lab [1] 

Create JS script to be run in web browser ,
User will enter his Username , Password
If username = “admin” and password = “421$$” Show him message “Welcome login success”
If he entered incorrect username or password Tell him which data entered wrong

*/
    // when assignment 1 button clicked, invoke this arrow func.
    $("button#assignment_1").click((e) => {
        // prevent the default behavior of the button
        e.preventDefault();
        // redirect to login form page
        window.location = "./docs/login.html";
    });

    // a function to validate entered username and password
    let validateForm = (user, pass) => {
        return user == "admin" && pass == "421$$" ? true : false;
    };

    // when login form submitted
    $("form#login").on("submit", (e) => {
        // stop the default behavior of the form
        e.preventDefault();

        // get the entered username and password values
        let userName = document.querySelector("input#username").value,
            passWord = document.querySelector("input#password").value,
            // select the login status paragraph
            loginStatus = document.querySelector("p#login");
        // when validation complete, change the status paragraph content according to the validation status
        validateForm(userName, passWord) ? (loginStatus.innerHTML = "Logged in Successfully") : (loginStatus.innerHTML = "Invalid Username or Password");
    });

    /* 
- Part [1] - Lab [2] & Bonus 

Create JS script to be run in web browser ,
User will enter first number
Then enter an operation (sum,multi,subtract,division,moduls) Then enter second number
Then do the operation and show the result to user

Bonus

Using lap2 add more features as following
User will be able to use the last result to do new operation on it
As example user enter 1 then sum then 3 then show 4 then sum then 5 then show 9 and so on
*/

    // when assignment 2 button clicked, invoke this arrow func.
    $("button#assignment_2").click((e) => {
        // prevent the default behavior of the button
        e.preventDefault();
        // redirect to calc form page
        window.location = "./docs/calc.html";
    });

    // when operation button clicked
    $("form#calc div.operations input.operation").on("click", function (e) {
        // remove any active class from operation buttons
        $("input.operation").removeClass("active");
        // add active class to the clicked button
        $(this).addClass("active");
    });

    // function to calculate and validate the result and inputs
    let calcResult = (num, operation, res) => {
        if (!isNaN(num) || (!isNaN(res) && (operation == "+" || operation == "*" || operation == "-" || operation == "/"))) {
            switch (operation) {
                case "+":
                    return Number(res) + Number(num);
                case "-":
                    return Number(res) - Number(num);
                case "*":
                    return Number(res) * Number(num);
                case "/":
                    return Number(res) / Number(num);
                default:
                    return res;
            }
        } else {
            return res;
        }
    };

    // when calc form submitted
    $("form#calc").on("submit", (e) => {
        // stop the default behavior of the form
        e.preventDefault();

        // get the entered number and operation values
        let userNumber = document.querySelector("form#calc input#number").value,
            userOperation = document.querySelector("form#calc input.operation.active").value,
            // select the result input
            result = document.querySelector("form#calc input#result");
        // when validation complete, change the result input value according to the validation status
        result.value = calcResult(userNumber, userOperation, result.value);
    });

    /* 
- Part [2] - Lab [1] 

Calculate the Sum and average Of the user entered values
Ask the user to enter how many number he wants to get the sum of Save the number in array
Show him the sum and average of the entered values

*/

    // when assignment 3 button clicked, invoke this arrow func.
    $("button#assignment_3").click((e) => {
        // prevent the default behavior of the button
        e.preventDefault();
        // redirect to calc form page
        window.location = "./docs/average_sum.html";
    });

    //function to validate user inputs in calc_2
    let validateNumbers = (userInput) => {
        // convert the user input to array
        let numbersArray = userInput.split(",");

        // if the array length is more than 1 element and the first element is integer
        if (numbersArray.length > 1 && !isNaN(numbersArray[0])) {
            return numbersArray;
        } else {
            return false;
        }
    };

    // when calc_2 form submitted
    $("form#average_sum").on("submit", (e) => {
        // stop the default behavior of the form
        e.preventDefault();

        // get the entered numbers
        let userNumbers = document.querySelector("input.user_numbers").value,
            // select the result container
            resultContainer = document.querySelector("input#result_sum_average"),
            // get the array of numbers from validation
            numbersArray = validateNumbers(userNumbers);
        // if the array is valid
        if (numbersArray) {
            // initialize the sum and average results
            let sumResult = 0,
                averageResult = 0;
            // loop through the array elements
            numbersArray.forEach((e) => {
                // add the current element to the sum result if it is a number
                if (!isNaN(e)) {
                    sumResult += Number(e);
                }
            });
            // calculate the average result
            averageResult = sumResult / numbersArray.length;
            // change the result container content
            resultContainer.value = `Sum = ${sumResult} , Average = ${averageResult}`;
        } else {
            // change the result container content
            resultContainer.value = "Please enter more than one number.";
        }
    });

    /* 
- Part [2] - Lab [2] 

Create phone book app
Ask the user for operation through JS prompt If user enters “add”
Ask him for the name of the contact and phone number
Then create js object for that contact and add it to contacts array Then ask him for new operation and repeat
If user enters “search”
Ask him for something to search for
Get the user input and search in the contacts array in name and phone Then show the user the full details of that contact
Then ask him for new operation and repeat
*/

    // when assignment 4 button clicked, invoke this arrow func.
    $("button#assignment_4").click((e) => {
        // prevent the default behavior of the button
        e.preventDefault();
        // redirect to phonebook form page
        window.location = "./docs/phonebook.html";
    });
    var contacts = [
        { name: "John", phone: "123456789" },
        { name: "Max", phone: "999999999" },
    ];

    let validateContact = (name, phone) => {
        if (name && !isNaN(phone)) {
            return true;
        } else {
            return false;
        }
    };
    var contactName = document.querySelector("input#contact_name"),
        contactPhone = document.querySelector("input#contact_phone");

    // when add buttom clicked form phonebook
    $("form#phonebook input#add").on("click", (e) => {
        // stop the default behavior of the form
        e.preventDefault();
        // if the contact is valid, add it to the array as an object, else make alert
        validateContact(contactName.value, contactPhone.value) ? contacts.push({ name: contactName.value, phone: contactPhone.value }) : alert("Please enter valid contact name and phone.");

        // reset the inputs values
        contactName.value = "";
        contactPhone.value = "";
    });

    // a function to search for matching contacts in the array
    searchContact = (userInput, inputType) => {
        let nameResult,
            phoneResult,
            searchArray = [];

        // loop through the contacts array
        contacts.forEach((contact) => {
            // if the input who triggers is name
            if (inputType === 1) {
                // search for the name in the contact name by regex
                nameResult = contact["name"].toLowerCase().search(`^${userInput.toLowerCase()}.*?$`);
            }

            // if the input who triggers in phone
            else {
                // search for the phone in the contact phone by regex
                phoneResult = contact["phone"].toLowerCase().search(`^${userInput.toLowerCase()}.*?`);
            }

            // if the name or phone is found, add the contact to the search array
            if (nameResult === 0 || phoneResult === 0) {
                searchArray.push(contact);
            }
        });

        // return the search array
        return searchArray;
    };

    var contactsContainer = document.querySelector("p.contact_search_result");

    // when user types something in contact name input
    $(contactName).on("keyup", (e) => {
        // check for the input length
        if (contactName.value.length !== 0) {
            // if the input is not empty, search for user input in contacts
            let contactsArray = searchContact(contactName.value, 1);

            // if the search array is not empty
            if (contactsArray.length > 0) {
                // initialize the result string
                let contactsContainerText = "";
                // loop through the search array
                contactsArray.forEach((contact) => {
                    // add the contact name and phone to the result string
                    contactsContainerText += `${contact["name"]}  |  ${contact["phone"]}<br>`;
                });
                // change the result container content
                contactsContainer.innerHTML = contactsContainerText;
            } else {
                // change the result container content if there's no contacts found
                contactsContainer.innerHTML = "No Contacts Found.";
            }
        } else {
            // change the result container content if the input is empty
            contactsContainer.innerHTML = "No Contacts Found.";
        }
    });

    // when user types something in contact phone input
    $(contactPhone).on("keyup", (e) => {
        // check for the input length
        if (contactPhone.value.length !== 0) {
            // if the input is not empty, search for phone in contacts
            let contactsArray = searchContact(contactPhone.value, 2);
            // if there is a match, display the first result
            if (contactsArray.length > 0) {
                // change the result container content
                let contactsContainerText = "";
                // loop through the search array
                contactsArray.forEach((contact) => {
                    // add the contact name and phone to the result string
                    contactsContainerText += `${contact["name"]}  |  ${contact["phone"]}<br>`;
                });
                // change the result container content
                contactsContainer.innerHTML = contactsContainerText;
            } else {
                // change the result container content if there's no contacts found
                contactsContainer.innerHTML = "No Contacts Found.";
            }
        } else {
            // change the result container content if the input is empty
            contactsContainer.innerHTML = "No Contacts Found.";
        }
    });
});

/* 
- Part [2] - Bonus

Area calculator
Ask the user to enter the name of the shape he wants to calc area for Ask the user for the dimensions of that shape
Calculate the area and show it to user

1- Circle
    π × r2              r = radius of the circle
2- Triangle
    1⁄2 × b× h          b = base h = height
3- Square
    a2                  a = length of side
4- Rectangle
    l× w                l = length w = width
5- Parallelogram
    b× h                b=base h=vertical height
6- Trapezium
    1⁄2(a+b) × h        a and b are the length of parallel sides h = height
7- Ellipse
    πab                 a = 1⁄2 minor axis b = 1⁄2 major axis
*/

// when assignment 4 button clicked, invoke this arrow func.
$("button#assignment_5").click((e) => {
    // prevent the default behavior of the button
    e.preventDefault();
    // redirect to phonebook form page
    window.location = "./docs/area_calc.html";
});

validateInput = (shapeType, shapeDimension) => {
    if (shapeType > 0 && shapeType <= 7 && shapeDimension !== "") {
        if ((shapeType == 2 || shapeType == 4 || shapeType == 5 || shapeType == 7) && shapeDimension.split(",").length != 2) {
            return false;
        }
        if (shapeType == 6 && shapeDimension.split(",").length != 3) {
            return false;
        }

        return true;
    } else {
        return false;
    }
};

$("form#area_calc").on("submit", (e) => {
    e.preventDefault();

    let shapeType = Number(document.querySelector("select.shape").value),
        shapeDimension = document.querySelector("input#shape_dimension").value,
        resultContainer = document.querySelector("input#result_area");
    if (validateInput(shapeType, shapeDimension)) {
        let dimensionsArray = shapeDimension.split(","),
            result = 0;
        switch (shapeType) {
            case 1:
                result = Math.PI * Math.pow(Number(dimensionsArray[0]), 2);
                break;
            case 2:
                result = (Number(dimensionsArray[0]) * Number(dimensionsArray[1])) / 2;
                break;
            case 3:
                result = Math.pow(Number(dimensionsArray[0]), 2);
                break;
            case 4:
                result = Number(dimensionsArray[0]) * Number(dimensionsArray[1]);
                break;
            case 5:
                result = Number(dimensionsArray[0]) * Number(dimensionsArray[1]);
                break;
            case 6:
                result = ((Number(dimensionsArray[0]) + Number(dimensionsArray[1])) * Number(dimensionsArray[2])) / 2;
                break;
            case 7:
                result = Math.PI * Number(dimensionsArray[0]) * Number(dimensionsArray[1]);
                break;
        }
        resultContainer.value = result;
    } else {
        resultContainer.value = "Please enter valid data.";
    }
});
