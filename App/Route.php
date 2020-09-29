<?php

namespace App;

use MF\Init\Bootstrap;

class Route extends Bootstrap
{

	protected function initRoutes()
	{
		$routes['home'] = array(
			'route' => '/',
			'controller' => 'indexController',
			'action' => 'index'
		);
		$routes['checkout'] = array(
			'route' => '/checkout',
			'controller' => 'indexController',
			'action' => 'checkout'
		);

		$routes['cakes'] = array(
			'route' => '/cakes',
			'controller' => 'indexController',
			'action' => 'cakes'
		);
		$routes['sweets'] = array(
			'route' => '/sweets',
			'controller' => 'indexController',
			'action' => 'sweets'
		);
		$routes['cupcakes'] = array(
			'route' => '/cupcakes',
			'controller' => 'indexController',
			'action' => 'cupcakes'
		);
		$routes['doughnuts'] = array(
			'route' => '/doughnuts',
			'controller' => 'indexController',
			'action' => 'doughnuts'
		);
		$routes['products'] = array(
			'route' => '/products',
			'controller' => 'indexController',
			'action' => 'products'
		);
		$routes['get_one_product'] = array(
			'route' => '/get_one_product',
			'controller' => 'indexController',
			'action' => 'get_one_product'
		);

		$this->setRoutes($routes);
	}
}
