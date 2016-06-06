<?php
echo $this->element('react_page', array(
  'data' => array(
    'activities' => $activities,
    'shoes' => $shoes,
    'users' => array($user),
  ),
  'page' => 'Profile',
  'title' => $user['name'],
));
