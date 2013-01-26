<?php
/* Brand Fixture generated on: 2011-07-18 23:42:42 : 1311057762 */
class BrandFixture extends CakeTestFixture {
	var $name = 'Brand';

	var $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary', 'collate' => 'NULL'),
		'name' => array('type' => 'string', 'null' => true, 'default' => NULL, 'length' => 20, 'collate' => 'latin1_swedish_ci'),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1)),
		'tableParameters' => array()
	);

	var $records = array(
		array(
			'id' => 1,
			'name' => 'Lorem ipsum dolor '
		),
	);
}
