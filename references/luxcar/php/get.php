<?php

// Require file
require_once('../../../common/php/Database.php');

// Debug
//$_GET['data'] = '{"str":"../str/car.json"}';

// Set result
$result = null;

// Get arguments
$args = Util::getArgs();

$db = null;
$options = null;
$str = null;

if (array_key_exists('str', $args)) {
  if (!is_readable($args['str']))
    self::setError("File not exist, or not readeble!");

  $str = file_get_contents($args['str']);
  $str = json_decode($str, true, 512, 0);
  if (json_last_error() !== JSON_ERROR_NONE)
    self::setError("Unable to decode structure file!");

  $result = array(
    "name"  => $str['name'],
    "db"    => $str['db'],
    "db"    => $str['tbl'],
    "label" => $str['label'],
    "rows"  => null
  );

  $db = $str['db'];
  $args = $str['query'];

} else {

  // Ste/Check database

  if (array_key_exists('db', $args)) {

    if (is_string($args['db'])) {

      $args['db'] = trim($args['db']);

      if (!empty($args['db'])) $db = $args['db'];

    }
    unset($args['db']);
  }

  // Ste/Check options
  if (array_key_exists('isAssoc', $args)) {
    if (is_bool($args['isAssoc']) && $args['isAssoc'])
      $options = array(PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC);
    unset($args['isAssoc']);
  }
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
        if (is_null($str))
              $result = $db->get_data();
        else  $result["rows"] = $db->get_data();

        // Set error
} else  Util::setError($db->get_error(), false);

// Disconect
$db = null;

// Set response
Util::setResponse($result);