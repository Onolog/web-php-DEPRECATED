<?php
class RunDetail extends AppModel {
	var $name = 'RunDetail';
	var $validate = array(
		'user_id' => array(
			'numeric' => array(
				'rule' => array('numeric'),
				//'message' => 'Your custom message here',
				'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
		'run_id' => array(
			'numeric' => array(
				'rule' => array('numeric'),
				//'message' => 'Your custom message here',
				'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
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
		'Run' => array(
			'className' => 'Run',
			'foreignKey' => 'run_id',
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
      if (isset($result['RunDetail'])) {
        // Convert from seconds to time array
        $results[$key]['RunDetail']['time_arr'] =
          $this->Run->secToTime(idx($result['RunDetail'], 'time', 0));

        // Merge the date info with the run info
        if (idx($results[$key], 'Run')) {
          $results[$key]['RunDetail']['date'] = $results[$key]['Run']['date'];
        }
      }
    }
    return $results;
  }

}
