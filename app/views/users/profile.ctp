<?php
echo $this->element('react_page', array(
  'data' => array(
    'shoeCount' => $shoe_count,
    'workouts' => $activities,
  ),
  'page' => 'Profile',
  'title' => $user['User']['name'],
));
