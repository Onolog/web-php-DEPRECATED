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
        $numWorkouts = count($result['Workout']);
        $results[$key]['Shoe']['mileage'] = $this->getShoeMileage($result);
        $results[$key]['Shoe']['workouts'] = $numWorkouts;

        // Get the date of the first workout for each shoe.
        // Note: Workouts are sorted from oldest to newest, so the first workout
        // will be the last item in the array
        if (isset($result['Workout'][$numWorkouts - 1]['date'])) {
          $results[$key]['Shoe']['first'] =
            $result['Workout'][$numWorkouts - 1]['date'];
        }
        // Get the date of the last workout for each shoe
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
   * Similar to sortActiveShoes, but returns a format more conducive to JSON
   *
   * @returns   arr
   */
  public function sortShoesForJSON($shoes) {
    if (empty($shoes)) {
      return array();
    }

    $result = array(
      array(
        'label' => 'Active',
        'options' => array(),
      ),
      array(
        'label' => 'Inactive',
        'options' => array(),
      ),
    );

    foreach ($shoes as $shoe) {
      $activity = $shoe['Shoe']['inactive'] ? 1 : 0;
      $result[$activity]['options'][] = array(
        'value' => $shoe['Shoe']['id'],
        'label' => $shoe['Shoe']['name']
      );
    }
    return $result;
  }

  /**
   * Group shoes into active and inactive arrays
   */
  public function groupByActivity(/*array*/ $shoes) /*array*/ {
    if (empty($shoes)) {
      return array();
    }

    $result = array(
      'active'   => array(),
      'inactive' => array()
    );

    foreach ($shoes as $shoe) {
      $activity = $shoe['Shoe']['inactive'] ? 'inactive' : 'active';
      $result[$activity][] = $shoe['Shoe'];
    }
    return $result;
  }

  /**
   * Calculate the mileage for a single shoe
   */
  public function getShoeMileage(/*array*/ $results) /*float*/ {
    $mileage = array();
    foreach ($results['Workout'] as $workout) {
      $mileage[] = $workout['distance'];
    }
    return array_sum($mileage);
  }

  /**
   * Filter out any shoes that were not used during the given date range
   */
  public function getActiveShoesForDateRange($shoes, $start, $end) {
    $range = array(
      'start' => $start,
      'end'   => $end,
    );
    return array_filter($shoes, function($shoe) use($range) {
      return
        $shoe['Shoe']['last'] >= $range['start'] &&
        $shoe['Shoe']['first'] <= $range['end'];
    });
  }

  /**
   * Get the name and count for the most-used brand of shoes
   * in the given dataset.
   */
  public function getTopBrandData($shoes) {
    $brands = array();
    foreach ($shoes as $shoe) {
      $brand = $shoe['Shoe']['brand'];
      if (!isset($brands[$brand])) {
        $brands[$brand] = array(
          'models' => array(),
          'name' => $brand,
        );
      }
      $brands[$brand]['models'][] = $shoe['Shoe']['model'];
    }

    usort($brands, function($brand1, $brand2) {
      $count1 = count($brand1['models']);
      $count2 = count($brand2['models']);

      if ($count1 === $count2) {
        return 0;
      }
      return $count1 > $count2 ? -1 : 1;
    });

    // Return only the top result
    $top_brand = $brands[0];
    $top_brand['count'] = count($top_brand['models']);
    return $top_brand;
  }

}
