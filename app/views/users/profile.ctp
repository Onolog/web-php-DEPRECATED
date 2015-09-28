<?php
echo $this->element('react_page', array(
  'css' => array(
    'app/Activity',
    'app/Profile',
    'components/Graph',
    'components/Topline'
  ),
  'data' => array(
    'shoeCount' => $shoe_count,
    'totalMiles' => $total_miles,
    'totalRuns' => $total_runs,
    'user' => $user['User'],
    'workoutData' => $workout_data,
    'workoutDataByWeek' => $workout_data_by_week
  ),
  'page' => 'Profile',
  'title' => $user['User']['name'],
));
