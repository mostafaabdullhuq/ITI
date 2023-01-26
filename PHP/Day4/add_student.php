<?php
// include mysql class
include_once('./db_config.php');
?>



<?php
// get the value of submit button
$submit = $_POST["submit"];



$isAddError = false;

// check if user submitted the form
if (isset($submit)) {

    // get the values of the form and validate them
    $name = (isset($_POST["name"]) && !empty($_POST["name"])) ? $_POST["name"] : false;
    $emailAddress = (isset($_POST["email"]) && !empty($_POST["email"])) ? $_POST["email"] : false;
    $gender = (isset($_POST["gender"]) && !empty($_POST["gender"])) ?
                 ($_POST["gender"] === "male" ? "m" : "f")
                 : false;
    $subscribed = (isset($_POST["subscribe"]) &&  !empty($_POST["subscribe"]) && $_POST["subscribe"] === "on") ? 1 : 0;
    // check if all fields are filled
    if ($name && $emailAddress && $gender) {
        // validate name
        if (preg_match("/^[a-zA-Z ]*$/", $name) === 0) {
            $isAddError = "Only letters and white space allowed in name.";
        }
        // validate email
        else if (filter_var($emailAddress, FILTER_VALIDATE_EMAIL) === false) {            
            $isAddError = "Invalid email format.";
        } 
        // if email and name are valid
        else {
            // try to add student
            $isUserAdded = $mysql->addStudent($name, $emailAddress, $gender, $subscribed);
            // if not added successfully
            if (!$isUserAdded[0]) {
                $isAddError = $isUserAdded[1];
            }
            // if added successfully.
            else {
                $isAddError = false;
                // redirect to index.php
                header(
                        "Location: ./index.php"
                    );
            }
        } 
    }
    // if not all fields provided.
    else {
        $isAddError = "Please fill all fields.";
    }
}
?>



<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous">
    </script>
    <style>
    h1 {
        font-size: 50px;
        font-weight: 600;
        color: #4A5059;
    }

    h1::after {
        content: "";
        display: block;
        width: 100%;
        margin-top: 10px;
        height: 2px;
        background: #4A5059;
        opacity: 0.1;
    }

    .form-main-label {
        font-size: 1.1rem;
        color: #4A5059;
        opacity: 0.7;
    }

    a {
        text-decoration: none;
        color: white;
        cursor: pointer;
    }

    a:hover {
        text-decoration: none;
        color: white;
        cursor: pointer;
    }
    </style>
    <title>Add New Student</title>
</head>

<body>
    <div class="container h-100 d-flex flex-column justify-content-center align-items-center">
        <h1 class="text-left col-11 col-md-6">User Registration Form</h1>
        <p class="text-left my-3 col-11 col-md-6 form-main-label">Please fill this form and submit to add user record to
            the
            database.
        </p>
        <?php if ($isAddError) { ?>
        <div class="alert alert-danger col-11 col-md-6 text-center" role="alert">
            <?php echo $isAddError; ?>
        </div>
        <?php } ?>
        <form class="d-flex flex-column col-11 col-md-6" method="POST" action="<?php $_SERVER['PHP_SELF'] ?>">
            <div class=" mb-3">
                <label for="username" class="form-label fw-bold">Name</label>

                <input type="text" class="form-control p-3" name="name" id="username">
            </div>
            <div class="mb-3">
                <label for="useremail" class="form-label fw-bold">Email Address</label>
                <input type="email" name="email" class="form-control p-3" id="useremail">
            </div>
            <div class="mb-3">
                <label for="useremail" class="form-label fw-bold">Gender</label>
                <div class="form-check">
                    <input id="malegender" class="form-check-input" type="radio" name="gender" value="male" checked>
                    <label class="form-check-label" for="malegender">
                        Male
                    </label>
                </div>
                <div class="form-check">
                    <input id="femalegender" class="form-check-input" type="radio" name="gender" value="female">
                    <label class="form-check-label" for="femalegender">
                        Female
                    </label>
                </div>
            </div>
            <div class="mb-3">
                <input type="checkbox" class="form-check-input me-2" name="subscribe" id="emailsub" checked>
                <label class="form-check-label" for="emailsub">Subscribe to our mail
                    service.</label>
            </div>
            <div class="controls col-12 d-flex">
                <input class="btn btn-success col p-3 me-3" type="submit" name="submit" value="Add User" />
                <button class="btn btn-secondary col d-flex justify-content-center align-items-center p-0"><a
                        href="./index.php"
                        class="w-100 h-100 px-2 py-3 d-flex justify-content-center align-items-center">Cancel</a></button>
            </div>
        </form>

    </div>
</body>

</html>