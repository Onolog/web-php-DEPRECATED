<?php
class Workout extends AppModel {
	var $name = 'Workout';

	var $validate = array(
		'user_id' => array(
			'numeric' => array(
				'rule' => array('numeric'),
				//'message' => 'Your custom message here',
				//'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
		'date' => array(
			'numeric' => array(
				'rule' => array('numeric'),
				'message' => 'Please enter a valid date',
				//'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
    'distance' => array(
			'numeric' => array(
				'rule' => array('numeric'),
				'message' => 'Please enter a valid distance',
				'allowEmpty' => false,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
		'time' => array(
			'numeric' => array(
				'rule' => array('numeric'),
				'message' => 'Please enter a valid time',
				'allowEmpty' => true,
				//'required' => false,
				//'last' => false, // Stop validation after this rule
				//'on' => 'create', // Limit validation to 'create' or 'update' operations
			),
		),
	);

/*
  var $hasMany = array(
		'RunDetail' => array(
			'className' => 'Workout',
			'foreignKey' => 'user_id',
			'dependent' => false,
		)
	);
*/

	var $belongsTo = array(
		'User' => array(
			'className' => 'User',
			'foreignKey' => 'user_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'Shoe' => array(
			'className' => 'Shoe',
			'foreignKey' => 'shoe_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);

  function afterFind($results) {
    foreach($results as $key => $result) {
      if (isset($result['Workout'])) {
        // Convert from seconds to time array
        $results[$key]['Workout']['time_arr'] =
          $this->secToTime(idx($result['Workout'], 'time', 0));
      }
    }
    return $results;
  }

  /**
   * Format the workout data the way we want:
   *    - Key each workout by date
   *    - Unnest the workouts
   *    - Format some of the data (time, distance, date)
   */
  public function formatWorkouts($results) {
    $data = array();
    foreach($results as $result) {
      if (isset($result['Workout'])) {

        $date = $result['Workout']['date'];
        $id   = $result['Workout']['id'];

        $data[$date][$id] = $result['Workout'];
      }
    }
    return $data;
  }

  /**
   * Takes all of a user's workouts and returns an array with
   * mileage totals for the following:
   *
   *  - Week-to-date
   *  - Month-to-date
   *  - Year-to-date
   *  - All-time 
   *
   * @param   arr   $workouts
   * @return  arr
   */
  public function getWorkoutStats($workouts) {

    $week_total = $month_total = $year_total = $all_total = 0;

    if (!empty($workouts)) {
      $year   = date('Y');
      $month  = date('n');
      $sorted = $this->sortWorkouts($workouts);

      // If there are no workouts for the current month,
      // the array for that month will not exist yet
      $month_array = idx($sorted['month'][$year], $month, array());

      $week_total  = $this->getWeekMileage($sorted['day']);
      $month_total = array_sum($month_array);
      $year_total  = array_sum($sorted['year'][$year]);
      $all_total   = array_sum($sorted['day']);
    }

    return array(
      'week'  => array(
        'label' => __('this week', 1),
        'total' => $week_total
      ),
      'month' => array(
        'label' => __('this month', 1),
        'total' => $month_total
      ),
      'year'  => array(
        'label' => __('this year', 1),
        'total' => $year_total
      ),
      'all'   => array(
        'label' => __('all time', 1),
        'total' => $all_total
      ),
    );
  }

  /**
   * Gets the mileage for the current week
   *
   * TODO: There is a potential bug here when a workout is entered on a Sunday
   * due to how the week is calculated.
   *
   * @param   arr   $days   total mileage for each day with at least one workout
   * @return  int
   */
  public function getWeekMileage($days) {
    // Find the current day of the week,
    // then find the start and end days for this week
    $day   = date('w');
    $start = (int) ($day > 0 ? strtotime('Last Sunday') : time());
    $end   = (int) ($day < 6 ? strtotime('Next Saturday') : time());

    $total = array();
    $start = date('Ynd', $start);
    $end   = date('Ynd', $end);
    foreach ($days as $date => $mileage) {
      // If the day falls during the given week
      if (date('Ynd', $date) >= $start && date('Ynd', $date) <= $end) {
        $total[] = $mileage;
      }
    }
    return array_sum($total);
  }

  /**
   * Takes an array of all the user's workouts and sorts them into a
   * multi-dimensional array containing the following:
   *
   * 1. Array of total mileage per day
   * 2. Array of total mileage per day, grouped by year
   * 3. Array of total mileage per day, grouped by year and month
   * 4. Array of each workout by day, with empty days/weeks/months/years filled in
   * 5. Array of each workout by day, with detailed info
   * 6. Array of each workout
   * 7. Array of each workout grouped by week
   *
   * @param   $workouts   arr
   * @return  $sorted     arr
   */
  public function sortWorkouts($data) {

    // Format the Workouts array the way we want
    $data = $this->formatWorkouts($data);

    $by_year  = array();
    $by_month = array();
    $by_week  = array();
    $by_day   = array();
    $detailed = array();
    $runs   = array();
  
    // Default year/month/week
    $y = $m = $w = 0;

    foreach($data as $date => $day) {

      $workout_y = date('Y', $date);
      $workout_m = date('n', $date);
      $workout_w = date('W', $date);
      $workout_d = date('d', $date);

      // If the current workout year doesn't match the previous year, set them equal
      // and start a new array with the current workout year
      if ($workout_y != $y) {
        $y = $workout_y;
      }

      // Same with the month
      if ($workout_m != $m) {
        $m = $workout_m;
      }

      // Start a new week if the day is Sunday.
      // TODO: Adapt for when week starts on a day other than Sunday
      if ($workout_w != $w) {
        $w = $workout_w;
      }

      // Get the total mileage for each day, and add the
      // workout to the detailed workout array
      $day_mileage = array();
      foreach ($day as $id => $workout) {
        $day_mileage[] = idx($workout, 'distance');
        $detailed[$y][$m][date('j', $date)][$id] = $workout;
        $runs[$id] = $workout;
      }
      $day_total = array_sum($day_mileage);

      $by_day[$date] = $day_total;
      $by_week[$y][$w][$date] = $day_total;
      $by_year[$y][$date] = $day_total;
      $by_month[$y][$m][date('j', $date)] = $day_total;
    }

    // Prepare the detailed array by filling any missing months, days or years
    // and sorting by date
    $filled = $this->fillWorkouts($detailed);
    krsort($filled);

    return array(
      'day'      => $by_day,
      'week'     => $by_week,
      'month'    => $by_month,
      'year'     => $by_year,
      'filled'   => $filled,
      'detailed' => $detailed,
      'runs'     => $runs,
    );
  }

  /**
   * Fills any missing days/months/years with empty space
   */
  protected function fillWorkouts($detailed) {
    if (empty($detailed)) {
      return array();
    }

    $y = key($detailed); // Initial year
    $y_curr = date('Y'); // Current year
    $m = 1; // January
    $m_curr = date('n');
    $d = 1; // 1st day

    for ($y; $y<=$y_curr; $y++) {
      if (!isset($detailed[$y])) {
        // Add missing years
        $detailed[$y] = $this->addEmptyYear($y);
      } else {
        // For the current year, end at the current month
        $end_month = ($y == $y_curr) ? $m_curr : 12;
        for ($m; $m<=$end_month; $m++) {
          if (!isset($detailed[$y][$m])) {
            $detailed[$y][$m] = $this->addEmptyMonth($m, $y);
          } else {
            $num_days = cal_days_in_month(CALENDAR_TYPE, $m, $y);
            for ($d; $d<=$num_days; $d++) {
              if (!isset($detailed[$y][$m][$d])) {
                $detailed[$y][$m][$d] = $this->addEmptyDay($d, $m, $y);
              }
            }
            $d=1; // Reset day
            ksort($detailed[$y][$m]);
          }
        }
        $m=1; // Reset month
        ksort($detailed[$y]);
      }
    }

    return $detailed;
  }

  /**
   * Adds a missing year of empty months and days
   */
  protected function addEmptyYear($year) {
    $y = array();
    for ($m=1; $m<=12; $m++) {
      $y[$m] = $this->addEmptyMonth($m, $year);
    }
    return $y;
  }

  /**
   * Adds a missing month of empty days
   */
  protected function addEmptyMonth($month, $year) {
    $m = array();
    $num_days = cal_days_in_month(CALENDAR_TYPE, $month, $year);
    for ($day=1; $day<=$num_days; $day++) {
      $m[$day] = $this->addEmptyDay($day, $month, $year);
    }
    return $m;
  }

  protected function addEmptyDay($day, $month, $year) {
    // Add an empty workout
    return array(
      array('date' => mktime(0, 0, 0, $day, $month, $year))
    );
  }

  /**
   * Takes a time in seconds and calculates the hours, minutes and seconds.
   * Returns an array with h/m/s (NO leading zero):
   *
   *    3273 -> array(00, 54, 33)
   *
   * @param   int   $seconds
   * @returns arr
   */
  public function secToTime($seconds) {
    $time = array(
      'hh' => (int) ($seconds / 3600),
      'mm' => (int) date('i', $seconds),
      'ss' => (int) date('s', $seconds)
    );

    // Pad minutes and seconds with a leading zero
    foreach ($time as $key => $unit) {
      if ($key != 'hh') {
        $time[$key] = add_leading_zero($unit);
      }
    }

    return $time;
  }

  /**
   * Takes an array of hours/mins/secs and converts to seconds
   *
   * @param   arr   $time
   * @return  int
   */
  public function timeToSec($time) {
    return (int)($time[0]*3600 + $time[1]*60 + $time[2]);
  }

}
