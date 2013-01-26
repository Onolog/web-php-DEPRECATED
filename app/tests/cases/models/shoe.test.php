<?php
/* Shoe Test cases generated on: 2011-06-07 03:23:27 : 1307442207*/
App::import('Model', 'Shoe');

class ShoeTestCase extends CakeTestCase {
	var $fixtures = array('app.shoe', 'app.user', 'app.group', 'app.workout');

	function startTest() {
		$this->Shoe =& ClassRegistry::init('Shoe');
	}

	function endTest() {
		unset($this->Shoe);
		ClassRegistry::flush();
	}

}
