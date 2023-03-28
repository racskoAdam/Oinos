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
$email = mysqli_real_escape_string($con, $_POST['email']);
$password = mysqli_real_escape_string($con, $_POST['password']);

// check if user with the given email and password exists
$sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) == 1) {
  // user exists and password is correct
  $row = mysqli_fetch_assoc($result);
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

  echo json_encode($response);
} else {
  // user does not exist or password is incorrect
  $response = array("status" => "error");
  echo json_encode($response);
}

mysqli_close($con);

?>