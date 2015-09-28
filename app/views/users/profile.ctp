<?php
echo $this->element('react_page', array(
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
