<?php
// login.php

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

// check if user with the given email and password exists
$sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) == 1) {
  // user exists and password is correct
  $row = mysqli_fetch_assoc($result);
  session_start();
  $_SESSION["user_id"] = $row["id"];
  $_SESSION["email"] = $row["email"];
  $_SESSION["phone"] = $row["phone"];
  $_SESSION["zipcode"] = $row["zipcode"];
  $_SESSION["address"] = $row["address"];
  $_SESSION["lastname"] = $row["lastname"];
  $_SESSION["firstname"] = $row["firstname"];
  echo "success";
} else {
  // user does not exist or password is incorrect
  echo "error";
}

mysqli_close($con);
?>
