<?php
// include mysql class
include_once('./db_config.php');

if (!$_REQUEST) {
    header("Location: /index.php");
}


$submit = $_POST['submit'];
if (isset($submit)) {
    $id = $_POST['id'];
    if (isset($id) && !empty($id)) {
        $studentDetails = $mysql->getStudent($id);
    } else {
        $studentDetails = false;
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
    body {
        font-size: 22px;
    }

    a {
        text-decoration: none;
        color: white;
        cursor: pointer;
    }

    a:hover {
        color: white;
        text-decoration: none;
    }


    .user-details {
        color: #4A5059;
    }

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
    </style>
    <title>Student Details</title>
</head>

<body>
    <div class="container h-100 d-flex flex-column justify-content-center align-items-center">
        <h1 class="col-11 col-md-6 mb-5">View Record</h1>
        <div class="d-flex flex-column col-11 col-md-6">
            <?php if ($studentDetails) { ?>
            <div class=" mb-3">
                <label for="username" class="form-label fw-bold">Name</label>
                <p class="user-details"><?php echo $studentDetails[1] ;?></p>
            </div>
            <div class="mb-3">
                <label for="useremail" class="form-label fw-bold">Email Address</label>
                <p class="user-details"><?php echo $studentDetails[2] ;?></p>
            </div>
            <div class="mb-3">
                <label for="usergender" class="form-label fw-bold">Gender</label>
                <p class="user-details"><?php echo $studentDetails[3] ;?></p>
            </div>
            <div class="mb-3">
                <label for="usersubscribtion" class="form-label fw-bold">Email Subscription</label>
                <?php if ($studentDetails[4] == 1) { ?>
                <p class="user-details">Your are subscribed to our newsletter.</p>
                <?php } else { ?>
                <p class="user-details">You are not subscribed to our newsletter.</p>
                <?php } ?>
            </div>
            <?php } else { ?>
            <h4 class="mb-5 text-center">There's no data to show.</h4>
            <?php } ?>
            <button class="btn btn-secondary col d-flex justify-content-center align-items-center p-0"><a
                    href="/index.php"
                    class="w-100 h-100 px-2 py-3 d-flex justify-content-center align-items-center">Back</a></button>

        </div>
    </div>
</body>

</html>