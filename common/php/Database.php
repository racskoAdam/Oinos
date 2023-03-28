<?php
/**
 * Connect to database
 * Execute transaction(s)
 */

// Require transaction
require_once("Transaction.php");

// Database
class Database {
  
  // Set properties
  private $db,
          $dbHandle,
          $options,
          $data,
          $error = null;

  // Constructor
  function __construct($db=null, $options=null) {
    $this->set_db($db);
    $this->set_options($options);
    $this->connect();
  }

  // Destructor
  function __destruct() {

    // Close connecton
    $this->close();
  }

  // Set database
  private function set_db($db) {
    if (!is_string($db)) $db = "";
    $this->db = trim($db);
  }

  // Get database
  private function get_db() {
    return $this->db;
  }

  // Set options
  private function set_options($options) {
    $this->options = Util::objMerge(
      array(
        PDO::MYSQL_ATTR_INIT_COMMAND 	      => "SET NAMES 'utf8'",
        PDO::MYSQL_ATTR_USE_BUFFERED_QUERY	=> false,
        PDO::ATTR_ERRMODE 						      => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE        => PDO::FETCH_ASSOC,
        PDO::ATTR_ORACLE_NULLS				      => PDO::NULL_EMPTY_STRING,
        PDO::ATTR_EMULATE_PREPARES		      => false,
        PDO::ATTR_STRINGIFY_FETCHES         => false
      ), $options
    );
  }

  // Get options
  private function get_options() {
    return $this->options;
  }

  // Set data result
  private function set_data($id, $data, $count) {

    // Check transactions count
    if ($count > 1) {
            if (is_null($id)) $id = count($this->data);
            $this->data[$id]  = $data;
    } else  $this->data       = $data;
  }

  // Get data result
  public function get_data() {
    return $this->data;
  }

  // Reset data result
  private function reset_data() {
    $this->data = array();
  }
  
  // Connect to MySQL server
  private function connect() {
    try {
      $this->dbHandle = new PDO('mysql:host=localhost;dbname='. $this->get_db(), 
                                'root','', $this->get_options());
    } catch (Exception $e) {
      throw new Exception($e->getMessage());
    }
  }

  // Close connecton
  public function close() {

    // When is conected, then disconect from MySQL server
    if ($this->is_connected())  $this->dbHandle = null;
  }

  // Check connection success
  private function is_connected() {
    return $this->dbHandle instanceof PDO;
  }

  // Set error message
  public function set_error($error) {
    $this->error = $error;
  }

  // Get error message
  public function get_error() {
    return $this->error;
  }

  // Check is error
  public function is_error() {
    return !is_null($this->error);
  }

  // Execute transaction(s)
  public function execute($transactions=null, $params=null, $isAssoc=null) {

    // When parameters is not array, then convert to array
    if (!is_array($transactions))
      $transactions = array($transactions);

    // Set start transaction(s)
    if (!$this->dbHandle->beginTransaction()) {

      // Close connection
      $this->close();

      // Set error
      throw new Exception("Transaction(s) is not started!");
    }

    // Reset data result
    $this->reset_data();

    // Each transaction(s)
    foreach($transactions as $transaction) {

      // When is string, then try to create new tarnsaction
      if (is_string($transaction) &&
          !empty(($transaction = trim($transaction))))
        $transaction = new Transaction(array(
          "query"   => $transaction,
          "params"  => $params
        ), $isAssoc);

      // When is object, then try to create new tarnsaction
      elseif (is_array($transaction) && 
              array_key_exists('query', $transaction) &&
              is_string($transaction['query']) &&
              !empty(($transaction['query'] = trim($transaction['query'])))) {
        if (!array_key_exists('params', $transaction))
          $transaction['params'] = $params;
        $transaction = new Transaction($transaction, $isAssoc);
      }

      // When transaction is not valid, then set error, and break process
      if (!($transaction instanceof Transaction) || 
          !$transaction->is_valid()) {
        $this->set_error("Invalid transction!");
        break;
      }

      // Try
      try {

        // Prepares a statement for execution and returns a statement object
        $stmt = $this->dbHandle->prepare($transaction->get_query());

        // Executes a prepared statement
        $stmt->execute($transaction->get_params());

        // Get transaction type
        $type = $transaction->get_type();

        // Check transaction type
        switch($type) {

          // SELECT
          case "SELECT":

            // Set data result, and break
            $this->set_data($transaction->get_id(), 
                            $stmt->fetchAll($transaction->get_fetchMode()),
                            count($transactions));
            break;
          
          // INSERT/UPDATE/DELETE
          case "INSERT":
          case "UPDATE":
          case "DELETE":

            // Set data result
            $data = array();

            // When is transaction INSERT, then get last inserted identifier
            if ($type === "INSERT") 
              $data["lastInsertId"] = $this->dbHandle->lastInsertId();

            // Get affected rows
            $data["affectedRows"] = $stmt->rowCount();

            // Set data result, and break
            $this->set_data($transaction->get_id(), $data, count($transactions));
            break;
          
          // UNDER CONSTRUCTION
          case "CREATE":
          case "ALTER":
          case "DROP":
          case "TRUNCATE":
            
            // Set data result, and break
            $this->set_data($transaction->get_id(), true, count($transactions));
            break;
        }

        // Check transaction has call back function
        if ($transaction->is_callBack()) {

          // Call transaction call back function
          call_user_func($transaction->get_callBack(), $this);

          // When is error, then break process
          if ($this->is_error()) break; 
        }
      
      // Exception (set error, and break process)
      } catch (Exception $e) {
        $this->set_error($e->getMessage());
        break;
      }
    }

    // When is error, then roll back, otherwise finalize
    if ($this->is_error())
          $this->dbHandle->rollBack();
    else  $this->dbHandle->commit();
  }

