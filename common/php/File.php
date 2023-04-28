<?php

/**
 * File
 */

class File {

	// Read file by line
	public static function readByLine($file, $skipEmpty=true) {
		if (is_readable($file)) {
			if (($handle = fopen($file, "r"))) {
				if (!is_bool($skipEmpty)) $skipEmpty = true;
				$result = array();
				while(!feof($handle)) {
					$line = trim(fgets($handle));
					if (!empty($line) || !$skipEmpty)
						$result[] = $line;
				}
				fclose($handle);
				return $result;
			} else	throw new Error("Unable to open file {$file}!");
		} else		throw new Error("The file cannot be found or cannot be read {$file}!");
	}
}