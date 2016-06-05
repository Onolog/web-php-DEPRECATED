<?php
echo $this->element('react_page', array(
  'data' => array(
    'activities' => $activities,
    'shoes' => $shoes,
  ),
  'page' => 'Profile',
  'title' => $user['User']['name'],
));
