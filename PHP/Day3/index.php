<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
    * {
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 22px;
    }

    .flex-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    .container {
        width: 100vw;
        height: 100vh;
        background-color: #eee;
    }

    form {
        flex-direction: column !important;
        width: 700px;
        background-color: #fff;
        padding: 50px;
        /* border-radius: 1%; */
        justify-content: center;
        align-items: stretch !important;
    }

    input,
    textarea,
    select {
        width: 100%;
        padding: 20px;
        border-radius: 0;
        border: none;
        /* background-color: #eee; */
        border: 1px solid #ddd;
        outline: none;
        position: relative;
        /* color: black; */
    }

    textarea {
        resize: none;
    }

    select {
        padding: 0;
        scroll-behavior: smooth;
    }

    select option {
        padding: 10px;
        border: 1px solid #ddd;
        outline: none;
    }

    select option:checked {
        background-color: #ddd;
        color: black;
        border: 1px solid #eee;
    }

    .gender-radio {
        flex-direction: column;
        align-items: flex-start;
        margin-left: 10px;
    }

    .form-input {
        position: relative;
    }

    .required-item::before {
        content: "*";
        color: red;
        display: block;
        margin-left: 5px;
        position: absolute;
        top: 50%;
        left: -3%;
        transform: translate(-50%, -50%);
    }

    .agree-terms {
        justify-content: flex-start;
    }

    .agree-terms input {
        width: 3%;
    }

    .invalid-input {
        border: 1px solid red;
    }

    .invalid-input::placeholder {
        color: red;
    }


    input[type="submit"] {
        background-color: crimson;
        color: white;
        cursor: pointer;
        border: 1px solid crimson;

    }

    input[type="submit"]:hover {
        background-color: #fff;
        color: crimson;
        border: 1px solid crimson;
        transition: all 0.3s;
    }
    </style>
    <title>Lab 3</title>
</head>

