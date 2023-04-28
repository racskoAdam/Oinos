<?php
/**
 * Environment
 */

// Set character emcoding
mb_http_output('UTF-8');
mb_regex_encoding('UTF-8');
mb_internal_encoding('UTF-8');


// Set memory limit
ini_set('memory_limit', '-1');
set_time_limit(0);


// Set application global paths
$GLOBALS['___app___'] = array(
	"path" => array(checkPath(realpath('./'), 'php'))
);
$backfiles = array_reverse(debug_backtrace());
foreach($backfiles as $item) {
	array_push($___app___["path"], checkPath(dirname($item['file']), 'php'));
}
unset($backfiles, $item);
array_push($___app___["path"], checkPath(dirname(__FILE__), 'php'));
$___app___["path"] = array_unique($___app___["path"]);


// Change working directory to first path
chdir($___app___["path"][0]);


// Set custum error reporting
error_reporting(false);
set_error_handler('customErrorHandler', E_ALL);
register_shutdown_function('customFatalErrorHandler');


// Autoload register
spl_autoload_register(function ($className) {

	// Search for class file
	$file = searchForFile($className.'.php', 'php');

	// When is found, then include it
	if (!is_null($file)) require_once($file);
});


// Custom error handler
function customErrorHandler($errNum, $errMsg, $errFile, $errLine) {
  
	// Set own error array
	$error = array(
		'type'			=> "E_UNKNOWN",
		'message'		=> trim($errMsg),
		'file'			=> basename(trim($errFile)),
		'line'			=> strval($errLine)
	);

	// Check error type
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

	// Get last error
	$error = error_get_last();

	// Check is error
	if (!is_null($error)) {
	
		// Check error type
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
	
		// If fatal error
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


// Check path
function checkPath($path, $exceptFolder=null) {

	// Convert path
	$path = trim(strtr($path, array(DIRECTORY_SEPARATOR => '/')));
	$path = mb_strtolower($path, 'UTF-8');

	// Check last character
	if (substr($path, -1) !== '/')
		$path .= '/';

	// Check except folder(s)
	if (is_string($exceptFolder) && 
				!empty(($exceptFolder = mb_strtolower(trim($exceptFolder), 'UTF-8'))) &&
				substr($path, -1 * (mb_strlen($exceptFolder, 'utf-8') + 2)) === '/'.$exceptFolder.'/')
		$path = substr($path, 0, -1 * (mb_strlen($exceptFolder, 'utf-8') + 1));

	// Return result
	return $path;
}


// Search for file
function searchForFile($fileName, $folder=null) {

	// Check/Set parameter folder
	if (is_string($folder) && 
			!empty(($folder = trim($folder)))) {
		if (substr($folder, 0, 1) === '/')
					$folder = substr($folder, 1);
		if (substr($folder, -1) !== '/')
					$folder .= '/';
	} else  $folder  = '';
	$folder = mb_strtolower($folder, 'UTF-8');

	// Get application global
	global $___app___;

	// Each application path(s)
	foreach($___app___["path"] as $path) {

		// Set file
		$file = $path . $folder . $fileName;

		// When is exist, and readeble, then return file
		if (is_readable($file)) return $file;
	}

	// Not found
	return null;
}