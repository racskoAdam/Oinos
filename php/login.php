<?php

// Connect to the database
$con = mysqli_connect("localhost", "root", "", "opd");

// Check connection
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
mysqli_set_charset($con, "utf8");

// Get the user data from the request
$email = mysqli_real_escape_string($con, $_POST['email']);
$password = mysqli_real_escape_string($con, $_POST['password']);

// Check if a user with the given email and password exists
$sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) == 1) {
  // User exists and password is correct
  $row = mysqli_fetch_assoc($result);
  
  // Start a new session and set session variables
  session_start();
  $_SESSION["email"] = $row["Email"];
  $_SESSION["phone"] = $row["Phone"];
  $_SESSION["zipcode"] = $row["ZipCode"];
  $_SESSION["address"] = $row["Address"];
  $_SESSION["lastname"] = $row["LastName"];
  $_SESSION["firstname"] = $row["FirstName"];

  // Create a success response array
  $response = array(
    "status" => "success",
    "email" => $row["Email"],
    "phone" => $row["Phone"],
    "zipcode" => $row["ZipCode"],
    "address" => $row["Address"],
    "lastname" => $row["LastName"],
    "firstname" => $row["FirstName"]
  );

  // Output the response as a JSON string
  echo json_encode($response);
} else {
  // User does not exist or password is incorrect
  // Create an error response array
  $response = array("status" => "error");
  // Output the response as a JSON string
  echo json_encode($response);
}

// Close the database connection
mysqli_close($con);

?>
