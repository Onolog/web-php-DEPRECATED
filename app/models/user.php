<?php
class User extends AppModel {

  var $name = 'User';

	var $validate = array(
		'first_name' => array(
			'notempty' => array(
				'rule' => array('notempty'),
				//'message' => 'Your custom message here',
				//'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
		'last_name' => array(
			'notempty' => array(
				'rule' => array('notempty'),
				//'message' => 'Your custom message here',
				//'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
		'email' => array(
			'email' => array(
				'rule' => array('email'),
				//'message' => 'Your custom message here',
				//'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
		/*
		'password' => array(
			'notempty' => array(
				'rule' => array('notempty'),
				//'message' => 'Your custom message here',
				//'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
		*/
	);

	var $hasMany = array(
		'Shoe' => array(
			'className' => 'Shoe',
			'foreignKey' => 'user_id',
			'dependent' => false,
			//'order' => 'Workout.date ASC'
		),
		'Workout' => array(
			'className' => 'Workout',
			'foreignKey' => 'user_id',
			'dependent' => false,
		),
		'RunDetail' => array(
			'className' => 'RunDetail',
			'foreignKey' => 'user_id',
			'dependent' => false,
		)
	);

  function afterFind($results) {
    foreach ($results as $key => $result) {
      // Concatenate first and last name for convenience
      if (isset($result['User']['first_name']) &&
          isset($result['User']['last_name'])) {
        $results[$key]['User']['name'] =
          $result['User']['first_name'].' '.$result['User']['last_name'];
      }
    }
    return $results;
  }

}
