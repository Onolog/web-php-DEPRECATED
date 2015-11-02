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
			'order' => 'Workout.start_date DESC',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		),
	);

  function afterFind($results) {
    $shoes = array();

    foreach ($results as $key => $result) {
      if (!isset($result['Shoe'])) {
        continue;
      }

      $shoes[$key] = $result['Shoe'];

      // Get the Brand name
      if (isset($result['Brand'])) {
        $shoes[$key]['brand'] = $result['Brand']['name'];
      }

      // Concatenate Brand and name for convenience
      if (isset($shoes[$key]['brand']) && isset($shoes[$key]['model'])) {
        $shoes[$key]['name'] = $shoes[$key]['brand'].' '.$shoes[$key]['model'];
      }

      // TODO: For some reason, certain values are coming back as a strings from
      // the DB. Find out why they're coming back as the wrong type. In the
      // meantime, cast to the correct type.
      $shoes[$key]['inactive'] = (int) idx($shoes[$key], 'inactive', 0);
      $shoes[$key]['id'] = (int) idx($shoes[$key], 'id', 0);

      if (isset($result['Workout'])) {
        $workouts = $result['Workout'];
        $numActivities = count($workouts);

        // Add total mileage and workouts for each shoe
        $shoes[$key]['activity_count'] = $numActivities;
        $shoes[$key]['activities'] = $workouts;
        $shoes[$key]['mileage'] = $this->getShoeMileage($workouts);

        // Get the date of the first workout for each shoe.
        // Note: Workouts are sorted from oldest to newest, so the first workout
        // will be the last item in the array
        if (isset($workouts[$numActivities - 1]['date'])) {
          $shoes[$key]['first'] = $workouts[$numActivities - 1]['date'];
        }
        // Get the date of the last workout for each shoe
        if (isset($workouts[0]['date'])) {
          $shoes[$key]['last'] = $workouts[0]['date'];
        }
      }
    }

    // Sort the list of shoes by date of last workout.
    // Show most recently used shoes first
    return Set::sort($shoes, '{n}.last', 'desc');
  }

  /**
   * Calculate the mileage for a single shoe
   */
  public function getShoeMileage(/*array*/ $workouts) /*float*/ {
    $mileage = array();
    foreach ($workouts as $workout) {
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
        $shoe['last'] >= $range['start'] &&
        $shoe['first'] <= $range['end'];
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
