<?php

$this->Include->css('chart');
$this->Include->css('report');
$this->Chart->setWorkouts($workouts);
$this->set('page_classes', array('report'));

$src = 'https://graph.facebook.com/' . $user['User']['id'] . '/picture';

$total_days = floor(abs($end_date - $start_date) / 86400);
$total_weeks = 52;

$run_days = count($workouts['day']);
$total_runs = count($workouts['runs']);
$total_miles = array_sum($workouts['day']);

// debug($workouts['runs'], 1);

// Find month with highest mileage
$high_month = array(
  'year'  => null,
  'month' => null,
  'total' => 0,
);
foreach ($workouts['month'] as $year => $months) {
  foreach ($months as $month => $miles) {
    if (array_sum($miles) > $high_month['total']) {
      $high_month['year'] = $year;
      $high_month['month'] = $month;
      $high_month['total'] = array_sum($miles);
    }
  }
}
$month_str = date("M", mktime(0, 0, 0, $high_month['month']));

/**
 * Returns the longest and shortest runs
 *
 * @param   arr   $runs      Array of each run within the date range       
 * @param   int   $exclude   date to exclude (ie: race day)
 *
 * @returns arr
 */
function get_run_extremes($runs, $exclude=0) {

  $extremes = array(
    'max' => array(
      'date' => null,
      'distance' => 0,
    ),
    'min' => array(
      'date' => null,
      'distance' => 999999999, // This could break if someone was trying    
    ),
  );

  // TODO - what happens if the same values occur on mulitple dates?
  // Currently I'm just showing the initial instance
  foreach ($runs as $run) {
    if (!$exclude || $run['date'] != $exclude) {

      // Find max
      if ($run['distance'] > $extremes['max']['distance']) {
        $extremes['max']['distance'] = $run['distance'];
        $extremes['max']['date'] = $run['date'];
      }

      // Find min
      if ($run['distance'] < $extremes['min']['distance']) {
        $extremes['min']['distance'] = $run['distance'];
        $extremes['min']['date'] = $run['date'];
      }    
    }
  }
  return $extremes;
}
$extremes = get_run_extremes($workouts['runs'], $end_date);


$page_header =
  '<h2 class="clearfix">' .
    '<div class="user_img">' .
      $this->Html->image($src) .
    '</div>' .
    '<div class="user_name">' .
      $user['User']['name'] .
    '</div>' .
  '</h2>';

$r =
  '<div id="summary" class="clearfix">' .

    // Render the topline summary of the user's data
    /*
    $this->element('topline',
      array(
        'stats' => array(
          'Total Miles' => number_format($total_miles, 2),
          'Total Runs'  => $total_runs,
          'Total Days'  => $total_days,
          'Avg. Miles/Day' => number_format($total_miles/$total_days, 2),
          'Total Weeks' => $total_weeks,
          'Avg. Miles/Week' => number_format($total_miles/$total_weeks, 2),
        )
      )
    ) .
    $this->element('topline',
      array(
        'stats' => array(
          'Days Run' => $run_days,
          '% of days run' => number_format(($run_days/$total_days)*100, 1) . '%',
          'Longest Run' => $extremes['max']['distance'] . '-' . date('n/j/y', $extremes['max']['date']),
          'Shortest Run' => $extremes['min']['distance'] . '-' . date('n/j/y', $extremes['min']['date']),
          'Highest Mileage Month' => $month_str . '-' . $high_month['total'],
        )
      )
    ) .
    /*
    $this->element('topline',
      array(
        'stats' => array(
          'Longest Run' => $extremes['max']['distance'] . '-' . date('n/j/y', $extremes['max']['date']),
          'Shortest Run' => $extremes['min']['distance'] . '-' . date('n/j/y', $extremes['min']['date']),
          'Highest Mileage Month' => $month_str . '-' . $high_month['total'],
        )
      )
    ) .
    /*
    $this->element('topline',
      array(
        'stats' => array(
          'Shoes' => $shoe_count,
        )
      )
    ) .
    */

  '</div>' .  
  $this->Chart->render();

echo $r;

$this->set('page_header', $page_header);
