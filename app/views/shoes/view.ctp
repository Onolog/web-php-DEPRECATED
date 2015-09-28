<?php
echo $this->element('react_page', array(
  'classes' => array('narrow-page'),
  'css' => array(
    'app/Activity',
    'app/Shoe',
    'components/Topline'
  ),
  'data' => array(
    'canEdit' => $can_edit,
    'shoe' => $shoe
  ),
  'path' => '/build/Shoe',
));
