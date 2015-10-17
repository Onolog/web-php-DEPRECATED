<?php
class Workout extends AppModel {
	var $name = 'Workout';

	var $validate = array(
		'user_id' => array(
			'numeric' => array(
				'rule' => array('numeric'),
				//'message' => 'Your custom message here',
				//'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
		'date' => array(
			'numeric' => array(
				'rule' => array('numeric'),
				'message' => 'Please enter a valid date',
				//'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
    'distance' => array(
			'numeric' => array(
				'rule' => array('numeric'),
				'message' => 'Please enter a valid distance',
				'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
    'start_date' => array(
      'notempty' => array(
        'rule' => array('notempty'),
        'message' => 'You must enter start date for this activity',
      ),
    ),
		'time' => array(
			'numeric' => array(
				'rule' => array('numeric'),
				'message' => 'Please enter a valid time',
				'allowEmpty' => true,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
    'timezone' => array(
      'notempty' => array(
        'rule' => array('notempty'),
        'message' => 'You must enter a valid timezone for this activity',
      ),
    ),
	);

	var $belongsTo = array(
		'User' => array(
			'className' => 'User',
			'foreignKey' => 'user_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'Shoe' => array(
			'className' => 'Shoe',
			'foreignKey' => 'shoe_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);

  function afterFind($results) {
    foreach($results as $key => $result) {
      $workout = $result['Workout'];

      // Add athlete info to the workout
      if (isset($result['User'])) {
        $results[$key]['Workout']['athlete'] = array(
          'id' => idx($result['User'], 'id', 0),
          'name' => idx($result['User'], 'name', ''),
        );
      }

      // Add shoe info to the workout
      if (isset($result['Shoe'])) {
        $results[$key]['Workout']['shoes'] = array(
          'id' => idx($result['Shoe'], 'id', 0),
          'name' => idx($result['Shoe'], 'name', ''),
        );
      }

      // Decode any escaped characters
      if (isset($workout['notes'])) {
        $results[$key]['Workout']['notes'] = html_entity_decode(
          $workout['notes'],
          ENT_QUOTES,
          'UTF-8'
        );
      }
    }
    return $results;
  }

  /**
   * Remove unnecessary data.
   * 
   * TODO: Should this be in the `afterFind` method?
   */
  public function flattenWorkouts($workouts) {
    $data = array();
    foreach($workouts as $workout) {
      $data[] = $workout['Workout'];
    }
    return $data;
  }
}
