//TODO: [1]: Use 10 of Objects predefined methods and explain them.

/*
// 1- Object.create() - Copies the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.

// defining an object: creates a copy from an existing object

// example

let mainObj = {
    hasDiscount: true,
    showMsg: function () {
        return `You${this.hasDiscount ? "" : " don't"} have discount.`;
    },
};

console.log(mainObj.hasDiscount); // true
console.log(mainObj.showMsg()); // You have discount.

let otherObj = Object.create(mainObj);

otherObj.hasDiscount = false; // overriding the hasDiscount property of the new created object

console.log(otherObj.hasDiscount); // false
console.log(otherObj.showMsg()); // You don't have discount.

*/
/*
// 2 - Object.assign() : copies one or more objects into a target object

const src1 = {
    prop1: "Value 1",
    prop2: "Value 2",
    method1: function () {
        return "Method 1";
    },
};

const src2 = {
    prop3: "Value 3",
    prop4: "Value 4",
    method2: function () {
        return "Method 2";
    },
};

const target = {
    prop5: "Value 5",
};

Object.assign(target, src1, src2, { prop6: "Value 6" }); // copies three objects into target object

console.log(target); // {prop5: 'Value 5',prop1: 'Value 1',prop2: 'Value 2',method1: [Function: method1],prop3: 'Value 3',prop4: 'Value 4',method2: [Function: method2]}
*/

/*
// 3- delete Object.property : deletes a property from an object, returns true if deleted successfully, false if not deleted

const user = {
    name: "John",
    age: 30,
    address: "USA",
};

delete user.name; // true
console.log(user); // { age: 30, address: 'USA' }
console.log(user.name); // undefined
*/

/*
// 4- Object.freeze(): freezes an Object, we cannot delete or add from it

let freezeObj = {
    prop1: "Value 1",
    prop2: "Value 2",
};

Object.freeze(freezeObj);

freezeObj.prop3 = "value 3"; // adding to object
console.log(freezeObj); // { prop1: 'Value 1', prop2: 'Value 2' }
delete freezeObj.prop1; // deleting from object
console.log(freezeObj); // { prop1: 'Value 1', prop2: 'Value 2' }
*/

/*

// 5- Object.defineProperty(): used to add a new property to the object or modify an existing property and assign it's flags

let car = {
    model: "BMW",
    year: 2004,
};

Object.defineProperty(car, "color", {
    value: "Red", // the value of the property
    configurable: false, // wheatear it can be deleted or not
    writable: true, // writable: wheatear it can be changed or not
    enumerable: true, // wheatear it can be  looped over or not
});

console.log(car); // { model: 'BMW', year: 2004, color: 'Red' }

console.log(delete car.color); // false

*/

/*
// 6- Object.constructor : returns a reference to the Object constructor function that created the instance object

let myString = "Some text",
    myNumber = 10,
    myBoolean = true,
    myArray = [1, 2, 3],
    myObject = {
        name: "John",
        age: 30,
    },
    myFunction = function () {
        return "Hello";
    };

console.log(myString.constructor); // [Function: String]
console.log(myNumber.constructor); // [Function: Number]
console.log(myBoolean.constructor); // [Function: Boolean]
console.log(myArray.constructor); // [Function: Array]
console.log(myObject.constructor); // [Function: Object]
console.log(myFunction.constructor); // [Function: Function]
*/

/*

// 7- Object.entries(): returns an array of a given object's key, value pairs that can be iterated on

const user = {
    name: "John",
    age: 30,
    address: "USA",
};

console.log(Object.entries(user)); // [ [ 'name', 'John' ], [ 'age', 30 ], [ 'address', 'USA' ] ]

for (const [key, value] of Object.entries(user)) {
    console.log(`${key}: ${value}`);
    // name: John
    // age: 30
    // address: USA
}

*/

/*
// 8- Object.values(): returns an array of the values of the object keys

const user = {
    name: "John",
    age: 30,
    address: "USA",
};

console.log(Object.values(user)); // [ 'John', 30, 'USA' ]
*/

/*
// 9- Object.keys() : returns an array of the keys of the object

const obj = {
    prop1: "Value 1",
    prop2: "Value 2",
    method1: function () {
        return "Method 1";
    },
};

console.log(Object.keys(obj)); // [ 'prop1', 'prop2', 'method1' ]
*/