  // Get table fields
  public function get_fields($tbl, $db=null) {

    // When database not exist, then get current
    if (!is_string($db)) $db = $this->get_db();

    // Create query
    $query = "SELECT  `column_name` AS `name`,
                      CASE
                        WHEN  `data_type` = 'date' THEN 'date'
                        WHEN  `data_type` = 'time' THEN 'time'
                        WHEN  `data_type` = 'datetime'  OR
                              `data_type` = 'timestamp' THEN 'datetime-local'
                        WHEN  `data_type` LIKE '%int%'  OR
                              `data_type` = 'serial'    OR
                              `data_type` = 'decimal'   OR
                              `data_type` = 'float'     OR
                              `data_type` = 'double'    OR
                              `data_type` = 'real'      OR
                              `data_type` = 'bit'       OR
                              `data_type` = 'boolean'   OR
                              `data_type` = 'year'      THEN 'number'
                        ELSE 'text'
                      END AS `inputType`,
                      CASE
                        WHEN  `data_type` = 'date' THEN 'date'
                        WHEN  `data_type` = 'time' THEN 'time'
                        WHEN  `data_type` = 'datetime'  OR
                              `data_type` = 'timestamp' THEN 'datetime'
                        WHEN  `data_type` LIKE '%int%'  OR
                              `data_type` = 'serial'    OR
                              `data_type` = 'decimal'   OR
                              `data_type` = 'real'      OR
                              `data_type` = 'bit'       OR
                              `data_type` = 'boolean'   OR
                              `data_type` = 'year'      THEN 'int'
                        WHEN  `data_type` = 'float'     OR
                              `data_type` = 'double'    THEN 'float'
                        ELSE 'string'
                      END AS `type`,
                      CASE
                        WHEN  `data_type` = 'date' THEN 10
                        WHEN  `data_type` = 'time' THEN 8
                        WHEN  `data_type` = 'datetime'  OR
                              `data_type` = 'timestamp' THEN 19
                        WHEN  `column_type` LIKE '%)%' AND
                              `column_type` LIKE '%(%' 
                              THEN CAST(substring_index(substring_index(`column_type`,'(',-1),')',1) AS UNSIGNED)
                        WHEN  `character_maximum_length` IS NOT NULL THEN `character_maximum_length`
                        WHEN  `numeric_precision` IS NOT NULL THEN `numeric_precision`
                        ELSE  0
                      END AS `length`,
                      `column_type` AS `dataType`,
                      IF(`column_default`='NULL', NULL, `column_default`) AS `defaultValue`,
                      IF (`is_nullable`= 'NO', 1, 0) AS `isRequired`,
                      `ordinal_position` AS `order`,
                      `column_key`,
                      `extra` 
                      FROM  `information_schema`.`columns`
                      WHERE `table_schema`='" . $db . "' AND 
                            `table_name`='" . $tbl . "'
                      ORDER BY `order`;";
    
    // Execute query
    $this->execute($query);

    // When is error, then close connection, and throw error
    if ($this->is_error()) {
      $this->close();
      throw new Exception($this->get_error());
    }

    // Retur result
    return $this->get_data();
  }
}