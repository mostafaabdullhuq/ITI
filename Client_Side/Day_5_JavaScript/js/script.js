// wait until the page loads, then invoke this function

//TODO:
/*
Setup the following class 
	Employee (is a person class) 
-	Attributes (id, email, workMood, salary, isManager)
-	Methods (work)

Office:
-	Attributes (name, employees)
-	Methods (getAllEmployees, getEmployee, fire,hire)

Implement Employee methods
sleep(hours): Method in Person class (7→ happy, <7 → tired, >7 → lazy)
eat(meals): Method in Person class (3 meals →100 health rate, 2
meals→75 health rate , 1 meal→ 50 health rate)
buy(items): Method in Person class ( 1 Item→decrees Money 10 LE)
work(hours): Method in Employee class ( 8→ happy, > 8 →tired, > 8 → lazy)
        
        • Salary: Property must be 1000 or more
        • Health rate: Property must be between 0 and 100




    
Implement Office methods
getAllEmployees(): Method in Office class get all current employees.
getEmployee(empId): Method in Office class get employee data of given
employee id, and if he is a manager display all info except salary.
hire(Employee): Method in Office class hires the given employee.
fire(empId): Method in Office class fires the given employee id.


Let the program be user prompt
Print a menu with the functionalities allowed.
For example:
For adding new employee enter “add”
If manager press “mngr”
if normal employee press “nrml”
Enter your data:

    > Name:
    > age:


The final menu option is “q” to quit the application.
Hint:
-	To store employee, you can use array or array of object
-	Emp Id: you can use email instead of generating random id

Part 2: 
 Report:
1-	Abstract VS interface 
2-	Inheritance in function constructor 


For yourself:

This article talking about classes 
https://everyday.codes/javascript/please-stop-using-classes-in-javascript/
https://www.toptal.com/javascript/es6-class-chaos-keeps-js-developer-up
*/

var empArr = [];
var officeEmp = [];

/*
	Employee (is a person class) 
-	Attributes (id, email, workMood, salary, isManager)
-	Methods (work)


Implement Employee methods
sleep(hours): Method in Person class (7→ happy, <7 → tired, >7 → lazy)
eat(meals): Method in Person class (3 meals →100 health rate, 2
meals→75 health rate , 1 meal→ 50 health rate)
buy(items): Method in Person class ( 1 Item→decrees Money 10 LE)
work(hours): Method in Employee class ( 8→ happy, > 8 →tired, > 8 → lazy)
• Salary: Property must be 1000 or more
• Health rate: Property must be between 0 and 100
*/

// implementing Person class
class Person {
    // construction function
    constructor(name, age, sleepMode, healthRate, money) {
        this.name = name;
        this.age = age;
        this.sleepMode = sleepMode;
        this.healthRate = healthRate;
        this.money = money;
    }
    // class methods

    sleep(sleepHours) {
        // if sleep hours is a number
        if (!isNaN(sleepHours)) {
            if (sleepHours > 7) {
                this.sleepMode = "Lazy";
            } else if (sleepHours < 7) {
                this.sleepMode = "Tired";
            } else {
                this.sleepMode = "Happy";
            }
        }

        // return the value of sleep mode
        return this.sleepMode;
    }

    eat(mealsCount) {
        // based on the count of the meals, set the health rate
        switch (mealsCount) {
            case 1:
                this.healthRate = 50;
                break;
            case 2:
                this.healthRate = 75;
                break;
            case 3:
                this.healthRate = 100;
                break;
        }

        // return the value of the health rate
        return this.healthRate;
    }

    buy(itemsCount) {
        // if number of items is a number
        if (!isNaN(itemsCount)) {
            // decrease 10 For each item bought
            this.money -= itemsCount * 10;
        }

        // return the new money value
        return this.money;
    }
}

