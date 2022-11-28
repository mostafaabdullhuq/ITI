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
function Person(fullName, money, sleepMode, healthRate) {
    this.fullName = fullName;
    this.money = money;
    this.sleepMode = sleepMode;
    this.healthRate = healthRate;

    this.sleep = (sleepHours) => {
        if (!isNaN(sleepHours)) {
            if (sleepHours < 7) {
                return "Tired";
            } else if (sleepHours > 7) {
                return "Lazy";
            } else {
                return "Happy";
            }
        } else {
            return this.sleepMode;
        }
    };

    this.eat = (mealsNo) => {
        if (!isNaN(mealsNo)) {
            switch (mealsNo) {
                case 1:
                    return 50;
                case 2:
                    return 75;
                case 3:
                    return 100;
                default:
                    return this.healthRate;
            }
        } else {
            return this.healthRate;
        }
    };
    this.buyItem = (itemsNo) => {
        return `You have ${!isNaN(itemsNo) ? (this.money -= itemsNo * 10) : this.money} LE`;
    };
}

// create a new instance
let ahmed = new Person("Ahmed Ali", 100, "Lazy", 90);
console.log(ahmed); // Person { fullName: 'Ahmed Ali', money: 100, sleepMode: 'Lazy', healthRate: 90 }
console.log(ahmed.sleep(7)); // Happy
console.log(ahmed.eat(3)); // 100
console.log(ahmed.sleep()); // Lazy (default)
console.log(ahmed.eat()); // 90 (default)
console.log(ahmed.buyItem()); // You have 100 LE
console.log(ahmed.buyItem(5)); // You have 50 LE
*/
// // [2] - Using Classes
/*
class Person {
    constructor(fullName, money, sleepMode, healthRate) {
        this.fullName = fullName;
        this.money = money;
        this.sleepMode = sleepMode;
        this.healthRate = healthRate;
    }

    sleep(sleepHours) {
        if (!isNaN(sleepHours)) {
            if (sleepHours < 7) {
                return "Tired";
            } else if (sleepHours > 7) {
                return "Lazy";
            } else {
                return "Happy";
            }
        } else {
            return this.sleepMode;
        }
    }

    eat(mealsNo) {
        if (!isNaN(mealsNo)) {
            switch (mealsNo) {
                case 1:
                    return 50;
                case 2:
                    return 75;
                case 3:
                    return 100;
                default:
                    return this.healthRate;
            }
        } else {
            return this.healthRate;
        }
    }

    buyItem(itemsNo) {
        return `You have ${!isNaN(itemsNo) ? (this.money -= itemsNo * 10) : this.money} LE`;
    }
}

let mohamed = new Person("Mohamed Ali", 70, "Lazy", 90);

console.log(mohamed);

console.log(mohamed.sleep(2)); // Tired
console.log(mohamed.sleep()); // Lazy
console.log(mohamed.eat(1)); // 50
console.log(mohamed.eat()); // 90
console.log(mohamed.buyItem()); // You have 70 LE
console.log(mohamed.buyItem(4)); // You have 30 LE
*/
// [3] - Using Objects Linking to Other Objects (OLOO)
/*
const Person = {
    init(fullName, money, sleepMode, healthRate) {
        this.fullName = fullName;
        this.money = money;
        this.sleepMode = sleepMode;
        this.healthRate = healthRate;
        return this;
    },
    sleep(sleepHours) {
        if (!isNaN(sleepHours)) {
            if (sleepHours < 7) {
                return "Tired";
            } else if (sleepHours > 7) {
                return "Lazy";
            } else {
                return "Happy";
            }
        } else {
            return this.sleepMode;
        }
    },
    eat(mealsNo) {
        if (!isNaN(mealsNo)) {
            switch (mealsNo) {
                case 1:
                    return 50;
                case 2:
                    return 75;
                case 3:
                    return 100;
                default:
                    return this.healthRate;
            }
        } else {
            return this.healthRate;
        }
    },
    buyItem(itemsNo) {
        return `You have ${!isNaN(itemsNo) ? (this.money -= itemsNo * 10) : this.money} LE`;
    },
};

let sameh = Object.create(Person).init("Sameh Ali", 500, "Lazy", 90);

console.log(sameh);

console.log(sameh.sleep(9)); // Lazy
console.log(sameh.sleep()); // Lazy
console.log(sameh.eat(2)); // 75
console.log(sameh.eat()); // 90
console.log(sameh.buyItem()); // You have 500 LE
console.log(sameh.buyItem(6)); // You have 440 LE
*/
// [4] - Using Factory functions
/*
function Person(fullName, money, sleepMode, healthRate) {
    return {
        fullName,
        money,
        sleepMode,
        healthRate,
        sleep(sleepHours) {
            if (!isNaN(sleepHours)) {
                if (sleepHours < 7) {
                    return "Tired";
                } else if (sleepHours > 7) {
                    return "Lazy";
                } else {
                    return "Happy";
                }
            } else {
                return sleepMode;
            }
        },
        eat(mealsNo) {
            if (!isNaN(mealsNo)) {
                switch (mealsNo) {
                    case 1:
                        return 50;
                    case 2:
                        return 75;
                    case 3:
                        return 100;
                    default:
                        return healthRate;
                }
            } else {
                return healthRate;
            }
        },
        buyItem(itemsNo) {
            return `You have ${!isNaN(itemsNo) ? (this.money -= itemsNo * 10) : this.money} LE`;
        },
    };
}

let ali = Person("Ali Ali", 1000, "Lazy", 90);

console.log(ali);

console.log(ali.sleep(12)); // Lazy
console.log(ali.sleep()); // Lazy
console.log(ali.eat(3)); // 100
console.log(ali.eat()); // 90
console.log(ali.buyItem()); // You have 1000 LE
console.log(ali.buyItem(1)); // You have 990 LE
*/
