<?php

// Establish a database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "opd";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Process the HTTP request data
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Extract the order ID from the request data
$orderId = $request->orderId;

// Construct an SQL query to retrieve the order item data
$sql = "SELECT oi.itemId, oi.itemQuantity, m.Name as itemName, m.Price as itemPrice
        FROM Orderitems oi
        JOIN Menu m ON oi.itemId = m.Id
        WHERE oi.orderId = '".$orderId."'";
$result = $conn->query($sql);

// Convert the SQL results to JSON format
if ($result->num_rows > 0) {
  $data = array();
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
  echo json_encode($data);
} else {
  echo "No results found.";
}

// Close the database connection
$conn->close();

?>
