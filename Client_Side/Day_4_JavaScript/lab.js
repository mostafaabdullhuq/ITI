// TODO:
/*
Setup following Using Constructor functions, Using Classes, Using Objects Linking to Other Objects (OLOO), Using Factory functions
Person:
-	Attributes (full name, money, sleep mood, health Rate)
-	Methods (sleep, eat, buy)

Implement Person methods:
	Sleep(hours): 
(7-> happy, 
< 7 -> tired,
 >7 ->lazy)
	Eat(meals): (3 meals -> 100 health rate, 
		         2 meals -> 75 health rate, 1 meal-> 50 health rate)
	Buy(items): (1 item -> decrees Money 10 LE)	

*/

// [1] - Constructor function
/*
function Person(fullName, money) {
    this.fullName = fullName;
    this.money = money;

    this.sleepMood = (sleepHours) => {
        if (sleepHours < 7) {
            return "Tired";
        } else if (sleepHours > 7) {
            return "Lazy";
        } else {
            return "Happy";
        }
    };

    this.healthRate = (mealsNo) => {
        switch (mealsNo) {
            case 1:
                return 50;
            case 2:
                return 75;
            case 3:
                return 100;
            default:
                return 0;
        }
    };
    this.buyItem = () => {
        this.money -= 10;
        return `You have ${this.money} LE`;
    };
}

// create a new instance
let ahmed = new Person("Ahmed Ali", 100);

console.log(ahmed); // Person {fullName: 'Ahmed Ali',money: 100,sleepMood: [Function (anonymous)],healthRate: [Function (anonymous)],buyItem: [Function (anonymous)]}
console.log(ahmed.sleepMood(7)); // Happy
console.log(ahmed.healthRate(3)); // 100
console.log(ahmed.buyItem()); // You have 90 LE
console.log(ahmed.buyItem()); // You have 80 LE

*/
// [2] - Using Classes

/*
class Person {
    constructor(fullName, money) {
        this.fullName = fullName;
        this.money = money;
    }

    sleepMood(sleepHours) {
        if (sleepHours < 7) {
            return "Tired";
        } else if (sleepHours > 7) {
            return "Lazy";
        } else {
            return "Happy";
        }
    }

    healthRate(mealsNo) {
        switch (mealsNo) {
            case 1:
                return 50;
            case 2:
                return 75;
            case 3:
                return 100;
            default:
                return 0;
        }
    }

    buyItem() {
        this.money -= 10;
        return `You have ${this.money} LE`;
    }
}

let mohamed = new Person("Mohamed Ali", 70); // Person { fullName: 'Mohamed Ali', money: 70 }

console.log(mohamed);

console.log(mohamed.sleepMood(2)); // Tired
console.log(mohamed.healthRate(1)); // 50
console.log(mohamed.buyItem()); // You have 60 LE


*/

// [3] - Using Objects Linking to Other Objects (OLOO)

/*
const Person = {
    init(fullName, money) {
        this.fullName = fullName;
        this.money = money;
        return this;
    },
    sleepMood(sleepHours) {
        if (sleepHours < 7) {
            return "Tired";
        } else if (sleepHours > 7) {
            return "Lazy";
        } else {
            return "Happy";
        }
    },
    healthRate(mealsNo) {
        switch (mealsNo) {
            case 1:
                return 50;
            case 2:
                return 75;
            case 3:
                return 100;
            default:
                return 0;
        }
    },
    buyItem() {
        this.money -= 10;
        return `You have ${this.money} LE`;
    },
};

let sameh = Object.create(Person).init("Sameh Ali", 500); // Person { fullName: 'Sameh Ali', money: 500 }

console.log(sameh);

console.log(sameh.sleepMood(9)); // Lazy
console.log(sameh.healthRate(2)); // 75
console.log(sameh.buyItem()); // You have 490 LE
*/
// [4] - Using Factory functions

/*
function Person(fullName, money) {
    return {
        fullName,
        money,
        sleepMood(sleepHours) {
            if (sleepHours < 7) {
                return "Tired";
            } else if (sleepHours > 7) {
                return "Lazy";
            } else {
                return "Happy";
            }
        },
        healthRate(mealsNo) {
            switch (mealsNo) {
                case 1:
                    return 50;
                case 2:
                    return 75;
                case 3:
                    return 100;
                default:
                    return 0;
            }
        },
        buyItem() {
            this.money -= 10;
            return `You have ${this.money} LE`;
        },
    };
}

let ali = Person("Ali Ali", 1000);

console.log(ali); // { fullName: 'Ali Ali', money: 1000, sleepMood: [Function: sleepMood], healthRate: [Function: healthRate], buyItem: [Function: buyItem] }

console.log(ali.sleepMood(12)); // Lazy
console.log(ali.healthRate(4)); // 0
console.log(ali.buyItem()); // You have 990 LE
*/
