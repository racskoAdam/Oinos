<?php

$host = "localhost";
$user = "root";
$password = "";
$db = "opd";
$con = mysqli_connect($host, $user, $password, $db);

if (!$con) {
    die("A kapcsolat sikertelen: " . mysqli_connect_error());
}
mysqli_set_charset($con, "utf8");

$name = mysqli_real_escape_string($con, $_POST['name']);
$email = mysqli_real_escape_string($con, $_POST['email']);
$phone = mysqli_real_escape_string($con, $_POST['phone']);
$date_time = mysqli_real_escape_string($con, $_POST['date_time']);
$guest = mysqli_real_escape_string($con, $_POST['guest']);


$check_sql = "SELECT * FROM reservations WHERE phone = '$phone' AND date_time = '$date_time'";
$check_result = mysqli_query($con, $check_sql);

if (mysqli_num_rows($check_result) > 0) {
    echo "A foglalás már létezik erre a telefonszámra és időpontra.";
} else {
  $sql = "INSERT INTO reservations ( name, email, phone, date_time, guest) VALUES ('$name', '$email', '$phone', '$date_time', '$guest')";
  if (mysqli_query($con, $sql)) {
        echo "Sikeresen létrehozott foglalás!";
    } else {
        echo "Hiba: " . $sql . "<br>" . mysqli_error($con);
    }
}

mysqli_close($con);