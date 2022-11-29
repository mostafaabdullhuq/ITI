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

class Person {
    constructor(name, age, sleepMode, healthRate, money) {
        this.name = name;
        this.age = age;
        this.sleepMode = sleepMode;
        this.healthRate = healthRate;
        this.money = money;
    }
    sleep(sleepHours) {
        if (!isNaN(sleepHours)) {
            if (sleepHours > 7) {
                this.sleepMode = "Lazy";
            } else if (sleepHours < 7) {
                this.sleepMode = "Tired";
            } else {
                this.sleepMode = "Happy";
            }
        }
        return this.sleepMode;
    }
    eat(mealsCount) {
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
        return this.healthRate;
    }
    buy(itemsCount) {
        if (!isNaN(itemsCount)) {
            this.money -= itemsCount * 10;
        }
        return this.money;
    }
}

class Employee extends Person {
    constructor(name, age, sleepMode, workMood, healthRate, salary, money, email, isManager) {
        super(name, age, sleepMode, healthRate, money);
        this.email = email;
        this.workMood = workMood;
        this.salary = salary > 1000 ? salary : 1000;
        this.isManager = isManager;
        if (this.healthRate > 100 || this.healthRate < 0) {
            this.healthRate = 100;
        }
        this.id = empArr.length + 1;
        empArr.push(this);
    }
    work(workHours) {
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

/*
Office:
-	Attributes (name, employees)
-	Methods (getAllEmployees, getEmployee, fire,hire)

Implement Office methods
getAllEmployees(): Method in Office class get all current employees.
getEmployee(empId): Method in Office class get employee data of given
employee id, and if he is a manager display all info except salary.
hire(Employee): Method in Office class hires the given employee.
fire(empId): Method in Office class fires the given employee id.
*/

class Office {
    constructor(name, employees) {
        this.name = name;
        this.employees = employees;
    }
    getAllEmployees = () => {
        return this.employees;
    };
    getEmployee = (empId) => {
        let employeeDetails = false;
        this.employees.forEach((employee) => {
            if (empId == employee.id) {
                employeeDetails = employee;
            }
        });
        return employeeDetails;
    };
    hireEmployee = (Employee) => {
        this.employees.push(Employee);
    };
    fireEmployee = (empId) => {
        this.employees.forEach((employee, index) => {
            if (employee.id == empId) {
                console.log("hi");
                this.employees.splice(index, 1);
            }
        });
    };
}

// # name, age, sleepMode, workMood, healthRate, salary, money, email, isManager
new Employee("Ahmed", 25, "Happy", "Tired", 100, 5000, 2000, "ahmed@gmail.com", false);
new Employee("Mohamed", 36, "Happy", "Tired", 70, 3000, 1000, "mohamed@gmail.com", false);
new Employee("Sameh", 25, "Happy", "Tired", 0, 7000, 2000, "Sameh@gmail.com", true);
new Employee("Ali", 25, "Happy", "Tired", 30, 12000, 2000, "Ali@gmail.com", false);
new Employee("Mostafa", 25, "Happy", "Tired", 10000, 5000, 2000, "mostafa@gmail.com", true);
// officeEmp.push(new Employee("Mostafa", 25, "Happy", "Tired", 10000, 5000, 2000, "mostafa@gmail.com", true));
let myOffice = new Office("My Office", officeEmp);

// when add button clicked, invoke this arrow func.
$("button#add").click((e) => {
    // prevent the default behavior of the button
    e.preventDefault();
    // redirect to add form page
    window.location = "./docs/add.html";
});

$("form#add").on("submit", (e) => {
    e.preventDefault();
    let name = $("input#name").val(),
        age = $("input#age").val(),
        sleepMode = $("select#sleep-mode").val(),
        workMode = $("select#work-mode").val(),
        healthRate = $("input#health-rate").val(),
        money = $("input#money").val(),
        email = $("input#email").val(),
        salary = $("input#salary").val(),
        employeeType = $("select#employee-type").val();

    let employee = new Employee(name, Number(age), sleepMode, healthRate, Number(money), email, workMode, Number(salary), employeeType == "2" ? true : false);
    Swal.fire("Good job!", "Employee has been added successfully", "success");
    console.log(empArr);
});

// when add button clicked, invoke this arrow func.
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
        if (e.isConfirmed && !isNaN(e.value)) {
            let emp = myOffice.getEmployee(Number(e.value));
            if (emp) {
                Swal.fire({
                    title: `Name: ${emp.name}\nAge: ${emp.age}\nSleep Mood: ${emp.sleepMode}\nHealth Rate: ${emp.healthRate}\nMoney: ${emp.money}\nEmail: ${emp.email}\nWork Mood: ${emp.workMood}\n${
                        !emp.isManager ? "Salary: " + emp.salary + "\n" : ""
                    }Employee Type: ${emp.isManager ? "Manager" : "Employee"}
                    `,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No employees found with this ID!",
                });
            }
        } else {
            Swal.showValidationMessage(`Please enter a valid ID.`);
        }
    });
});

