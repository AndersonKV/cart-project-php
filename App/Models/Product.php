<?php

namespace App\Models;

use MF\Model\Model;

class Product extends Model
{
	private $conn;
	private $table = 'products';

	//construct with DB
	public function __construct($db)
	{
		$this->conn = $db;
	}

	//get post
	public function getProducts()
	{
		try {
			$query = "SELECT * FROM `products`";
			$stmt = $this->conn->prepare($query);
			$stmt->execute();
			return $stmt->fetchAll(\PDO::FETCH_ASSOC);
		} catch (Exception $e) {
			return '404';
		}
	}
	//get one item
	public function searchProduct($text)
	{
		try {
			$query = "SELECT * FROM `products` WHERE `name` LIKE '%$text%'";
			$stmt = $this->conn->prepare($query);
			$stmt->execute();
			return $stmt->fetchAll(\PDO::FETCH_ASSOC);
		} catch (Exception $e) {
			return '404';
		}
	}
}
