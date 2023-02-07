<?php

$host = "localhost";
$user = "root";
$password = "";
$db = "opd";

$con = mysqli_connect($host, $user, $password, $db);
$con -> set_charset("utf-8");

if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
  }
  
  $name = mysqli_real_escape_string($con, $_POST['name']);
  $email = mysqli_real_escape_string($con, $_POST['email']);
  $phone = mysqli_real_escape_string($con, $_POST['phone']);
  $date_time = mysqli_real_escape_string($con, $_POST['date_time']);
  
  $sql = "INSERT INTO reservations (name, email, phone, date_time) VALUES ('$name', '$email', '$phone', '$date_time')";
  
  if (mysqli_query($con, $sql)) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($con);
  }
  
  mysqli_close($con);
  