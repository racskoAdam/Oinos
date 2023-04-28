<?php

/**
 * Database
 */

class Database {

	// Set properties
  private $db,
          $dbHandle,
          $options,
          $conn;

	// Constructor
  function __construct($db=null, $options=null) {
    $this->set_db($db);
    $this->set_options($options);
    $this->set_connection();
    $this->connect();
  }

	// Destructor
	function __destruct() {
		$this->close();
  }

  // Set database
  private function set_db($db) {
    if (!is_string($db)) $db = "";
    $this->db = trim($db);
  }
  
  // Get database
  public function get_db() {
    return $this->db;
  }

  // Set options
  private function set_options($options) {
    $this->options = Util::objMerge(
      array(
        PDO::MYSQL_ATTR_INIT_COMMAND        => "SET NAMES utf8",
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
  public function get_options() {
    return $this->options;
  }

  // Get fetch mode
  public function get_fetch_mode($isAssoc) {
    $fetchMode = $this->options[PDO::ATTR_DEFAULT_FETCH_MODE];
    if (is_bool($isAssoc))
      $fetchMode = $isAssoc ? PDO::FETCH_ASSOC : PDO::FETCH_NUM;
    return $fetchMode;
  }

	// Set connection details
  private function set_connection() {

    // When configuration file exist, then get connection details
		$file = searchForFile('db_config.ini', 'db');
    if (!is_null($file))
          $conn = parse_ini_file($file, true);
    else  $conn = null;
    
    // Merge with default
    $this->conn = Util::objMerge(array(
      "host"    	=> "localhost",
      "dbname"  	=> "",
      "user"    	=> "root",
      "password"	=> ""
    ), $conn, true);

    // Set database name if not exist
    if (empty($this->db))
      $this->set_db($this->conn['dbname']);
    unset($this->conn['dbname']);
  }

	// Connect to MySQL server
  private function connect() {
		try {
			$this->dbHandle = new PDO("mysql:host={$this->conn['host']};
																dbname={$this->db};
																charset=utf8", 
																$this->conn['user'], 
																$this->conn['password'], 
																$this->get_options());
		} catch (Exception $e) {
			throw new Exception($e->getMessage());
		}
	}

  // Check is connected
  public function is_connected() {
    return $this->dbHandle instanceof PDO;
  }

	// Get query type
	private function get_type($query) {
		return strtoupper(strtok($query, " "));
	}

	// Close connection
	public function close() {

		// When is conected, then disconect from MySQL server
    if ($this->is_connected())  $this->dbHandle = null;
	}

  // Prepare query and parameters for insert
  private function prepare_insert(&$query, &$params) {

    // Check parameters
    if (strtoupper(substr(trim($query), -6)) !== 'VALUES') return;
    if (!is_array($params) || empty($params)) return;

    // Get fields count
    $query  = trim($query);
    $beg    = strpos($query, '(');
    $end    = strpos($query, ')');
    if ($beg === false || $end === false) return;
    $fieldCount = count(explode(",", substr($query, $beg+1, $end-$beg-1)));
    unset($beg, $end);

    // Check parameters is associative array
    if (Util::isAssocArray($params)) {

      // Check is valid
      if (count(($keys = array_keys($params))) !== $fieldCount)
        throw new Exception("Invalid number of parameters compared to fields!");
      
      // Add colon to each keys, and prepare query
      $keys   = array_map(function($key) {return ':'.$key;}, $keys); 
      $query .= " (". implode(', ', $keys) . ");";
      return;
    }

    // Check parameters is array of associative array
    if (Util::isAssocArray($params[0])) {

      // Convert to associative array to array of values
      $values = array();
	    foreach($params as $item) {

        // Add to values item values
        if (Util::isAssocArray($item))
		          $values = array_merge($values, array_values($item));
        else  $values = array_merge($values, $item);
	    }

      // Set params
      $params = array_values($values);
      unset($values, $item);
    }
    
    // Check is valid
    if(count($params) % $fieldCount !== 0)
      throw new Exception("Invalid number of parameters compared to fields!");

    // Prepare query
    $qMark	= "(" . str_repeat("?,", $fieldCount);
	  $qMark	= substr($qMark, 0, -1) . ")";
	  $query .= " " . str_repeat($qMark.", ", count($params) / $fieldCount);
	  $query	= substr($query, 0, -2) . ";";
  }

	// Execute
	public function execute($query, $params=null, $isAssoc=null) {
		
		try {

      // Get query type
			$type = $this->get_type($query);

      // Check query type is INSERT
      if ($type === "INSERT") {

        // Prepare query and parameters for insert
        $this->prepare_insert($query, $params);
      }

			// Prepare statement for execution and returns a statement object
			$stmt = $this->dbHandle->prepare($query);

			// Executes a prepared statement
			$stmt->execute($params);

			// Set result
			$result = null;

			// Check query type
			switch($type) {

				// SELECT
				case "SELECT":
					$result = $stmt->fetchAll($this->get_fetch_mode($isAssoc));
          if (empty($result)) $result = null;
					break;

				// INSERT/UPDATE/DELETE
				case "INSERT":
        case "UPDATE":
        case "DELETE":
					$result["affectedRows"] = $stmt->rowCount();
					if ($type === "INSERT" && $result["affectedRows"] > 0) {
						$lastId = $this->dbHandle->lastInsertId();
						if ($lastId !== false) {
							$result["firsInsertId"] = intval($lastId);
							$result["lastInsertId"] = $result["affectedRows"] + $lastId - 1;
						}
					}
					break;
			}

			// Return result
			return $result;

		// Exception (close database, and throw error)
		} catch (Exception $e) {

      // Close connection
			$this->close();

      // Get/Convert error message
      $message = explode(":", trim($e->getMessage()));
      
      // Set error
			throw new Exception($message[count($message)-1]);
		}
	}

	// Get table fields
  public function get_fields($tbl, $db=null) {

    // Check table exist
    if (!is_string($tbl)) return null;

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
                      WHERE `table_schema` = :db AND 
                            `table_name` = :tbl
                      ORDER BY `order`;";
    
    // Execute query
    $result = $this->execute($query, array(
      'db'  => trim($db),
      'tbl' => trim($tbl)
    ));

    // Retur result
    return $result;
  }
}