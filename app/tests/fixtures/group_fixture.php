<?php
/* Group Fixture generated on: 2011-06-07 03:22:40 : 1307442160 */
class GroupFixture extends CakeTestFixture {
	var $name = 'Group';

	var $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary', 'collate' => 'NULL'),
		'name' => array('type' => 'string', 'null' => false, 'length' => 100, 'collate' => 'latin1_swedish_ci'),
		'created' => array('type' => 'datetime', 'null' => true, 'default' => NULL, 'collate' => 'NULL'),
		'modified' => array('type' => 'datetime', 'null' => true, 'default' => NULL, 'collate' => 'NULL'),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1)),
		'tableParameters' => array()
	);

	var $records = array(
		array(
			'id' => 1,
			'name' => 'Lorem ipsum dolor sit amet',
			'created' => '2011-06-07 03:22:40',
			'modified' => '2011-06-07 03:22:40'
		),
	);
}
