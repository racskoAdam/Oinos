<?php


// Require file
require_once('../../../common/php/Database.php');

// Set result
$result = null;

// Get arguments
$args = Util::getArgs();

// Connect to MySQL server
$db = new Database($args["db"]);

// Execute query
$db->execute($args["query"]);

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