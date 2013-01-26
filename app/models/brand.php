<?php
class Brand extends AppModel {
	var $name = 'Brand';

	var $hasMany = array(
		'Shoe' => array(
			'className' => 'Shoe',
			'foreignKey' => 'brand_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		)
	);

}
