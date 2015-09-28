<?php
echo $this->element('react_page', array(
  'css' => array(
    'app/Report',
    'components/Graph',
    'components/Topline',
  ),
  'data' => array(
    'runExtremes' => $extremes,
    'shoeCount' => $shoe_count,
    'topBrand' => $top_brand,
    'topFriends' => $friends,
    'totalMiles' => $total_miles,
    'totalRuns' => $total_runs,
    'totalTime' => $total_time,
    'workoutData' => $workoutData,
    'workoutDataByWeek' => $workoutDataByWeek
  ),
  'page' => 'Report',
));
