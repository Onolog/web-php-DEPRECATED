<?php
/**
 * Displays a list of all the user's shoes
 */
echo $this->element('react_page', array(
  'css' => array(
    'app/Activity',
    'app/Shoe',
    'components/Topline'
  ),
  'path' => '/build/AllShoes',
  'title' => 'Shoes',
));
