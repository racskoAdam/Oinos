<?php

// Require file
require_once('../../../common/php/Database.php');

// Set result
$result = null;

// Get arguments
$args = Util::getArgs();

// Ste/Check database
$db = null;
if (array_key_exists('db', $args)) {
  if (is_string($args['db'])) {
    $args['db'] = trim($args['db']);
    if (!empty($args['db'])) $db = $args['db'];
  }
  unset($args['db']);
}

// Ste/Check options
$options = null;
if (array_key_exists('isAssoc', $args)) {
  if (is_bool($args['isAssoc']) && $args['isAssoc'])
    $options = array(PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC);
  unset($args['isAssoc']);
}

// Connect to MySQL server
$db = new Database($db, $options);

// Set transaction
$transaction = new Transaction($args);

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