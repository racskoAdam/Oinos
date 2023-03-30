<?php

// Adatbázis kapcsolat létrehozása
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "opd";

$conn = new mysqli($servername, $username, $password, $dbname);

// Kapcsolat ellenőrzése
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// HTTP kérésből érkező adatok feldolgozása
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Felhasználó e-mail címe
$email = $request->email;

// SQL lekérdezés a rendelések lekérdezéséhez
$sql = "SELECT o.orderId, o.orderDate, o.totalPrice, o.state, oi.itemId, oi.itemQuantity, m.Name, m.Price 
        FROM Orders o 
        JOIN Users u ON o.Email = u.Email 
        JOIN Orderitems oi ON o.orderId = oi.orderId 
        JOIN Menu m ON oi.itemId = m.Id 
        WHERE u.Email = '".$email."'";

$result = $conn->query($sql);

// SQL eredmények JSON formátumban
if ($result->num_rows > 0) {
  $data = array();
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
  echo json_encode($data);
} else {
  echo "No results found.";
}

$conn->close();

?>
