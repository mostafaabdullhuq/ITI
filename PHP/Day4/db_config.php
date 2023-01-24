<?php

class MYSQL
{
    private $host;
    private $user;
    private $pass;
    private $db;
    private $connection;
    private $status;

    public function __construct($host, $user, $pass, $db)
    {
        $this->host = $host;
        $this->user = $user;
        $this->pass = $pass;
        $this->db = $db;
        $this->status = 'Not Connected.';
    }

    // function to connect to database
    private function connect()
    {
        // connect to database
        $connect = mysqli_connect($this->host, $this->user, $this->pass, $this->db);
        // if connection failed
        if (!$connect) {
            $this->connection = false;
            $this->status = 'Connection Error: ' . mysqli_connect_error();
            // return false and connection error
        } else {
            // if connection succeeded, set the connection field to the connection and return  connection object
            $this->status = 'Connected.';
            $this->connection = $connect;
        }
    }


 

    // function to close connection with database.
    private function disconnect()
    {
        // if there's a connection, close it and anyway update the connection status
        $this->status = $this->connection 
        ?(
            mysqli_close($this->connection) 
            ? 'Not Connected' 
            : 'Error Closing Connection.'
         ) 
         : 'Not Connected.';
    }


    // function that returns the connection status
    public function connectionStatus()
    {
        return $this->status;
    }

    public function createStudents()
    {
        // connect to database
        $this->connect();
        
        $result = $this->connection 
                                    ? mysqli_query($this->connection, '
                                        CREATE TABLE IF NOT EXISTS `students_info` (
                                            id INT PRIMARY KEY AUTO_INCREMENT,
                                            name VARCHAR(255) NOT NULL,
                                            email VARCHAR(255) UNIQUE NOT NULL,
                                            gender ENUM("M","F") NOT NULL,
                                            subscribed BOOLEAN
                                        );
                                        ')
                                    : false;

        // close connection
        $this->disconnect();
        
        // if no connection
        return $result;
    }

    // function to add new student record to database
    public function addStudent($name, $email, $gender, $mailStatus)
    {
        $this->connect();

        // convert user details to real string encoded
        $name = mysqli_real_escape_string($this->connection, $name);
        $email = mysqli_real_escape_string($this->connection, $email);
        $gender = mysqli_real_escape_string($this->connection, $gender);

        
        if ($this->connection) {
            $isExists = mysqli_num_rows(mysqli_query($this->connection, "
                SELECT * FROM students_info
                WHERE (email= '$email');
            "));
            if ($isExists == 0) {
                $query = "
                            INSERT INTO students_info(name, email, gender, subscribed)
                            VALUES (
                                    '$name',
                                    '$email',
                                    '$gender',
                                    $mailStatus
                                    );";
                // success and fail states
                $result = [mysqli_query($this->connection, $query),"Unexpected Error, Please try again later."];
            } else {
                $result = [false, "Email Already Exists."];
            }
            // close the connection
            $this->disconnect();
        } else {
            $result = [false, "Unexpected Error, Please try again later."];
        }

        return $result;
    }

    // function to get all students from database
    public function getAllStudents()
    {        
        // connect to database
        $this->connect();
        
        $query = "SELECT * FROM students_info;";
        $result = $this->connection 
            ? mysqli_query($this->connection, $query)
            : false;

        // close connection
        $this->disconnect();

        return $result;
    }

    // function to get specific student details based on student id
    public function getStudent($id)
    {

        // connect to database
        $this->connect();

        // retrieve student data from database
        $result = $this->connection 
                            ? mysqli_fetch_row(mysqli_query($this->connection, "
                                    SELECT * FROM students_info
                                    WHERE (id= '$id');
                                "))
                            : false;

        // close connection
        $this->disconnect();



        // return the result
        return $result;

    }

    // function to update student details in database based on student id
    public function updateStudent($id, $newName, $newEmail, $newGender, $newMailStatus)
    {
        // connect to database
        $this->connect();

        // convert user details to real string encoded
        $newName = mysqli_real_escape_string($this->connection, $newName);
        $newEmail = mysqli_real_escape_string($this->connection, $newEmail);
        $newGender = mysqli_real_escape_string($this->connection, $newGender);

        // if there's a connection with database
        if ($this->connection) {

            // check if user with this id exists in database
            $isIDExists = mysqli_num_rows(mysqli_query($this->connection, "
                SELECT * FROM students_info
                WHERE (id= '$id');
            "));
            // check if another user with this email exists in database 
            $isEmailExists = mysqli_num_rows(mysqli_query($this->connection, "
                SELECT * FROM students_info
                WHERE (email= '$newEmail' AND id <> $id);
            "));
            // if user exist
            if ($isIDExists == 1) {
                // if email already exists
                if ($isEmailExists == 1) {
                    $result = [false, "Email Already Exists."];
                }
                // if id exists and email is not exists
                else {
                // update user info
                $query = "
                        UPDATE students_info
                        SET
                            name='$newName',
                            email='$newEmail',
                            gender='$newGender',
                            subscribed=$newMailStatus
                        WHERE (id= $id);
                        ";
                // success and fail states
                $result = [mysqli_query($this->connection, $query),"Unexpected Error, Please try again later."];

                }
            } else {
                $result = [false, "There's no user with this id."];
            }
            // close the connection
            $this->disconnect();
        } else {
            $result = [false, "Unexpected Error, Please try again later."];
        }

        return $result;
    }

    // function to delete student from database based on student id
    public function deleteStudent($id)
    {
        // connect to database
        $this->connect();

        // delete student with $id from database
        $result = $this->connection
            ? mysqli_query($this->connection, "
                DELETE FROM students_info
                WHERE (id= '$id');
            ")
            : false;
        $this->disconnect();

        // return deletion result
        return $result;
    }
}


// create new instance of mysql class
$mysql = new MYSQL('localhost', 'root', '', 'students');


?>