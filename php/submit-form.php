<?php

// Import environment
require_once('../../common/php/environment.php');

// Get arguments
$args = Util::getArgs();

// Connect to database
$db = new Database();

// Set query to check if reservation with the same phone number and date_time already exists
$query = "SELECT `id` FROM `reservations` 
          WHERE `phone` = :phone AND `date_time` = :date_time;";

// Execute query
$result = $db->execute($query, array(
  'phone'     => $args['phone'],
  'date_time' => $args['date_time']
));

// Check if reservation already exists
if (!is_null($result)) {
  // Reservation with the same phone number and date_time already exists
  // Disconnect from database
  $db = null;
  // Set response
  Util::setResponse('A foglalás már létezik erre a telefonszámra és időpontra.');
}

// Set query to insert reservation into database
$query = "INSERT INTO `reservations` (`name`, `email`, `phone`, `date_time`, `guest`) 
          VALUES (:name, :email, :phone, :date_time, :guest);";

// Execute query to insert reservation into database
$result = $db->execute($query, $args);

// Disconnect from database
$db = null;

// Set response
Util::setResponse('Köszönjük a foglalást!');

?>