// implement Employee class that inherit from Person class
class Employee extends Person {
    // constructor function
    constructor(name, age, sleepMode, workMood, healthRate, salary, money, email, isManager) {
        // call the parent properties
        super(name, age, sleepMode, healthRate, money);

        // define the child class properties
        this.email = email;
        this.workMood = workMood;
        this.salary = salary > 1000 ? salary : 1000;
        this.isManager = isManager;
        if (this.healthRate > 100 || this.healthRate < 0) {
            this.healthRate = 100;
        }

        // generate id for the employee based on it's index on the employees array
        this.id = empArr.length + 1;

        // add the employee to the employees array
        empArr.push(this);
    }
    work(workHours) {
        // if number of hours is a number
        if (!isNaN(workHours)) {
            if (workHours > 8) {
                this.workMood = "Tired";
            } else if (workHours < 8) {
                this.workMood = "Lazy";
            } else {
                this.workMood = "Happy";
            }
        }
        return this.workMood;
    }
}

// implement office class
class Office {
    constructor(name, employees) {
        this.name = name;
        this.employees = employees;
    }

    // class methods

    // a function to get all employees in the office
    getAllEmployees = () => {
        return this.employees;
    };

    // a function to search employee by id
    getEmployee = (empId) => {
        // return the employee object if found
        return this.employees.find((employee) => {
            return employee.id == empId;
        });
    };

    // a function to add new employee to the office
    hireEmployee = (Employee) => {
        // add the employee object from the office array
        this.employees.push(Employee);
    };

    // a function to remove employee object from the office array
    fireEmployee = (empId) => {
        // loop over all office employees
        this.employees.forEach((employee, index) => {
            // if the given id is the same as the current employee id
            if (employee.id == empId) {
                // remove this employee from the office
                this.employees.splice(index, 1);
            }
        });
    };
}

// initialize some employees for testing purposes
new Employee("Ahmed", 25, "Happy", "Tired", 100, 5000, 2000, "ahmed@gmail.com", false);
new Employee("Mohamed", 36, "Happy", "Tired", 70, 3000, 1000, "mohamed@gmail.com", false);
new Employee("Sameh", 25, "Happy", "Tired", 0, 7000, 2000, "Sameh@gmail.com", true);
new Employee("Ali", 25, "Happy", "Tired", 30, 12000, 2000, "Ali@gmail.com", false);
new Employee("Mostafa", 25, "Happy", "Tired", 10000, 5000, 2000, "mostafa@gmail.com", true);

// initialize an office for testing purposes
let myOffice = new Office("My Office", officeEmp);

// when Add Employee button clicked, invoke this arrow func.
$("button#add").click((e) => {
    // prevent the default behavior of the button
    e.preventDefault();
    // redirect to add employee form page
    window.location = "./docs/add.html";
});

// when add employee form submitted
$("form#add").on("submit", (e) => {
    e.preventDefault();

    // get all form data
    let name = $("input#name").val(),
        age = $("input#age").val(),
        sleepMode = $("select#sleep-mode").val(),
        workMode = $("select#work-mode").val(),
        healthRate = $("input#health-rate").val(),
        money = $("input#money").val(),
        email = $("input#email").val(),
        salary = $("input#salary").val(),
        employeeType = $("select#employee-type").val();

    // create new employee object based on data given
    new Employee(name, Number(age), sleepMode, healthRate, Number(money), email, workMode, Number(salary), employeeType == "2" ? true : false);

    // fire a success alert
    Swal.fire("Good job!", "Employee has been added successfully", "success");
});

// when search employees button clicked, invoke this arrow func.
$("button#search").click((e) => {
    // prevent the default behavior of the button
    e.preventDefault();

    // launch sweetalert
    Swal.fire({
        title: "Enter Employee ID",
        input: "number",
        inputAttributes: {
            autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Look up",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
    }).then((e) => {
        // if prompt is confirmed and the value given is a number
        if (e.isConfirmed && !isNaN(e.value)) {
            // search in the office for the specified employee
            let emp = myOffice.getEmployee(Number(e.value));

            // if the employee is found
            if (emp) {
                // fire a success alert with the employee details
                Swal.fire({
                    title: `Name: ${emp.name}\nAge: ${emp.age}\nSleep Mood: ${emp.sleepMode}\nHealth Rate: ${emp.healthRate}\nMoney: ${emp.money}\nEmail: ${emp.email}\nWork Mood: ${emp.workMood}\n${
                        !emp.isManager ? "Salary: " + emp.salary + "\n" : ""
                    }Employee Type: ${emp.isManager ? "Manager" : "Employee"}
                    `,
                });

                // if employee is not found
            } else {
                // fire a failed alert
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No employees found with this ID!",
                });
            }

            // fire failed alert to tell the user to enter a valid id
        } else {
            Swal.showValidationMessage(`Please enter a valid ID.`);
        }
    });
});

