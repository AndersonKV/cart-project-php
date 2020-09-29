<?php

namespace App\Controllers;

//os recursos do miniframework
use MF\Controller\Action;
use MF\Model\Container;

class IndexController extends Action
{


	public function index()
	{
		$product = Container::getModel('Product');

		$raiz = substr($_SERVER['REQUEST_URI'], 1);

		$result = $product->getProducts();

		if ($result != '404') {
			if (count($result) > 0) {
				$arr = $result;
			}
		}

		switch ($raiz) {
			case "cakes":
				$this->view->products = $this->mapProductsSelected($raiz, $arr);
				break;
			case "cupcakes":
				$this->view->products = $this->mapProductsSelected($raiz, $arr);
				break;
			case "sweets":
				$this->view->products = $this->mapProductsSelected($raiz, $arr);
				break;
			case "doughnuts":
				$this->view->products = $this->mapProductsSelected($raiz, $arr);
				break;
			default:
				$this->view->products = $arr;
		}

		$this->render('index');
	}

	public function checkout()
	{
		$product = Container::getModel('Product');

		$raiz = substr($_SERVER['REQUEST_URI'], 1);

		$result = $product->getProducts();

		if ($result != '404') {
			if (count($result) > 0) {
				$arr = $result;
			}
		}

		switch ($raiz) {
			case "cakes":
				$this->view->products = $this->mapProductsSelected($raiz, $arr);
				break;
			case "cupcakes":
				$this->view->products = $this->mapProductsSelected($raiz, $arr);
				break;
			case "sweets":
				$this->view->products = $this->mapProductsSelected($raiz, $arr);
				break;
			case "doughnuts":
				$this->view->products = $this->mapProductsSelected($raiz, $arr);
				break;
			default:
				$this->view->products = $arr;
		}

		$this->render('checkout');
	}
	public function cakes()
	{
		$this->render('cakes');
	}
	public function sweets()
	{
		$this->render('sweets');
	}
	public function cupcakes()
	{
		$this->render('cupcakes');
	}
	public function doughnuts()
	{
		$this->render('doughnuts');
	}


	public function products()
	{
		$product = Container::getModel('Product');

		if ($_POST == null) {
			header('Location: /');
		} else {
			$res = $product->getProducts();
			echo json_encode($res);
		}
	}

	public function get_one_product()
	{
		$product = Container::getModel('Product');

		if ($_POST == null) {
			header('Location: /');
		} else {
			$text = $_POST['search'];
			$res = $product->searchProduct($text);

			if (empty($res)) {
				echo ('error');
			} else {
				echo json_encode($res);
			}
		}
	}

	function mapProductsSelected($pathName, $items)
	{
		$coisa = array();

		for ($i = 0; $i < count($items); $i++) {
			if ($items[$i]['type'] == $pathName) {
				array_push($coisa, $items[$i]);
			}
		}

		return $coisa;
	}
}
