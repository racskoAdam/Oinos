<?php
/**
 * Transaction
 */

// Require utility
require_once("Util.php");

// Transaction
class Transaction {

  // Set properties
  private $query,
          $type,
          $params,
          $id,
          $callBack,
          $fetchMode,
          $paramsType = null;

  // Constructor
  function __construct($args=null, $isAssoc=null) {

    // When arguments is string, then set to array query index
    if (is_string($args)) $args = array("query" => $args);

    // Merge arguments with default
    $args = Util::objMerge(array(
      "query"     => null,
      "params"    => null,
      "id"        => null,
      "callBack"  => null,
      "fetchMode" => null,
    ), $args, true);

    // Set properties
    $this->set_query($args["query"]);
    $this->set_type();
    $this->set_params($args["params"]);
    $this->set_id($args["id"]);
    $this->set_callBack($args["callBack"]);
    $this->set_fetchMode($args["fetchMode"], $isAssoc);
    $this->check_query();
  }

  // Set query
  private function set_query($query) {
    if (!is_string($query)) $query = "";
    $this->query = trim($query);
  }

  // Get query
  public function get_query() {
    return $this->query;
  }

  // Check query
  private function check_query() {
    if (!is_null($this->params)   && 
        $this->paramsType === "A" && 
        $this->type === "INSERT"  &&
        strtoupper(substr($this->query, -6)) === "VALUES") {
      preg_match('#\((.*?)\)#', $this->query, $matches);
      if (count($matches) == 2 && strlen($matches[1]) > 0) {
        $fields = explode(",", $matches[1]);
        $qmarks = substr(str_repeat("?,", count($fields)), 0, -1);
        $qmarks = " " . substr(str_repeat("(" . $qmarks . "),", count($this->params)/count($fields)), 0, -1);
        $this->query .= $qmarks;
      }
    }
  }

  // Set transaction type
  private function set_type() {
    $type = strtoupper(strtok($this->query, " "));
    if (in_array($type, array("SELECT","INSERT","UPDATE","DELETE","CREATE","ALTER","DROP","TRUNCATE")))
          $this->type = $type;
    else  $this->type = null;
  }

  // Get transaction type
  public function get_type() {
    return $this->type;
  }

  // Check is transaction valid
  public function is_valid() {
    return !is_null($this->type);
  }

  // Set transaction parameters
  private function set_params($params) {

    // Check parameters exist
    if (is_array($params) && !empty($params)) {

      // Set parameters type default to object
      $this->paramsType = "O";

      // Check is parameters array
      if (!Util::isAssocArray($params) && 
          is_array($params[0]) && 
          !empty($params[0])) {

        // Set parameters type to array
        $this->paramsType = "A";
        $this->params = array();

        // Convert to simple array
        foreach($params as $row) {
          $this->params = array_merge($this->params, $row);
        }
      } else  $this->params = $params;
    } else    $this->params = null; 
  }

  // Get transaction parameters
  public function get_params() {
    return $this->params;
  }

  // Set transaction identifier
  private function set_id($id) {
    if (is_string($id)) {
      $id = trim($id);
      if (!empty($id))
            $this->id = $id;
      else  $this->id = null;
    } else  $this->id = null;
  }

  // Get transaction identifier
  public function get_id() {
    return $this->id;
  }

  // Set transaction call back function
  private function set_callBack($callBack) {
    if (is_string($callBack) && function_exists($callBack))
          $this->callBack = $callBack;
    else  $this->callBack = null;
  }

  // Get transaction call back function
  public function get_callBack() {
    return $this->callBack;
  }

  // Check transaction has call back function
  public function is_callBack() {
    return !is_null($this->callBack);
  }

  // Set select fetch mode
  private function set_fetchMode($fetchMode, $isAssoc) {
    if ($this->type === "SELECT") {
      if (is_bool($isAssoc))
        $fetchMode = $isAssoc ? PDO::FETCH_ASSOC : PDO::FETCH_NUM;
      if (!is_int($fetchMode) || 
          !in_array($fetchMode, array(
            PDO::FETCH_NUM, 
            PDO::FETCH_ASSOC
          ))) $fetchMode = null;
            $this->fetchMode = $fetchMode;
    } else  $this->fetchMode = null; 
  }

  // Get select fetch mode
  public function get_fetchMode() {
    return $this->fetchMode;
  }
}