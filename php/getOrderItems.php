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

// Rendelés azonosítója
$orderId = $request->orderId;

// SQL lekérdezés a rendelés tétel adatainak lekérdezéséhez
$sql = "SELECT oi.itemId, oi.itemQuantity, m.Name as itemName, m.Price as itemPrice
        FROM Orderitems oi
        JOIN Menu m ON oi.itemId = m.Id
        WHERE oi.orderId = '".$orderId."'";
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
