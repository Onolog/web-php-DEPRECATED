<?php
/**
 * Displays a list of all the user's shoes
 */
echo $this->element('react_page', array(
  'css' => array('app/Shoe'),
  'page' => 'AllShoes',
  'title' => 'Shoes',
));