// when show button clicked, invoke this arrow func.
$("button#edit-all").click((e) => {
    // prevent the default behavior of the button
    e.preventDefault();
    // redirect to show page
    document.querySelector("table tbody").innerHTML = "";
    empArr.forEach((employee) => {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        cell.appendChild(document.createTextNode(employee.id));
        row.appendChild(cell);
        Object.values(employee).forEach((value, index) => {
            if (index === 9) {
                cell = document.createElement("td");
                let isInOffice = false;
                if (myOffice.getEmployee(employee.id)) {
                    cell.appendChild(document.createTextNode("Fire"));
                    cell.classList.add("hire");
                    cell.classList.add("hired");
                    cell.id = value;
                    row.appendChild(cell);
                } else {
                    cell.appendChild(document.createTextNode("Hire"));
                    cell.classList.add("hire");
                    cell.id = value;
                    row.appendChild(cell);
                }
            } else {
                if (index === 8) {
                    value = value ? "Manager" : "Employee";
                }
                let cell = document.createElement("td");
                cell.appendChild(document.createTextNode(value));
                row.appendChild(cell);
            }
        });

        document.querySelector("table tbody").appendChild(row);
        $("div.table-container").show();
    });
});

// when edit button clicked, invoke this arrow func.
$("button#show-office").click((e) => {
    // prevent the default behavior of the button
    e.preventDefault();
    // redirect to show page
    let employees = myOffice.getAllEmployees();
    if (employees.length !== 0) {
        document.querySelector("table tbody").innerHTML = "";
        employees.forEach((employee) => {
            let row = document.createElement("tr");
            let cell = document.createElement("td");
            cell.appendChild(document.createTextNode(employee.id));
            row.appendChild(cell);
            Object.values(employee).forEach((value, index) => {
                // if notlast index
                if (index != 9) {
                    if (index === 8) {
                        value = value ? "Manager" : "Employee";
                    }
                    let cell = document.createElement("td");
                    cell.appendChild(document.createTextNode(value));
                    row.appendChild(cell);
                }
            });
            // append all rows to the table
            document.querySelector("table tbody").appendChild(row);

            // show the table window
            $("div.table-container").show();
        });
    } else {
        Swal.fire("There's no employees in the office.");
    }
});

// when table overlay clicked, hide the window
$("div.table-container .overlay").on("click", () => {
    $("div.table-container").hide();
});

$(document).on("click", "td.hire", function () {
    $(this).toggleClass("hired");
    let empID = $(this).attr("id");
    let employee = empArr.find(function (emp) {
        return emp.id == empID;
    });
    if ($(this).hasClass("hired")) {
        myOffice.hireEmployee(employee);
        $(this).text("Fire");
    } else {
        myOffice.fireEmployee(Number(empID));
        $(this).text("Hire");
    }
});
