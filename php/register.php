<?php
// register.php

// Require file
require_once('../../../common/php/Database.php');
require_once('../../../common/php/Util.php');

// Get arguments
$args = Util::getArgs();

// Get user data from the request
$password = $args['password'];
$email = $args['email'];
$phone = $args['phone'];
$zipcode = $args['zipcode'];
$address = $args['address'];
$lastname = $args['lastname'];
$firstname = $args['firstname'];

// Set options
$options = array(PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC);

// Connect to MySQL server
$db = new Database(null, $options);

// Check if user with the given email already exists
$check_sql = "SELECT * FROM users WHERE email = :email";
$check_transaction = new Transaction(['sql' => $check_sql, 'params' => ['email' => $email]]);
$db->execute($check_transaction);

if (!$db->is_error() && count($db->get_data()) > 0) {
    // User with the given email already exists
    Util::setError("A(z) $email e-mail címmel rendelkező felhasználó már létezik.", false);
} else {
    // Insert the user data into the database
    $sql = "INSERT INTO users (password, email, phone, zipcode, address, lastname, firstname) VALUES (:password, :email, :phone, :zipcode, :address, :lastname, :firstname)";
    $params = [
        'password' => $password,
        'email' => $email,
        'phone' => $phone,
        'zipcode' => $zipcode,
        'address' => $address,
        'lastname' => $lastname,
        'firstname' => $firstname
    ];
    $transaction = new Transaction(['sql' => $sql, 'params' => $params]);
    $db->execute($transaction);

    if (!$db->is_error()) {
        Util::setResponse("Sikeresen létrehozott új rekord");
    } else {
        Util::setError("Hiba: " . $transaction->get_sql() . "<br>" . $db->get_error(), false);
    }
}

// Disconnect
$db = null;
?>
