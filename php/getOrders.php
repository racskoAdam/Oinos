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

// User e-mail address
$email = $request->email;

// SQL query to retrieve orders
$sql = "SELECT o.orderId, o.orderDate, o.totalPrice, o.state, oi.itemId, oi.itemQuantity, m.Name, m.Price 
        FROM Orders o 
        JOIN Users u ON o.Email = u.Email 
        JOIN Orderitems oi ON o.orderId = oi.orderId 
        JOIN Menu m ON oi.itemId = m.Id 
        WHERE u.Email = '".$email."'";

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

?>
