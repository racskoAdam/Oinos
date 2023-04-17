<?php

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "opd";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Kapcsolódási hiba: " . $conn->connect_error);
}
mysqli_set_charset($conn, "utf8");

// Receiving user data from the request
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$firstName = $data['firstName'];
$lastName = $data['lastName'];
$phone = $data['phone'];
$password = $data['password'];
$city = $data['zipcode'];
$address = $data['address'];

// Updating user data in the database
$sql = "UPDATE users SET firstname='$firstName', lastname='$lastName', phone='$phone', password='$password', zipcode='$city', address='$address' WHERE email='$email'";
if ($conn->query($sql) === TRUE) {
  // Get updated user data from the database
  $sql = "SELECT * FROM users WHERE email='$email'";
  $result = $conn->query($sql);
  $userData = $result->fetch_assoc();
  
  // Send updated user data in JSON format
  header('Content-Type: application/json');
  echo json_encode($userData);
} else {
  // Error updating user data
  echo "Hiba: " . $sql . "<br>" . $conn->error;
}

// Close the database connection
$conn->close();

?>
