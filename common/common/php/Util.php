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

  // JSON decode
  public static function jsonDecode($var) {
    $result = json_decode($var, true, 512, 0);
    if (json_last_error() !== JSON_ERROR_NONE)
      self::setError("Unable to decode variable!");
    return $result;
  }

  // JSON encode
  public static function jsonEncode($var) {
    $result = json_encode($var, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if (json_last_error() !== JSON_ERROR_NONE)
      self::setError("Unable to encode variable!");
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
      self::setError("Missing parameters!");

    // Return arguments
    return $args;
  }
  
  // Get contents
  public static function getContents($file, $isDecode=false) {

    // Check file exist, and readable
    if (!is_readable($file))
      Util::setError('File not exist, or not readable: '.$file);

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
  public static function setError($msg=null, $isEnd=true) {
    if (!is_string($msg)) $msg = "Unknow error!";
    if (!is_bool($isEnd)) $isEnd = true;
    self::$result["error"] = trim($msg);
    if ($isEnd) self::setResponse();
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
    unset($def['field']);

    $str = self::objMerge(array_filter($def, function($key) use($isBasic) {
      return !$isBasic || in_array($key, array('db','query','params','isAssoc'));
    }, ARRAY_FILTER_USE_KEY), $str);
    if ($isBasic) return $str;

    foreach($str['field'] as $i => $o) {
      $str['field'][$i] = self::objMerge($field, $o);
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