<?php
echo $this->element('react_page', array(
  'classes' => array('narrow-page'),
  'css' => array('app/Shoe'),
  'data' => array(
    'canEdit' => $can_edit,
    'shoe' => $shoe
  ),
  'page' => 'Shoe',
));
