<?php
/* WorkoutDetail Fixture generated on: 2011-08-08 16:48:00 : 1312847280 */
class WorkoutDetailFixture extends CakeTestFixture {
	var $name = 'WorkoutDetail';

	var $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'length' => 10, 'key' => 'primary', 'collate' => 'NULL'),
		'user_id' => array('type' => 'integer', 'null' => false, 'default' => '0', 'length' => 10, 'collate' => 'NULL'),
		'distance' => array('type' => 'float', 'null' => true, 'default' => NULL, 'length' => '10,2', 'collate' => 'NULL'),
		'shoe_id' => array('type' => 'integer', 'null' => true, 'default' => NULL, 'length' => 10, 'collate' => 'NULL'),
		'notes' => array('type' => 'text', 'null' => true, 'default' => NULL, 'collate' => 'latin1_swedish_ci'),
		'time' => array('type' => 'integer', 'null' => true, 'default' => NULL, 'length' => 8, 'collate' => 'NULL'),
		'workout_id' => array('type' => 'integer', 'null' => false, 'default' => '0', 'length' => 10, 'collate' => 'NULL'),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1)),
		'tableParameters' => array()
	);

	var $records = array(
		array(
			'id' => 1,
			'user_id' => 1,
			'distance' => 1,
			'shoe_id' => 1,
			'notes' => 'Lorem ipsum dolor sit amet, aliquet feugiat. Convallis morbi fringilla gravida, phasellus feugiat dapibus velit nunc, pulvinar eget sollicitudin venenatis cum nullam, vivamus ut a sed, mollitia lectus. Nulla vestibulum massa neque ut et, id hendrerit sit, feugiat in taciti enim proin nibh, tempor dignissim, rhoncus duis vestibulum nunc mattis convallis.',
			'time' => 1,
			'workout_id' => 1
		),
	);
}