/*

// 10 - Object.toString() : returns a string that representing the object ( assigned via proto)

class Person {
    constructor(name) {
        this.name = name;
    }
}

let person = new Person("John");

Person.prototype.toString = function () {
    return this.name;
};

console.log(person.toString()); // John
*/

//TODO: [2]: Use 10 of Arrays predefined methods and explain them..

/*
// 1- Array.values(): returns a new iterable that contains the value for each array index

let myArr = [1, 2, 3, 4, 5, 6];

for (const value of myArr.values()) {
    console.log(value); // 1 2 3 4 5 6
}
*/
/*
// 2- Array.forEach(): executes a function for each array element

let myArr = [1, 2, 3, 4, 5, 6];

myArr.forEach((value, index) => {
    console.log(`index: ${index} - value: ${value}`);
    // index: 0 - value: 1
    // index: 1 - value: 2
    // index: 2 - value: 3
    // index: 3 - value: 4
    // index: 4 - value: 5
    // index: 5 - value: 6
});
*/

/*
// 3- Array.map(): creates a new array that contains each result from old array elements through a function

let myArr = [1, 2, 3, 4, 5, 6];

let newArr = myArr.map((value) => {
    return value * 2;
});
console.log(newArr); // [ 2, 4, 6, 8, 10, 12 ]
*/

/*

// 4- Array.from() : creates a new shallow copy array from an iterable object

let myArr = Array.from("hello");
let myArr2 = Array.from([1, 2, 3, 4, 5, 6], (element) => element * 5);

console.log(myArr); // [ 'h', 'e', 'l', 'l', 'o' ]
console.log(myArr2); // [ 5, 10, 15, 20, 25, 30 ]
*/

/*
// 5- Array.isArray() : checks if the value is an array or not

console.log(Array.isArray([1, 2, 3, 4, 5, 6])); // true
console.log(Array.isArray({ 1: "1" })); // false
*/
/*
// 6- Array.includes(): search for a specific value in array, returns true or false based on found or not

let myArr = [1, 2, 3, 4, 5, 6];

console.log(myArr.includes(3)); // true
console.log(myArr.includes(10)); // false
*/

/*
// 7- Array.sort(): sorts array elements ( converts elements to string and compare the ascii code values )

let myArr = [3, 7, 1, 9, 6, 4, 5, 2, 8];
let myArr2 = [3, 10, 1, 9, 526, 4, 1000, 9523, 8];
myArr.sort();
myArr2.sort();
console.log(myArr); // [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(myArr2); // [1, 10, 1000, 3, 4, 526, 8, 9, 9523]
*/
/*

// 8- Array.every(): takes a case then check whethear all elements matches the required case or not

let myArr = [1, 3, 5, 7, 9];

console.log(myArr.every((value) => value % 2 !== 0)); // true ( checks whether every element in the array is odd value)
console.log(myArr.every((value) => value % 2 !== 1)); // false ( checks whether every element in the array is even value)
*/
/*
// 9- Array.reverse() : reverse array elements

let myArr = [1, 2, 3, 4, 5, 6];

myArr.reverse();

console.log(myArr); // [6, 5, 4, 3, 2, 1]
*/
/*
// 10- Array.filter() : create a new shallow copy array that includes the items that pass a given condition

let myArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let evenNums = myArr.filter((element) => element % 2 == 0);
let oddNums = myArr.filter((element) => element % 2 == 1);
console.log(evenNums); // [ 2, 4, 6, 8 ]
console.log(oddNums); // [ 1, 3, 5, 7, 9 ]
*/

/*
//TODO: [2]: Write a nested function and explain the closure -> lexical environment.

function parent() {
    // create a local variable in parent function
    let innerVar = "Lexical Scoping Example";

    // create a nested function ( inner function / closure )
    // A closure is the combination of a function and the lexical environment within which that function was declared. This environment         consists of any local variables that were in-scope at the time the closure was created.
    function child() {
        console.log(innerVar); // the child function can access the parent function variable (lexical scoping)
    }
    child(); // call the child function
}
parent(); // Lexical Scoping Example

// another example
function sum_to_base_no(x) {
    return function (y) {
        return x + y;
    };
}

let sum_to_base_10 = sum_to_base_no(10); // closure
let sum_to_base_20 = sum_to_base_no(20); // closure
console.log(sum_to_base_10(5)); // 15 // lexial environment: x = 10
console.log(sum_to_base_20(5)); // 25 // lexial environment: x = 20
*/
