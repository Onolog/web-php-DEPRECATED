<?php
/* User Fixture generated on: 2011-06-07 03:23:06 : 1307442186 */
class UserFixture extends CakeTestFixture {
	var $name = 'User';

	var $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'length' => 10, 'key' => 'primary', 'collate' => 'NULL'),
		'first_name' => array('type' => 'string', 'null' => false, 'length' => 20, 'collate' => 'latin1_swedish_ci'),
		'last_name' => array('type' => 'string', 'null' => false, 'length' => 40, 'collate' => 'latin1_swedish_ci'),
		'email' => array('type' => 'string', 'null' => false, 'length' => 80, 'key' => 'unique', 'collate' => 'latin1_swedish_ci'),
		'password' => array('type' => 'string', 'null' => false, 'length' => 40, 'collate' => 'latin1_swedish_ci'),
		'group_id' => array('type' => 'boolean', 'null' => false, 'default' => '0', 'collate' => 'NULL'),
		'active' => array('type' => 'string', 'null' => true, 'default' => NULL, 'length' => 32, 'collate' => 'latin1_swedish_ci'),
		'created' => array('type' => 'datetime', 'null' => false, 'default' => '0000-00-00 00:00:00', 'collate' => 'NULL'),
		'modified' => array('type' => 'datetime', 'null' => true, 'default' => NULL, 'collate' => 'NULL'),
		'week_start' => array('type' => 'boolean', 'null' => false, 'default' => '1', 'collate' => 'NULL'),
		'units' => array('type' => 'boolean', 'null' => false, 'default' => '1', 'collate' => 'NULL'),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1), 'email' => array('column' => 'email', 'unique' => 1), 'login' => array('column' => array('email', 'password'), 'unique' => 0)),
		'tableParameters' => array()
	);

	var $records = array(
		array(
			'id' => 1,
			'first_name' => 'Lorem ipsum dolor ',
			'last_name' => 'Lorem ipsum dolor sit amet',
			'email' => 'Lorem ipsum dolor sit amet',
			'password' => 'Lorem ipsum dolor sit amet',
			'group_id' => 1,
			'active' => 'Lorem ipsum dolor sit amet',
			'created' => '2011-06-07 03:23:06',
			'modified' => '2011-06-07 03:23:06',
			'week_start' => 1,
			'units' => 1
		),
	);
}
