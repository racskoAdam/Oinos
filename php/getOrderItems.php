<?php

// Create database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "opd";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Processing data from HTTP requests
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Order ID
$orderId = $request->orderId;

// SQL query to retrieve order item data
$sql = "SELECT oi.itemId, oi.itemQuantity, m.Name as itemName, m.Price as itemPrice
        FROM Orderitems oi
        JOIN Menu m ON oi.itemId = m.Id
        WHERE oi.orderId = '".$orderId."'";
$result = $conn->query($sql);

// SQL results in JSON format
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
