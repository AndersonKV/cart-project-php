<?php

namespace App;

class Connection
{
	// DB Params
	private $host = 'localhost';
	private $db_name = 'cart_project';
	private $username = 'root';
	private $password = '';
	private $conn;


	public static function getDb()
	{
		$host = 'localhost';
		$db_name = 'cart_project';
		$username = 'root';
		$password = '';

		try {
			$conn = new \PDO('mysql:host=' . $host . ';dbname=' .
				$db_name, $username, $password);
			return $conn;
		} catch (\PDOException $e) {
			//.. tratar de alguma forma ..//
		}
	}
}