<body>
    <div class="container flex-item">
        <form class="flex-item" method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
            <!-- if user submitted the form -->
            <?php if (isset($_REQUEST["submit"])) {
                $name = $_REQUEST["name"];
                $emailAddress = $_REQUEST["email"];
                $groupID = $_REQUEST["groupID"];
                $classDetails = $_REQUEST["classdetails"];
                $gender = $_REQUEST["gender"];
                $courses = $_REQUEST["courses"];
                $agree = $_REQUEST["agree"];
                function isFormValid($name, $emailAddress, $gender)
                {
                    if (isset($name) && isset($emailAddress) && isset($gender) && !empty($name) && !empty($emailAddress) && !empty($gender) && preg_match("/^[a-zA-Z]{3,}$/i", $name)) {
                        return true;
                    } else {
                        return false;
                    }
                }
                $isFormValid = isFormValid($name, $emailAddress, $gender);
                ?>
            <!-- name input -->
            <div class="form-input required-item">
                <!-- if user didn't enter a name -->
                <?php if (empty($name)) {
                        $isFormValid = false; ?>
                <input type="text" name="name" placeholder="Name is required." class="invalid-input">
                <?php }
                    // if user entered a name
                    else {
                        // if user entered a name with less than 3 characters or have non alphabet characters
                        if (!preg_match("/^[a-zA-Z]{3,}$/i", $name)) { ?>
                <input type="text" name="name" placeholder="Invalid Name." class="invalid-input">
                <?php }
                        // if user entered a valid name regex
                        else {
                            // if form is valid
                            if ($isFormValid) { ?>
                <input type="text" name="name" placeholder="Your Name">
                <?php }
                            // if form is not valid, keep the data of the input
                            else { ?>
                <input type="text" name="name" placeholder="Your Name" value="<?php echo $name; ?>">

                <?php }
                        }
                    } ?>
            </div>

            <!-- email input -->
            <div class=" form-input required-item">
                <!-- if user didn't enter an email -->
                <?php if (empty($emailAddress)) { ?>
                <input type="email" name="email" placeholder="Email is required." class="invalid-input">
                <?php }
                    // if user entered an email
                    else {
                        // if the form is valid
                        if ($isFormValid) {
                            ?>
                <input type="email" name="email" placeholder="Email Address">
                <?php }
                        // if form is not valid, keep the data of the input
                        else { ?>
                <input type="email" name="email" placeholder="Email Address" value="<?php echo $emailAddress; ?>">
                <?php }
                    } ?>
            </div>

            <!-- group id input -->
            <div class=" form-input">

                <!-- if all form inputs are valid -->
                <?php if ($isFormValid) { ?>
                <input type="text" name="groupID" placeholder="Group #" />
                <?php }
                    // if there's a problem with validation
                    else {
                        ?>
                <input type="text" name="groupID" placeholder="Group #" value="<?php echo $groupID; ?>" />

                <?php } ?>
            </div>
            <!-- class details textarea -->
            <div class=" form-input">
                <!-- if all form inputs are valid -->
                <?php if ($isFormValid) { ?>
                <textarea name="classdetails" placeholder="Class Details"></textarea>
                <?php }
                    // if there's a problem with validation
                    else { ?>
                <textarea name="classdetails" placeholder="Class Details"><?php echo $classDetails; ?></textarea>
                <?php } ?>
            </div>

            <!-- gender radio buttons -->
            <div class="gender-radio flex-item required-item form-input">

                <!-- if user didn't choose a gender -->
                <?php if (empty($gender)) { ?>
                <div class="radio-item flex-item">
                    <input type="radio" id="gender1" name="gender" value="male">
                    <label for="gender1" style="color: red;">Male</label><br>
                </div>
                <div class="radio-item flex-item">
                    <input type="radio" id="gender2" name="gender" value="female" class="invalid-input">
                    <label for="gender2" style="color: red;">Female</label><br>
                </div>

                <?php }
                    // if user choose a gender
                    else {
                        // if form is valid
                
                        if ($isFormValid) { ?>
                <div class="radio-item flex-item">
                    <input type="radio" id="gender1" name="gender" value="male">

                    <label for="gender1">Male</label><br>
                </div>
                <div class="radio-item flex-item">
                    <input type="radio" id="gender2" name="gender" value="female">
                    <label for="gender2">Female</label><br>
                </div>
                <?php }
                        // if form is not valid, keep the data of the input
                        else { ?>
                <div class="radio-item flex-item">
                    <input type="radio" id="gender1" name="gender" value="male"
                        <?php echo isset($gender) && $gender === 'male' ? "checked" : ""; ?>>

                    <label for="gender1">Male</label><br>
                </div>
                <div class="radio-item flex-item">
                    <input type="radio" id="gender2" name="gender" value="female"
                        <?php echo isset($gender) && $gender === 'female' ? "checked" : ""; ?>>

                    <label for="gender2">Female</label><br>
                </div>

                <?php }
                    } ?>
            </div>

            <!-- courses multi select -->
            <select name="courses[]" multiple>
                <option value="PHP" <?php if (!$isFormValid && isset($courses) && in_array("PHP", $courses)) {
                        echo "selected";
                    } ?>>PHP</option>
                <option value="JavaScript" <?php if (!$isFormValid && isset($courses) && in_array("JavaScript", $courses)) {
                        echo "selected";
                    } ?>>JavaScript</option>
                <option value="MySQL" <?php if (!$isFormValid && isset($courses) && in_array("MySQL", $courses)) {
                        echo "selected";
                    } ?>>MySQL</option>
                <option value="HTML" <?php if (!$isFormValid && isset($courses) && in_array("HTML", $courses)) {
                        echo "selected";
                    } ?>>HTML</option>
                <option value="NodeJs" <?php if (!$isFormValid && isset($courses) && in_array("NodeJs", $courses)) {
                        echo "selected";
                    } ?>>NodeJs</option>
                <option value="RedHat" <?php if (!$isFormValid && isset($courses) && in_array("RedHat", $courses)) {
                        echo "selected";
                    } ?>>RedHat Admin 1</option>
            </select>

            <!-- agree to terms checkbox -->
            <div class="agree-terms flex-item form-input">
                <input type="checkbox" name="agree" value="agree"
                    <?php echo isset($agree) && $agree === 'agree' && !$isFormValid ? "checked" : ""; ?>>
                <label for="agree">I agree to the terms of use</label>
            </div>

            <!-- submit form -->
            <input type="submit" name="submit">

            <?php
                // if user filled all required inputs
                if ($isFormValid) {
                    echo "<h1 style='text-align:center; margin-top: 10px; font-size: 26px;'>Thanks for submitting your info.</h1>" .
                        "<p style='font-weight:bold;'>Name: <span style='font-weight: normal; color: crimson;'>$name</span></p>" .
                        "<p style='font-weight:bold;'>Email: <span style='font-weight: normal; color: crimson;'>$emailAddress</span></p>" .
                        "<p style='font-weight:bold;'>Group: <span style='font-weight: normal; color: crimson;'>$groupID</span></p>" .
                        "<p style='font-weight:bold;'>Class Details: <span style='font-weight: normal; color: crimson;'>$classDetails</span></p>" .
                        "<p style='font-weight:bold;'>Gender: <span style='font-weight: normal; color: crimson;'>$gender</span></p>" .
                        "<p style='font-weight:bold;'>Your courses are: <span style='font-weight: normal; color: crimson;'>";
                    foreach ($courses as $course) {
                        echo $course . ", ";
                    }
                    echo "</span></p>";
                }
                ?>
            <!-- if user not submitted the form -->
            <?php } else { ?>
            <div class="form-input required-item">
                <input type=" text" name="name" placeholder="Your Name">
            </div>
            <div class="form-input required-item">
                <input type="email" name="email" placeholder="Email Address">
            </div>
            <div class="form-input">
                <input type="text" name="groupID" placeholder="Group #" />
            </div>

            <div class="form-input">
                <textarea name="classdetails" placeholder="Class Details"></textarea>
            </div>
            <div class="gender-radio flex-item required-item form-input">
                <div class="radio-item flex-item">
                    <input type="radio" id="gender1" name="gender" value="male">
                    <label for="gender1">Male</label><br>
                </div>
                <div class="radio-item flex-item">
                    <input type="radio" id="gender2" name="gender" value="female">
                    <label for="gender2">Female</label><br>
                </div>
            </div>

            <select name="courses[]" multiple>
                <option value="PHP">PHP</option>
                <option value="JavaScript">JavaScript</option>
                <option value="MySQL">MySQL</option>
                <option value="HTML">HTML</option>
                <option value="NodeJs">NodeJs</option>
                <option value="RedHat">RedHat Admin 1</option>
            </select>

            <div class="agree-terms flex-item form-input">
                <input type="checkbox" name="agree" value="agree">
                <label for="agree">I agree to the terms of use</label>
            </div>
            <!-- submit form -->
            <input type="submit" name="submit">
            <?php } ?>
            </fo rm>
    </div>

</body>

</html>