<?php
// getUserData.php

session_start();

$userData = array(
  "id" => $_SESSION["user_id"],
  "email" => $_SESSION["email"],
  "phone" => $_SESSION["phone"],
  "zipcode" => $_SESSION["zipcode"],
  "address" => $_SESSION["address"],
  "lastname" => $_SESSION["lastname"],
  "firstname" => $_SESSION["firstname"]
);

echo json_encode($userData);
?>