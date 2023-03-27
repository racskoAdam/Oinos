<?php
// register.php

// connect to the database
$con = mysqli_connect("localhost", "root", "", "opd");

// check connection
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
mysqli_set_charset($con, "utf8");

// get the user data from the request
$password = mysqli_real_escape_string($con, $_POST['password']);
$email = mysqli_real_escape_string($con, $_POST['email']);
$phone = mysqli_real_escape_string($con, $_POST['phone']);
$zipcode = mysqli_real_escape_string($con, $_POST['zipcode']);
$address = mysqli_real_escape_string($con, $_POST['address']);
$lastname = mysqli_real_escape_string($con, $_POST['lastname']);
$firstname = mysqli_real_escape_string($con, $_POST['firstname']);

// check if user with the given email already exists
$check_sql = "SELECT * FROM users WHERE email = '$email'";
$check_result = mysqli_query($con, $check_sql);

if (mysqli_num_rows($check_result) > 0) {
  // user with the given email already exists
  echo "User with email $email already exists.";
} else {
  // insert the user data into the database
  $sql = "INSERT INTO users (password, email, phone, zipcode, address, lastname, firstname, type) VALUES ('$password', '$email', '$phone', '$zipcode', '$address', '$lastname', '$firstname', 'user')";
  $result = mysqli_query($con, $sql);

  if ($result) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($con);
  }
}

mysqli_close($con);
?>