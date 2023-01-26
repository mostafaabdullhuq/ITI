<?php
// include mysql class
include_once('./db_config.php');
?>

<?php

if (!$_REQUEST) {
    header("Location: ./index.php");
}


// get the value of submit button
$submit = $_POST["submit"];

$isUpdateError = false;
$userDetails = false;

// check if user submitted the form
if (isset($submit)) {
    $id = false;
    // if post request coming from index.php with user id
    if ($submit === 'update') {
        $id = (isset($_POST["id"]) && !empty($_POST["id"])) ? $_POST["id"] : false;
        // if id is not provided
        if (!$id) {
            $isUpdateError = "Invalid request.";
        } else {
            $userDetails = $mysql->getStudent($id);
        }
    }
    // if post request is coming from the same page
    else {
        // get the values of the form and validate them
        $id = (isset($_POST["id"]) && !empty($_POST["id"])) ? $_POST["id"] : false;
        $name = (isset($_POST["name"]) && !empty($_POST["name"])) ? $_POST["name"] : false;
        $emailAddress = (isset($_POST["email"]) && !empty($_POST["email"])) ? $_POST["email"] : false;
        $gender = (isset($_POST["gender"]) && !empty($_POST["gender"])) ?
                    ($_POST["gender"] === "male" ? "m" : "f")
                    : false;
        $subscribed = (isset($_POST["subscribe"]) &&  !empty($_POST["subscribe"]) && $_POST["subscribe"] === "on") ? 1 : 0;
        // check if all fields are filled
        if ($name && $emailAddress && $gender && $id) {
            // validate name
            if (preg_match("/^[a-zA-Z ]*$/", $name) === 0) {
                $isUpdateError = "Only letters and white space allowed in name.";
            }
            // validate email
            else if (filter_var($emailAddress, FILTER_VALIDATE_EMAIL) === false) {            
                $isUpdateError = "Invalid email format.";
            } 
            // if email and name are valid
            else {
                // try to update student
                $isUserUpdated = $mysql->updateStudent($id,$name, $emailAddress, $gender, $subscribed);
                // if not added successfully
                $userDetails = [$id,$_POST['name'],$_POST['email'],$_POST['gender'] === "male" ? "M" : "F",$_POST['subscribe']];
                if (!$isUserUpdated[0]) {
                    $isUpdateError = $isUserUpdated[1];
                }
                // if added successfully.
                else {
                    $isUpdateError = false;
                    // redirect to index.php
                    header(
                            "Location: ./index.php"
                        );
                }
            } 
        }
        // if not all fields provided.
        else {
            $userDetails = [$id,$_POST['name'],$_POST['email'],$_POST['gender'] === "male" ? "M" : "F",$_POST['subscribe']];
            $isUpdateError = "Please fill all fields.";
        }
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
        <h1 class="text-left col-11 col-md-6">Update User Details</h1>
        <p class="text-left my-3 col-11 col-md-6 form-main-label">Please edit this form and submit to update user record
            on database.
        </p>
        <?php if ($isUpdateError) { ?>
        <div class="alert alert-danger col-11 col-md-6 text-center" role="alert">
            <?php echo $isUpdateError; ?>
        </div>
        <?php } ?>
        <form class="d-flex flex-column col-11 col-md-6" method="POST" action="<?php $_SERVER['PHP_SELF'] ?>">
            <div class=" mb-3">
                <label for="username" class="form-label fw-bold">Name</label>
                <?php if($userDetails && $id) { ?>
                <input type="text" class="form-control p-3" name="name" id="username"
                    value="<?php echo $userDetails[1]; ?>">
                <?php } else { ?>
                <input type="text" class="form-control p-3" name="name" id="username">
                <?php } ?>
            </div>
            <div class="mb-3">
                <label for="useremail" class="form-label fw-bold">Email Address</label>
                <?php if($userDetails && $id) { ?>
                <input type="email" name="email" class="form-control p-3" id="useremail"
                    value="<?php echo $userDetails[2]; ?>">

                <?php } else { ?>
                <input type="email" name="email" class="form-control p-3" id="useremail">

                <?php } ?>

            </div>
            <div class="mb-3">
                <label for="useremail" class="form-label fw-bold">Gender</label>
                <div class="form-check">
                    <input id="malegender" class="form-check-input" type="radio" name="gender" value="male" <?php
                        if($userDetails && $id && $userDetails[3] ==='M') { echo "checked" ;}?>
                        <?php if(!$userDetails || !$id) echo 'checked'; ?>> <label class="form-check-label"
                        for="malegender">
                        Male
                    </label>
                </div>
                <div class="form-check">
                    <input id="femalegender" class="form-check-input" type="radio" name="gender" value="female" <?php
                        if($userDetails && $id && $userDetails[3] ==='F') { echo "checked" ;}?>>
                    <label class="form-check-label" for="femalegender">
                        Female
                    </label>
                </div>
            </div>
            <div class="mb-3">
                <input type="checkbox" class="form-check-input me-2" name="subscribe" id="emailsub" <?php
                        if($userDetails && $id && $userDetails[4]) { echo "checked" ;}?>>
                <label class="form-check-label" for="emailsub">Subscribe to our mail
                    service.</label>
            </div>
            <div class="controls col-12 d-flex">
                <?php if($userDetails && $id) { ?>
                <input type="hidden" name="id" value="<?php echo $id; ?>" />
                <?php } ?>
                <input class="btn btn-success col p-3 me-3" type="submit" name="submit" value="Update User" />
                <button class="btn btn-secondary col d-flex justify-content-center align-items-center p-0"><a
                        href="./index.php"
                        class="w-100 h-100 px-2 py-3 d-flex justify-content-center align-items-center">Cancel</a></button>
            </div>
        </form>

    </div>
</body>

</html>