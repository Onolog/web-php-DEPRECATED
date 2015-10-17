<?php
echo $this->element('react_page', array(
  'data' => array(
    'shoeCount' => $shoe_count,
    'user' => $user['User'],
    'activities' => $activities,
  ),
  'page' => 'Profile',
  'title' => $user['User']['name'],
));
