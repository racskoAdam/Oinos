<?php

// Inport environment
require_once('../../common/php/environment.php');

// Get arguments
$args = Util::getArgs();

// Connect to database
$db = new Database();

// Set query
$query = "SELECT `id` FROM `reservations` 
          WHERE `phone` = :phone AND `date_time` = :date_time;";

// Execute query
$result = $db->execute($query, array(
  'phone'     => $args['phone'],
  'date_time' => $args['date_time']
));

// Check found
if (!is_null($result)) {

  // Disconnect
  $db = null;

  // Set response
  Util::setResponse('A foglalás már létezik erre a telefonszámra és időpontra.');
}

// Set query
$query = "INSERT INTO `reservations` (`name`, `email`, `phone`, `date_time`, `guest`) 
          VALUES (:name, :email, :phone, :date_time, :guest);";

// Execute query
$result = $db->execute($query, $args);

// Disconnect
$db = null;

// Set response
Util::setResponse('Köszönjük a foglalást!');