<?php

/**
 * Utilityes
 */

 class Util {

	// Set result
  public static $result = array(
    "data"  => null,
    "error" => null
  );

	// Check is error
  public static function isError() {
    return !is_null(self::$result["error"]);
  }

  // Set error
  public static function setError($msg=null) {
    if (!is_string($msg) || empty(($msg = trim($msg)))) 
			$msg = "Unknow error!";
		self::$result["error"] = $msg;
    self::setResponse();
  }

  // Set response
  public static function setResponse($data=null) {
    self::$result["data"] = $data;
    echo self::jsonEncode(self::$result, 'response');
    exit(self::isError() ? 1 : 0);
  }

	// JSON decode (convert data from json string)
  public static function jsonDecode($var, $errMsg=null) {
    $result = json_decode($var, true, 512, 0);
    if (json_last_error() !== JSON_ERROR_NONE)
      throw new Exception("Unable to decode {$errMsg}!");
    return $result;
  }

  // JSON encode (convert data to json string)
  public static function jsonEncode($var, $errMsg=null) {
    $result = json_encode($var, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if (json_last_error() !== JSON_ERROR_NONE)
      throw new Exception("Unable to encode {$errMsg}!");
    return $result;
  }

	// Get arguments
  public static function getArgs($isRequired=true) {

    // Check parameters
    if (!is_bool($isRequired)) $isRequired = true;

    // Get arguments
    $args = isset($_POST['data']) ? $_POST['data']  :
           (isset( $_GET['data']) ?  $_GET['data']  : 
            file_get_contents("php://input", true));

    // Check request method exist
    if (isset($_SERVER['REQUEST_METHOD'])) {

      // Get application global
	    global $___app___;

      // Set request method
      $___app___['method'] = $_SERVER['REQUEST_METHOD'];
    }

		// Check arguments
		if (!is_string($args) || 
        empty(($args = trim($args))))
			$args = null;

    // Check arguments exist
    if (!is_null($args)) {

      // Decode arguments
      $args = self::jsonDecode($args, 'arguments');

    // Check is required
    } elseif($isRequired)
      throw new Exception("Missing parameters!");

    // Return arguments
    return $args;
  }

	// Merge two object/arrays
  public static function objMerge($target=null, $source=null, $existKeys=false) {

    // Check parameters
    if (!is_array($target))   $target     = array();
    if (!is_array($source))   $source     = array();
    if (!is_bool($existKeys)) $existKeys  = false;

    // Each source keys
    foreach($source as $key => $value) {

      // Check key exist in target
      if (array_key_exists($key, $target)) {

        // Check type is equal
        if (gettype($target[$key]) === gettype($value)) {
          
          // Check type is array
          if (is_array($value)) {

            // Merge two object/arrays recursive
            $target[$key] = self::objMerge($target[$key], $value, $existKeys);

          } else                          $target[$key] = $value;
        } elseif (is_null($target[$key])) $target[$key] = $value;
      } elseif (!$existKeys)              $target[$key] = $value;
    }

    // Return result
    return $target;
  }

  // Check is array associative
  public static function isAssocArray($arr) {
    return  is_array($arr) &&
            !empty($arr) && 
            array_keys($arr) !== range(0, count($arr) - 1);
  }
}