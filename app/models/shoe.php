<?php
class Shoe extends AppModel {
	var $name = 'Shoe';
	var $validate = array(
		'model' => array(
			'notempty' => array(
				'rule' => array('notempty'),
				'message' => 'You must enter a name for this shoe',
				//'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
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
	);

	// The Associations below have been created with all possible keys,
	// those that are not needed can be removed
	var $belongsTo = array(
		'User' => array(
			'className' => 'User',
			'foreignKey' => 'user_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'Brand' => array(
			'className' => 'Brand',
			'foreignKey' => 'brand_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);

	var $hasMany = array(
		'Workout' => array(
			'className' => 'Workout',
			'foreignKey' => 'shoe_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => 'Workout.date DESC',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		),
		/*
		'WorkoutDetail' => array(
			'className' => 'WorkoutDetail',
			'foreignKey' => 'shoe_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => 'Workout.date DESC',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		)
		*/
	);

  function afterFind($results) {
    foreach ($results as $key => $result) {

      // Get the Brand name
      if (isset($result['Brand'])) {
        $results[$key]['Shoe']['brand'] = $result['Brand']['name'];
      }

      // Concatenate Brand and name for convenience
      if (isset($results[$key]['Shoe']['brand']) &&
          isset($result['Shoe']['model'])) {
        $results[$key]['Shoe']['name'] =
          $results[$key]['Shoe']['brand'].' '.$result['Shoe']['model'];
      }

      if (isset($result['Workout'])) {
        // Calculate mileage and workouts for each shoe
        $results[$key]['Shoe']['mileage'] = $this->getShoeMileage($result);
        $results[$key]['Shoe']['workouts'] = count($result['Workout']);

        // Get the last workout
        if (isset($result['Workout'][0]['date'])) {
          $results[$key]['Shoe']['last'] = $result['Workout'][0]['date'];
        }
      }
    }

    // Sort the list of shoes by date of last workout.
    // Show most recently used shoes first
    return Set::sort($results, '{n}.Shoe.last', 'desc');
  }

  /**
   * Separate active and inactive shoes into separate arrays by id => name
   * This is mostly used to created a grouped dropdown of shoes.
   *
   * @returns   arr
   */
  public function sortActiveShoes($shoes) {
    if (empty($shoes)) {
      return array();
    }

    $result = array(
      'Active'   => array(),
      'Inactive' => array()
    );
    foreach ($shoes as $shoe) {
      $activity = $shoe['Shoe']['inactive'] ? 'Inactive' : 'Active';
      $id = $shoe['Shoe']['id'];

      $result[$activity][$id] = $shoe['Shoe']['name'];
    }
    return $result;
  }

  /**
   * Calculate the mileage for a single shoe
   */
  public function getShoeMileage($results) {
    $mileage = array();
    foreach ($results['Workout'] as $workout) {
      $mileage[] = $workout['distance'];
    }
    return array_sum($mileage);
  }

}
