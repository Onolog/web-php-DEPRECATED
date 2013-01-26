<?php
/* Workouts Test cases generated on: 2011-06-07 03:25:18 : 1307442318*/
App::import('Controller', 'Workouts');

class TestWorkoutsController extends WorkoutsController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class WorkoutsControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.workout', 'app.user', 'app.group', 'app.shoe');

	function startTest() {
		$this->Workouts =& new TestWorkoutsController();
		$this->Workouts->constructClasses();
	}

	function endTest() {
		unset($this->Workouts);
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
