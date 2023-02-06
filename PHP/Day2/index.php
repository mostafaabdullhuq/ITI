<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lab2</title>
</head>

<body>

    <?php
    // how to make \n work in browser.
    echo nl2br("[1] Hello\nWorld!\n---------------------\n"); // we must use "" not ''
    
    // Write a PHP script to get the sum and avg of an indexed array
    
    // $numbers = [];
    // $numbers[1] = 45;
    // $numbers[0] = 12;
    // $numbers[3] = 25;
    // $numbers[2] = 10;
    $numbers = [12, 45, 10, 25];

    $sum = 0;

    function getSum($numbers)
    {
        $sum = 0;
        foreach ($numbers as $number) {
            $sum += $number;
        }
        return $sum;
    }

    function getAverage($numbersArr)
    {
        $sum = getSum($numbersArr);
        $avg = $sum / count($numbersArr);
        return $avg;
    }

    echo nl2br(
        "[2] Sum: " . getSum($numbers) . "\nAverage: " . getAverage($numbers)
    );

    // -----------------------OR-----------------
    
    echo nl2br(
        "\n----OR----\nSum: " .
        array_sum($numbers) .
        "\nAverage: " .
        array_sum($numbers) / count($numbers) .
        "\n---------------------\n"
    );

    // sort numbers descending
    rsort($numbers);

    echo nl2br("[3] Descending: \n") .
        "<pre>" .
        print_r($numbers, true) .
        "</pre>" .
        nl2br("---------------------\n");

    // -------------------------OR-------------------------
    
    sort($numbers);
    print_r(array_reverse($numbers));

    // sort the following associative array :
    
    $assocArr = [
        "Sara" => 31,
        "John" => 41,
        "Walaa" => 39,
        "Ramy" => 40,
    ];

    // sort in ascending order, according to the value
    asort($assocArr);

    echo "<pre>" .
        print_r($assocArr, true) .
        "</pre>" .
        nl2br("-----------------\n");

    // sort in ascending order, according to the key
    ksort($assocArr);
    echo "<pre>" .
        print_r($assocArr, true) .
        "</pre>" .
        nl2br("-----------------\n");

    // sort in descending order, according to the value
    arsort($assocArr);
    echo "<pre>" .
        print_r($assocArr, true) .
        "</pre>" .
        nl2br("-----------------\n");

    // sort in descending order, according to the key
    krsort($assocArr);
    echo "<pre>" .
        print_r($assocArr, true) .
        "</pre>" .
        nl2br("-----------------\n");
    ?>
    <!-- Display the array in an HTML table with Name, Email and Status table headers. Specify PHP status with red color -->

    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $students = [
                [
                    "name" => "Alaa",
                    "email" => "alaa@test.com",
                    "status" => "PHP",
                ],
                [
                    "name" => "Shamy",
                    "email" => "shamy@test.com",
                    "status" => ".Net",
                ],
                [
                    "name" => "Youssef",
                    "email" => "youssef@test.com",
                    "status" => "Testing",
                ],
                [
                    "name" => "Waleid",
                    "email" => "waleid@test.com",
                    "status" => "PHP",
                ],
                [
                    "name" => "Rahma",
                    "email" => "rahma@test.com",
                    "status" => "Front End",
                ],
            ];
            foreach ($students as $student): ?>
                <tr style="<?php $student['status'] == 'PHP' ? print 'color: red;' : print ''; ?>">
                    <?php foreach ($student as $studentKey => $studentValue) {
                        echo "<td>$studentValue</td>";
                    }
                    ?>
                </tr>
            <?php endforeach;
            ?>
        </tbody>
    </table>

</body>

</html>