<?php
// login.php

// Require file
require_once('../../../common/php/Database.php');
require_once('../../../common/php/Util.php');

// Get arguments
$args = Util::getArgs();

// Get user data from the request
$email = $args['email'];
$password = $args['password'];

// Set options
$options = array(PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC);

// Connect to MySQL server
$db = new Database(null, $options);

// Check if user with the given email and password exists
$sql = "SELECT * FROM users WHERE email = :email AND password = :password";
$params = ['email' => $email, 'password' => $password];
$transaction = new Transaction(['sql' => $sql, 'params' => $params]);
$db->execute($transaction);

if (!$db->is_error() && count($data = $db->get_data()) == 1) {
    // User exists and password is correct
    $row = $data[0];
    session_start();
    $_SESSION["email"] = $row["Email"];
    $_SESSION["phone"] = $row["Phone"];
    $_SESSION["zipcode"] = $row["ZipCode"];
    $_SESSION["address"] = $row["Address"];
    $_SESSION["lastname"] = $row["LastName"];
    $_SESSION["firstname"] = $row["FirstName"];

    $response = array(
        "status" => "success",
        "email" => $row["Email"],
        "phone" => $row["Phone"],
        "zipcode" => $row["ZipCode"],
        "address" => $row["Address"],
        "lastname" => $row["LastName"],
        "firstname" => $row["FirstName"]
    );

    Util::setResponse($response);
} else {
    // User does not exist or password is incorrect
    $response = array("status" => "error");
    Util::setResponse($response);
}

// Disconnect
$db = null;
?>
