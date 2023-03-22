<?php
// Adatbázis kapcsolódás
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "opd";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Kapcsolódási hiba: " . $conn->connect_error);
}
mysqli_set_charset($conn, "utf8");

// Felhasználói adatok fogadása
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$firstName = $data['firstName'];
$lastName = $data['lastName'];
$phone = $data['phone'];
$password = $data['password'];
$city = $data['city'];
$address = $data['address'];

// Adatok frissítése az adatbázisban
$sql = "UPDATE users SET firstname='$firstName', lastname='$lastName', phone='$phone', password='$password', zipcode='$city', address='$address' WHERE email='$email'";
if ($conn->query($sql) === TRUE) {
  // Frissített adatok lekérése az adatbázisból
  $sql = "SELECT * FROM users WHERE email='$email'";
  $result = $conn->query($sql);
  $userData = $result->fetch_assoc();
  
  // Frissített adatok küldése JSON formátumban
  header('Content-Type: application/json');
  echo json_encode($userData);
} else {
  echo "Hiba: " . $sql . "<br>" . $conn->error;
}

// Kapcsolat lezárása
$conn->close();
?>
