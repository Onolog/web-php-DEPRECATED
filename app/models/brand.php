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

  function afterFind($results) {
    $brands = array();
    foreach ($results as $result) {
      if (isset($result['Brand'])) {
      	// Only return the brand data, since we don't need anything else.
        $brands[] = $result['Brand'];
      }
    }
    return $brands;
  }

}