// when Hire/ Fire Employees button clicked, invoke this arrow func.
$("button#edit-all").click((e) => {
    // prevent the default behavior of the button
    e.preventDefault();

    // reset the html table contains employees details
    document.querySelector("table tbody").innerHTML = "";

    // loop over all employees in the employees array
    empArr.forEach((employee) => {
        // create a new row in the table
        let row = document.createElement("tr");
        // create a new cell in to store the employee id
        let cell = document.createElement("td");
        // add the value of the id to the cell
        cell.appendChild(document.createTextNode(employee.id));
        // append this cell to the row
        row.appendChild(cell);

        // iterate over each employee details
        Object.values(employee).forEach((value, index) => {
            // create a new cell
            cell = document.createElement("td");
            // if the current value is the last value
            if (index === 9) {
                // create new cell
                /*
                    if employee is already hired in the office, add a hired class to the cell and set the cell text to Fire
                    if employee is not hired in the office, set the cell text to Hire
                */
                myOffice.getEmployee(employee.id) ? cell.appendChild(document.createTextNode("Fire")).classList.add("hired") : cell.appendChild(document.createTextNode("Hire"));
                // add class hire to the cell
                cell.classList.add("hire");
                // set the id of the cell to the id of the employee
                cell.id = value;
                // add the cell to the row
                row.appendChild(cell);
            } else {
                // if the current index is the employee type index
                if (index === 8) {
                    // if the employee is a manager, set the value of the cell to manager, else set to employee
                    value = value ? "Manager" : "Employee";
                }
                // add the value of the current property to the cell
                cell.appendChild(document.createTextNode(value));
                // append the cell to the row
                row.appendChild(cell);
            }
        });

        document.querySelector("table tbody").appendChild(row);
        $("div.table-container").show();
    });
});

// when Show office employees button clicked, invoke this arrow func.
$("button#show-office").click((e) => {
    // prevent the default behavior of the button
    e.preventDefault();

    // get all office employees
    let officeEmployees = myOffice.getAllEmployees();

    // if the office has already employees
    if (officeEmployees.length !== 0) {
        // reset the table value
        document.querySelector("table tbody").innerHTML = "";

        // loop over all office employees
        officeEmployees.forEach((employee) => {
            // create new table row
            let row = document.createElement("tr");
            // create new table cell
            let cell = document.createElement("td");
            // add the value of the id to the cell
            cell.appendChild(document.createTextNode(employee.id));
            // add the cell to the id
            row.appendChild(cell);

            // for each property of employee object
            Object.values(employee).forEach((value, index) => {
                // if notlast index
                if (index != 9) {
                    if (index === 8) {
                        value = value ? "Manager" : "Employee";
                    }
                    cell = document.createElement("td");
                    cell.appendChild(document.createTextNode(value));
                    row.appendChild(cell);
                }
            });
            // append all rows to the table
            document.querySelector("table tbody").appendChild(row);

            // show the table window
            $("div.table-container").show();
        });

        // if no employees in the office
    } else {
        // fire a failed alert
        Swal.fire("There's no employees in the office.");
    }
});

// when table overlay clicked, hide the window
$("div.table-container .overlay").on("click", () => {
    $("div.table-container").hide();
});

// when employee hire button is clicked
$(document).on("click", "td.hire", function () {
    // toggle the class of the button
    $(this).toggleClass("hired");

    // get the id of the employee
    let empID = $(this).attr("id");

    // get the employee object from the employees array
    let employee = empArr.find(function (emp) {
        return emp.id == empID;
    });

    // if the employee is not hired
    if ($(this).hasClass("hired")) {
        // hire the employee in the office
        myOffice.hireEmployee(employee);
        // change the text of the button to Fire
        $(this).text("Fire");

        // if the employee is already hired
    } else {
        // fire the employee from the office
        myOffice.fireEmployee(Number(empID));
        // change the text of the button to Hire
        $(this).text("Hire");
    }
});
