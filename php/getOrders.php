<?php

// Establish a database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "opd";

$conn = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($conn, "utf8");

// Check the connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Process the HTTP request data
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Extract the user's email address from the request data
$email = $request->email;

// Construct an SQL query to retrieve the user's orders
$sql = "SELECT o.orderId, o.orderDate, o.totalPrice, o.state, oi.itemId, oi.itemQuantity, m.Name, m.Price 
        FROM Orders o 
        JOIN Users u ON o.Email = u.Email 
        JOIN Orderitems oi ON o.orderId = oi.orderId 
        JOIN Menu m ON oi.itemId = m.Id 
        WHERE u.Email = '".$email."'";

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
