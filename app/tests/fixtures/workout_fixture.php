<?php
/* Workout Fixture generated on: 2011-06-07 03:23:43 : 1307442223 */
class WorkoutFixture extends CakeTestFixture {
	var $name = 'Workout';

	var $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'length' => 10, 'key' => 'primary', 'collate' => 'NULL'),
		'user_id' => array('type' => 'integer', 'null' => false, 'default' => '0', 'length' => 10, 'collate' => 'NULL'),
		'route_id' => array('type' => 'integer', 'null' => true, 'default' => NULL, 'length' => 3, 'collate' => 'NULL'),
		'route_name' => array('type' => 'string', 'null' => true, 'default' => NULL, 'length' => 60, 'collate' => 'latin1_swedish_ci'),
		'distance' => array('type' => 'float', 'null' => true, 'default' => NULL, 'length' => '10,2', 'collate' => 'NULL'),
		'shoe_id' => array('type' => 'integer', 'null' => true, 'default' => NULL, 'length' => 10, 'collate' => 'NULL'),
		'notes' => array('type' => 'text', 'null' => true, 'default' => NULL, 'collate' => 'latin1_swedish_ci'),
		'date' => array('type' => 'integer', 'null' => false, 'default' => '0', 'collate' => 'NULL'),
		'time' => array('type' => 'integer', 'null' => true, 'default' => NULL, 'length' => 8, 'collate' => 'NULL'),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1)),
		'tableParameters' => array()
	);

	var $records = array(
		array(
			'id' => 1,
			'user_id' => 1,
			'route_id' => 1,
			'route_name' => 'Lorem ipsum dolor sit amet',
			'distance' => 1,
			'shoe_id' => 1,
			'notes' => 'Lorem ipsum dolor sit amet, aliquet feugiat. Convallis morbi fringilla gravida, phasellus feugiat dapibus velit nunc, pulvinar eget sollicitudin venenatis cum nullam, vivamus ut a sed, mollitia lectus. Nulla vestibulum massa neque ut et, id hendrerit sit, feugiat in taciti enim proin nibh, tempor dignissim, rhoncus duis vestibulum nunc mattis convallis.',
			'date' => 1,
			'time' => 1
		),
	);
}
