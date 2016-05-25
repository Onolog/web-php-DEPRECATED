<?php
echo $this->element('react_page', array(
  'classes' => array('narrow-page'),
  'css' => array('app/Shoe'),
  'data' => array(
    'shoes' => array($shoe),
  ),
  'page' => 'Shoe',
));
