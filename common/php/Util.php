<?php

/* Set environment */
mb_http_output('UTF-8');
mb_regex_encoding('UTF-8');
mb_internal_encoding('UTF-8');
set_time_limit(0);
		
/* Set custom error handler */
error_reporting(false);
set_error_handler('customErrorHandler', E_ALL);
register_shutdown_function('customFatalErrorHandler');

/**
 * Utilityes
 */

class Util {

  // Set result
  public static $result = array(
    "data"  => null,
    "error" => null
  );

  // JSON decode
  public static function jsonDecode($var) {
    $result = json_decode($var, true, 512, 0);
    if (json_last_error() !== JSON_ERROR_NONE)
      throw new Exception("Unable to decode variable!");
    return $result;
  }

  // JSON encode
  public static function jsonEncode($var) {
    $result = json_encode($var, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if (json_last_error() !== JSON_ERROR_NONE)
      throw new Exception("Unable to encode variable!");
    return $result;
  }

  // Get arguments
  public static function getArgs($isRequired=true) {

    // Check parameters
    if (!is_bool($isRequired)) $isRequired = true;

    // Get arguments
    $args = isset( $_GET['data']) ?  $_GET['data']  :
           (isset($_POST['data']) ? $_POST['data']  : 
            file_get_contents("php://input", true));

    // Check arguments exist
    if ($args) {

      // Decode arguments
      $args = self::jsonDecode($args);

    // Check is required
    } elseif($isRequired)
      throw new Exception("Missing parameters!");

    // Return arguments
    return $args;
  }
  
  // Get contents
  public static function getContents($file, $isDecode=false) {

    // Check file exist, and readable
    if (!is_readable($file))
      throw new Exception('File not exist, or not readable: '.$file);

    // Read file contents
    $content = file_get_contents($file);

    // Check is neccesary to decode
    if (($isDecode = is_bool($isDecode) ? $isDecode : false)) {

      // Decode file contents
      $content = self::jsonDecode($content);
    }

    // Return file contents
    return $content;
  }

  // Check is error
  public static function isError() {
    return !is_null(self::$result["error"]);
  }

  // Set error
  public static function setError($msg=null, $db=null) {
    if (!is_string($msg)) $msg = "Unknow error!";
    if (!is_null($db)) $db = null;
    self::$result["error"] = trim($msg);
    self::setResponse();
  }

  // Set response
  public static function setResponse($data=null) {
    self::$result["data"] = $data;
    echo self::jsonEncode(self::$result);
    exit(self::isError() ? 1 : 0);
  }

  // Merge structure with default
  public static function mergeStrDefault($str, $isBasic=true) {

    if (!is_bool($isBasic)) $isBasic = true;
    $path = str_replace(DIRECTORY_SEPARATOR, '/', (realpath(__DIR__.'/..').'/str/'));
    $def  = Util::getContents($path.'table_default.json', true);

    $field = $def['field'];
    $relationship = $field['relationship'];
    $field['relationship'] = null;
    $controls = $def['controls'];
    unset($def['field'], $def['controls']);

    $str = self::objMerge(array_filter($def, function($key) use($isBasic) {
      return !$isBasic || in_array($key, array('db','query','params','isAssoc'));
    }, ARRAY_FILTER_USE_KEY), $str, $isBasic);
    if ($isBasic) return $str;

    // Get fields from MySQL table
    require_once("Database.php");
    $db = new Database($str['db']);
    $tblFields = $db->get_fields($str['tbl']);
    $db = null;

    // Check controls
    $control = $controls['default'];
    unset($controls['default']);
    foreach(array_keys($controls) as $key) {
      foreach($controls[$key] as $i => $item) {
        $controls[$key][$i] = self::objMerge($control, $item, true);
      }
    }
    if (array_key_exists('controls', $str)) {
      if (Util::isAssocArray($str['controls'])) {
        foreach(array_keys($str['controls']) as $key) {
          if (!is_null($str['controls'][$key])) {
            foreach($str['controls'][$key] as $i => $item) {
              $str['controls'][$key][$i] = self::objMerge($control, $item, true);
            }
          } elseif (array_key_exists($key, $controls)) $str['controls'][$key] = $controls[$key];
        }
      } else $str['controls'] = $controls;
    } else $str['controls'] = $controls;

    // When structure has not valid field property, then set from table
    if (!($isStrFieldValid  = array_key_exists('field', $str) && 
                              is_array($str['field']) && 
                                !empty($str['field']))) {
      $str['field'] = $tblFields;
    }

    foreach($str['field'] as $i => $o) {
      if (!$isStrFieldValid) { 
        if ($o['column_key'] === 'PRI')
            $o['isRequired'] = true;
        if ($o['extra'] === 'auto_increment' || 
            $o['extra'] === 'serial') {
            $o['isAutoIncrement'] = true;
            $o['isRequired'] = true;
            $o['isModified'] = false;
            $o['isDuplicated'] = false;
            $o['inpuType'] = 'number';
        }
      }

      if (($index = array_search($o['name'], array_column($tblFields, 'name'))) !== false) {
        $tblFields[$index]['isRequired'] = $tblFields[$index]['isRequired'] === 1;
        $tblFields[$index]['length'] = intval($tblFields[$index]['length']);
        $o = self::objMerge($tblFields[$index], $o);  
      }
      
      $str['field'][$i] = self::objMerge($field, $o, true);
      $str['field'][$i]['model'] = "M_".$str['field'][$i]['name'];
      if ($str['field'][$i]['isTemporary']) {
        foreach(array('isRequired','isModified','isDuplicated','isAutoIncrement') as $key) {
          $str['field'][$i][$key] = false;
        }
      }
      Util::relationship($str['field'][$i]['relationship'], $relationship); 
      foreach(array('table','page') as $key) {
        if (!is_string($str['field'][$i]['label'][$key]['content']) &&
                       $str['field'][$i]['label'][$key]['isVisible'])
          $str['field'][$i]['label'][$key]['content'] = $o['name'];
        if ($key === 'page') {
          if (is_string($str['field'][$i]['label'][$key]['dataName']))
            $str['field'][$i]['label'][$key]['dataName'] = 
                 array($str['field'][$i]['label'][$key]['dataName']);
          if (is_array($str['field'][$i]['label'][$key]['dataName']) &&
                !empty($str['field'][$i]['label'][$key]['dataName'])) {
            foreach($str['field'][$i]['label'][$key]['dataName'] as $ind => $v) {
              if (is_string($v)) $v = array("id" => $v);
              $str['field'][$i]['label'][$key]['dataName'][$ind] = self::objMerge(array(
                "id"    => null,
                "value" => null
              ), $v);
            }
          } else $str['field'][$i]['label'][$key]['dataName'] = null;
        }  
      }
    }
    return $str;
  }

  // Check/Set relationship
  private static function relationship(&$obj, $def) {
    if (Util::isAssocArray($obj)) {
      $obj = self::objMerge($def, $obj);
      foreach(array('db','tbl','id','name') as $key) {
        if (!is_string($obj[$key]) || empty(($obj[$key] = trim($obj[$key])))) {
          $obj = null;
          return;
        }
      }
      if (!is_string($obj['query']) || empty(($obj['query'] = trim($obj['query'])))) {
        $obj['query'] = "SELECT `".$obj['id']."` AS `id`, ".
                               "`".$obj['name']."` AS `name` ".
                        "FROM `".$obj['db']."`.`".$obj['tbl']."` AS `".$obj['tbl']."`";
        if (is_string($obj['filter']) && !empty(($obj['filter'] = trim($obj['filter']))))
          $obj['query'] .= " WHERE ".$obj['filter'];
        if (is_string($obj['order']) && !empty(($obj['order'] = trim($obj['order']))))
          $obj['query'] .= " ORDER BY ".$obj['order'];
        $obj['query'] .= ";";
      }
      foreach(array('db','tbl','filter','order') as $key) {
        unset($obj[$key]);
      }
    } else $obj = null;
  }

  // Check is array associative
  public static function isAssocArray($arr) {
    return  is_array($arr) &&
            !empty($arr) && 
            array_keys($arr) !== range(0, count($arr) - 1);
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
}

// Custom error handler
function customErrorHandler($errNum, $errMsg, $errFile, $errLine) {
	
  /* Set own error array */
	$error = array(
		'type'			=> "E_UNKNOWN",
		'message'		=> trim($errMsg),
		'file'			=> trim($errFile),
		'line'			=> strval($errLine)
	);

  /* Check error type */
  switch ($errNum) {
    case E_ERROR:
      $error['type'] = "E_ERROR"; break;
    case E_WARNING:
      $error['type'] = "E_WARNING"; break;
    case E_PARSE:
      $error['type'] = "E_PARSE"; break;
    case E_NOTICE:
      $error['type'] = "E_NOTICE"; break;
    case E_CORE_ERROR:
      $error['type'] = "E_CORE_ERROR"; break;
    case E_CORE_WARNING:
      $error['type'] = "E_CORE_WARNING"; break;
    case E_COMPILE_ERROR:
      $error['type'] = "E_COMPILE_ERROR"; break;
    case E_CORE_WARNING:
      $error['type'] = "E_COMPILE_WARNING"; break;
    case E_USER_ERROR:
      $error['type'] = "E_USER_ERROR"; break;
    case E_USER_WARNING:
      $error['type'] = "E_USER_WARNING"; break;
    case E_USER_NOTICE:
      $error['type'] = "E_USER_NOTICE"; break;
    case E_STRICT:
      $error['type'] = "E_STRICT"; break;
    case E_RECOVERABLE_ERROR:
      $error['type'] = "E_RECOVERABLE_ERROR"; break;
    case E_DEPRECATED:
      $error['type'] = "E_DEPRECATED"; break;
    case E_USER_DEPRECATED:
      $error['type'] = "E_USER_DEPRECATED"; break;
    case E_ALL:
      $error['type'] = "E_ALL";
  }

  // Conver to string
  array_walk($error, function(&$value, $key) {
    $value = "{$key}: {$value}";
  });

  // Set error
  Util::setError(implode(', ', $error));
}

// Custom fatal error handler
function customFatalErrorHandler() {

  /* Get last error */
  $error = error_get_last();

  /* Check is error */
  if (!is_null($error)) {
  
    /* Check error type */
    switch ($error['type']) {
      case E_ERROR:
      case E_CORE_ERROR:
      case E_COMPILE_ERROR:
      case E_USER_ERROR:
        $isFatalError = true;
        break;
      default:
        $isFatalError = false;
    }
  
    /* If fatal error */
    if ($isFatalError) {
      if (($pos = strpos($error['message'], ':')) !== false)
        $error['message'] = trim(substr($error['message'], $pos+1));
      if (($pos = strpos($error['message'], ' in')) !== false)
        $error['message'] = trim(substr($error['message'], 0, $pos));
      function fakeHandler() {}
      $prevErrorHandler = set_error_handler('fakeHandler', E_ALL);
      restore_exception_handler();
      call_user_func($prevErrorHandler, $error['type'], $error['message'], $error['file'], $error['line']);
    }
  }
}

// Suspend error handler
function suspendErrorHandler() {
  return false;
}