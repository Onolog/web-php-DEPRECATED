<?php
/* Shoes Test cases generated on: 2011-06-07 03:23:29 : 1307442209*/
App::import('Controller', 'Shoes');

class TestShoesController extends ShoesController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class ShoesControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.shoe', 'app.user', 'app.group', 'app.workout');

	function startTest() {
		$this->Shoes =& new TestShoesController();
		$this->Shoes->constructClasses();
	}

	function endTest() {
		unset($this->Shoes);
		ClassRegistry::flush();
	}

	function testIndex() {

	}

	function testView() {

	}

	function testAdd() {

	}

	function testEdit() {

	}

	function testDelete() {

	}

}
