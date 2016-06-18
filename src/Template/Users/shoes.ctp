<?php
/**
 * Displays a list of all the user's shoes
 */
echo $this->element('react_page', array(
  'css' => array('app/Shoe'),
  'data' => array(
    'shoes' => $shoes,
  ),
  'page' => 'AllShoes',
  'title' => 'Shoes',
));
