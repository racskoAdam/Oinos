<?php
// login.php

// connect to the database
$conn = mysqli_connect("localhost", "root", "", "my_database");

// check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// get the user data from the request
$username = $_POST["username"];
$password = $_POST["password"];

// check if the user exists in the database
$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
  // user exists, return success
  echo "Login successful";
} else {
  // user does not exist, return error
  echo "Invalid username or password";
}

mysqli_close($conn);
?>