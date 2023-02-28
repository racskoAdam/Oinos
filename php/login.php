<?php

// Require file
require_once('../../../common/php/Database.php');

//$_GET['data'] = '{"email":"odry.attila@keri.mako.hu","password":"1234Aa"}';

$query =  "SELECT `id`, `type`, ".
          "CONCAT_WS(' ', `prefix_name`, `last_name`, `middle_name`, `first_name`,  `suffix_name`) AS `name` ".
          "FROM `user` ".
          "WHERE `valid` = 1 AND `email` = :email AND BINARY `password` = :password;";

// Set result
$result = null;

// Get arguments
$args = Util::getArgs();

// Connect to MySQL server
$db = new Database('luxcar');

// Set transaction
$transaction = new Transaction(array(
  "query"     => $query,
  "params"    => $args,
  "fetchMode" => PDO::FETCH_ASSOC,
));

// Execute query
$db->execute($transaction);

// Check is error
if (!$db->is_error()) {

        // Set result
        $result = $db->get_data();

        // Set error
} else  Util::setError($db->get_error(), false);

// Disconect
$db = null;

// Set response
Util::setResponse($result);