<?php
/* Shoe Fixture generated on: 2011-06-07 03:23:27 : 1307442207 */
class ShoeFixture extends CakeTestFixture {
	var $name = 'Shoe';

	var $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'length' => 10, 'key' => 'primary', 'collate' => 'NULL'),
		'shoe_name' => array('type' => 'string', 'null' => false, 'length' => 60, 'collate' => 'latin1_swedish_ci'),
		'brand' => array('type' => 'string', 'null' => true, 'default' => NULL, 'length' => 60, 'collate' => 'latin1_swedish_ci'),
		'user_id' => array('type' => 'integer', 'null' => false, 'default' => '0', 'length' => 10, 'collate' => 'NULL'),
		'inactive' => array('type' => 'boolean', 'null' => true, 'default' => NULL, 'collate' => 'NULL'),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1)),
		'tableParameters' => array()
	);

	var $records = array(
		array(
			'id' => 1,
			'shoe_name' => 'Lorem ipsum dolor sit amet',
			'brand' => 'Lorem ipsum dolor sit amet',
			'user_id' => 1,
			'inactive' => 1
		),
	);
}
