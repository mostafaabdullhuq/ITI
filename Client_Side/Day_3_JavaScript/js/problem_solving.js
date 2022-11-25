// __author = "Mostafa Abdullhuq";

// a function that loops over the array of fruit, then returns the amount of
// fruits that go inside the house area
let countFruits = (fruitsArr, treePlace, houseStartPoint, houseEndPoint, fruitType) => {
    // initialize the fruit counter
    let fruitsCounter = 0;

    // loop over each fruit displacement in fruit array
    fruitsArr.forEach((fruitDisplacement) => {
        // calculate fruit landing place
        let landingPlace = treePlace + fruitDisplacement;

        // if fruit landing place >= the house starting place
        if (landingPlace >= houseStartPoint && landingPlace <= houseEndPoint && fruitDisplacement >= (-10) ** 5 && fruitDisplacement <= 10 ** 5) {
            // increment the counter
            fruitsCounter++;
        }
    });

    // return the result counter
    return fruitsCounter;
};

function countApplesAndOranges(s, t, a, b, m, n, apples, oranges) {
    // Write your code here

    /*
        ? Params:
            * s: integer, starting point of Sam's house location.
            * t: integer, ending location of Sam's house location.
            * a: integer, location of the Apple tree.
            * b: integer, location of the Orange tree.
            * m: integer, number of apples that fell from the tree.
            * n: integer, number of oranges that fell from the tree.
            * apples: integer array, distances at which each apple falls from the tree.
            * oranges: integer array, distances at which each orange falls from the tree.
    */

    // check constraints
    if (
        // a < s < t < b
        b > t &&
        b > s &&
        b > a &&
        t > s &&
        t > a &&
        s > a &&
        // 1 <= s, t, a, b, m, n <= 10^5
        s >= 1 &&
        t >= 1 &&
        a >= 1 &&
        b >= 1 &&
        m >= 1 &&
        n >= 1 &&
        s <= 10 ** 5 &&
        t <= 10 ** 5 &&
        a <= 10 ** 5 &&
        b <= 10 ** 5 &&
        m <= 10 ** 5 &&
        n <= 10 ** 5
    ) {
        // invoke count fruits function and pass the required values
        // to calculate no of apples and oranges
        let applesCount = countFruits(apples, a, s, t, "Apple"),
            orangeCount = countFruits(oranges, b, s, t, "Orange");

        // print the result
        console.log(applesCount);
        console.log(orangeCount);
    }
}

countApplesAndOranges(7, 11, 5, 15, 3, 2, [-2, 2, 1], [5, -6]); // 1 , 1
