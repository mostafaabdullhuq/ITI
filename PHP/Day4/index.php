<?php include_once('./db_config.php'); ?>



<?php
    // delete student form
$submit = $_POST['submit'];
if (isset($submit)) {
    $id = $_POST['id'];
    if (isset($id) && !empty($id)) {
        $mysql->deleteStudent($id);
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link href="./node_modules/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet">
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous">
    </script>
    <style>
    body {
        font-size: 22px;
    }

    .container {
        height: 100vh;
        width: 100vw;
    }

    .student-controls button {
        background: none;
        border: none;
    }

    i,
    a {
        text-decoration: none;
        color: black;
        cursor: pointer;
    }

    i:hover {
        color: #007bff;
        transition: all 0.3s ease-in-out;
    }

    h1 {
        font-size: 50px;
        font-weight: 600;
        color: #4A5059;
    }


    hr {
        display: block;
        width: 100%;
        margin-top: 10px;
        height: 2px;
        background: #4A5059;
        opacity: 0.1;
    }

    .addstudent {
        color: white;
        text-decoration: none;
    }

    .addstudent:hover {
        color: white;
        text-decoration: none;
    }

    .bor {
        border: 1px solid red;
    }
    </style>
    <title>Home</title>
</head>

<body>
    <div class="container d-flex flex-column align-items-center justify-content-center">
        <div class="heading-container d-flex  col-12">
            <h1 class="col">Users Details</h1>
            <button class="col-2 btn btn-success d-flex justify-content-center align-items-center p-0"><a
                    class="addstudent col w-100 h-100 px-2 py-3 d-flex justify-content-center align-items-center"
                    href="/add_student.php">Add New
                    User</a></button>
        </div>
        <hr class="mt-3 mb-5">
        <table class="col-12 table table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Subscribed</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <?php
                        // get all soundest data
                        $studentsInfo = $mysql->getAllStudents();
                        if ($studentsInfo) {
                            foreach ($studentsInfo as $key => $value) {
                                $id = $value['id'];
                                $name = $value['name'];
                                $email = $value['email'];
                                $gender = $value['gender'] === 'M' ? "Male" : "Female";
                                $subscribed = $value['subscribed'] ? "Yes" : "No";
                ?>
                <tr>
                    <th scope='row'><?php echo $id;?></th>
                    <td><?php echo $name;?></td>
                    <td><?php echo $email;?></td>
                    <td><?php echo $gender;?></td>
                    <td><?php echo $subscribed;?></td>
                    <td class="d-flex student-controls">
                        <form method="POST" action="/show.php">
                            <input type="hidden" name="id" value="<?php echo $id; ?>">
                            <input type="hidden" name="submit" value="submit">
                            <button type="submit" value="submit" class="me-3"><i class='fa-solid fa-eye'></i></button>
                        </form>
                        <form method="POST" action="/edit.php">
                            <input type="hidden" name="id" value="<?php echo $id; ?>">
                            <input type="hidden" name="submit" value="update">
                            <button type="submit" value="submit" class="me-3"><i
                                    class='fa-solid fa-pen-to-square'></i></button>
                        </form>
                        <form method="POST" action="<?php $_SERVER['PHP_SELF'] ?>">
                            <input type="hidden" name="id" value="<?php echo $id; ?>">
                            <input type="hidden" name="submit" value="submit">
                            <button type="submit">
                                <i class='fa-solid fa-user-minus'></i>
                            </button>
                        </form>
                    </td>
                </tr>
                <?php }
                        } else {
                            echo "<tr>
                                    <td colspan='6' class='text-center'>There's no data to show.</td>
                                </tr>";
                            }
                        ?>
            </tbody>
        </table>
    </div>
</body>

</html>