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

  const YEAR_FORMAT = 'Y';
  const MONTH_FORMAT = 'n';
  const WEEK_FORMAT = 'W';
  const DAY_FORMAT = 'j';

  /**
   * 
   */
  function afterFind($results) {
    foreach($results as $key => $result) {
      $workout = $result['Workout'];

      // Decode any escaped characters
      $results[$key]['Workout']['notes'] = html_entity_decode(
        idx($workout, 'notes', ''),
        ENT_QUOTES
      );
    }
    return $results;
  }

  /**
   * Convert the data before saving
   */
  function beforeSave($data) {
    /*
    if ($this->layout !== 'ajax') {
      // Take hh:mm:ss and convert to seconds
      $this->data['Workout']['time'] = time_to_sec(array(
        $this->data['Workout']['hh'],
        $this->data['Workout']['mm'],
        $this->data['Workout']['ss']
      ));
  
      // Unset the hh:mm:ss data
      unset($this->data['Workout']['hh']);
      unset($this->data['Workout']['mm']);
      unset($this->data['Workout']['ss']);
    }

    // Convert friends to a string if they're in array form
    $friends = idx($this->data['Workout'], 'friends', array());
    if (is_array($friends) && !empty($friends)) {
      $f = array();
      foreach ($friends as $friend) {
        $f[] = $friend['id'];
      }
      $this->data['Workout']['friends'] = implode($f, ',');
    }

    // Be sure to escape notes entries
	  $this->data['Workout']['notes'] =
      htmlspecialchars(idx($this->data['Workout'], 'notes'), ENT_QUOTES);
    */
    return true;
  }

  /**
   * Format the workout data the way we want:
   *    - Key each workout by id
   *    - Unnest the workouts
   *    - Format some of the data (time, distance, date)
   */
  private function formatWorkouts($workouts) {
    $data = array();
    foreach($workouts as $workout) {
      if (isset($workout['Workout'])) {

        $date = $workout['Workout']['date'];
        $id   = $workout['Workout']['id'];

        $data[$date][] = $workout['Workout'];
      }
    }
    return $data;
  }

  /**
   * Strip out extraneous data (User, Shoe) from the data set
   */
  public function flattenWorkouts($workouts) {
    $data = array();
    foreach($workouts as $workout) {
      $data[] = $workout['Workout'];
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
      $year   = date(self::YEAR_FORMAT);
      $month  = date(self::MONTH_FORMAT);
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
   * Takes an array of all the user's workouts and sorts them into several
   * multi-dimensional arrays grouped as follows:
   *
   * 1. Grouped: Array or workout toals and workout data grouped by year, month,
   *    and day.
   * 2. Week: Array of workout totals grouped by year then week
   * 3. Workouts: Flat, sorted array of all the workouts
   *
   * @param   $workouts   arr
   * @return  $sorted     arr
   */
  public function groupWorkouts($workouts) {
    return array(
      'grouped'  => $this->groupWorkoutsByYearMonthDay($workouts),
      'week'     => $this->groupWorkoutsByWeek($workouts),
      'workouts' => $workouts,
    );
  }

  /**
   * Groups the workout data by year, then month, then day. Provides topline
   * data for each grouping:
   *
   *    - Total number of runs
   *    - Total number of miles
   *    - Day
   *    - Month
   *    - Year
   *
   * $fill  bool  Whether or not to fill the array with empty data
   */
  public function groupWorkoutsByYearMonthDay($workouts, $fill=true) {
    $workouts = $this->formatWorkouts($workouts);
    // Init an array with zeroed-out data for all the years, months, and days
    // starting from the first day of the first year containing data and going
    // until the last day of the current year.
    $arr = $this->initYearMonthDays(reset(array_keys($workouts)));

    foreach($workouts as $date => $dayData) {
      // Add the mileage and number of runs for each day to the yearly total.
      $year = date(self::YEAR_FORMAT, $date);
      $month = date(self::MONTH_FORMAT, $date);
      $day = date(self::DAY_FORMAT, $date);

      foreach ($dayData as $id => $workout) {
        $distance = idx($workout, 'distance', 0);
        $time = idx($workout, 'time', 0);

        // Top-level year data
        $arr[$year]['miles'] += $distance;
        $arr[$year]['run_count']++;
        $arr[$year]['time'] += $time;

        // Top-level month data
        $arr[$year]['months'][$month]['miles'] += $distance;
        $arr[$year]['months'][$month]['run_count']++;
        $arr[$year]['months'][$month]['time'] += $time;

        // Top-level day data
        $arr[$year]['months'][$month]['days'][$day]['miles'] += $distance;
        $arr[$year]['months'][$month]['days'][$day]['run_count']++;
        $arr[$year]['months'][$month]['days'][$day]['time'] += $time;
        $arr[$year]['months'][$month]['days'][$day]['workouts'][$id] = $workout;
      }
    }
    return $arr;
  }

  /**
   * Creates a nested array of all the workouts, grouped first by year, then by
   * month, then by day. Each grouping contains high-level data like total miles
   * and runs.
   */
  private function initYearMonthDays(/*int*/ $firstDate) /*arr*/ {
    $firstYear = date(self::YEAR_FORMAT, $firstDate);
    $currentYear = date(self::YEAR_FORMAT);
    $arr = array();
    for ($year=$firstYear; $year<=$currentYear; $year++) {
      $arr[$year] = array(
        'miles' => 0,
        'run_count' => 0,
        'time' => 0,
        'year' => $year,
        'months' => array(),
      );
      for ($month=1; $month<=12; $month++) {
        $arr[$year]['months'][$month] = array(
          'days' => array(),
          'miles' => 0,
          'month' => $month,
          'run_count' => 0,
          'time' => 0,
          'year' => $year,
        );
        $daysInMonth = cal_days_in_month(CALENDAR_TYPE, $month, $year);
        for ($day=1; $day<=$daysInMonth; $day++) {
          $arr[$year]['months'][$month]['days'][$day] = array(
            'day' => $day,
            'miles' => 0,
            'month' => $month,
            'run_count' => 0,
            'time' => 0,
            'year' => $year,
            'workouts' => array(),
          );
        }
      }
    }
    return $arr;
  }

  /**
   * Groups the workout data by year then week. Provides topline
   * data for the weekly grouping:
   *
   *    - Total number of runs
   *    - Total number of miles
   *    - Week number (01-53)
   */
  public function groupWorkoutsByWeek($workouts) {
    $workouts = $this->formatWorkouts($workouts);
    $byWeek = $this->initYearWeeks(reset(array_keys($workouts)));
    foreach($workouts as $date => $dayData) {
      // Use ISO year since we're working with weeks
      $year = date('o', $date);
      $week = date(self::WEEK_FORMAT, $date);

      // Get the total mileage for each day, and add the
      // workout to the detailed workout array
      foreach ($dayData as $id => $workout) {
        $byWeek[$year]['weeks'][$week]['time'] += idx($workout, 'time', 0);
        $byWeek[$year]['weeks'][$week]['miles'] += idx($workout, 'distance', 0);
        $byWeek[$year]['weeks'][$week]['run_count']++;
      }
    }
    return $byWeek;
  }

  /**
   * Creates a nested array of all the workouts, grouped first by year, then by
   * week. Each grouping contains high-level data like total miles and runs.
   */
  private function initYearWeeks(/*int*/ $firstDate) /*arr*/ {
    $firstYear = date(self::YEAR_FORMAT, $firstDate);
    $currentYear = date(self::YEAR_FORMAT);
    $arr = array();
    for ($year=$firstYear; $year<=$currentYear; $year++) {
      $arr[$year] = array(
        'year' => $year,
        'weeks' => array(),
      );

      // Find the number of weeks in a year
      $date = new DateTime();
      $date->setISODate($year, 53);
      $maxWeeksInYear = $date->format('W') === '53' ? 53 : 52;

      for ($week=1; $week<=$maxWeeksInYear; $week++) {
        // ISO week numbers are 2-digit: 01, 02...52, so the key needs to
        // reflect this.
        $key = $week < 10 ? add_leading_zero($week) : $week;
        $arr[$year]['weeks'][$key] = array(
          'miles' => 0,
          'run_count' => 0,
          'time' => 0,
          'week' => $week,
          'year' => $year,
        );
      }
    }
    return $arr;
  }

  /**
   * Given a set of workouts, this finds all the workouts that were done with
   * friends and provides the number of runs and total mileage with each friend.
   */
  public function groupWorkoutsByFriend($workouts) {
    $grouped = array();
    foreach ($workouts as $workout) {
      if (isset($workout['Workout']['friends'])) {
        $friends = array_filter(explode(',', $workout['Workout']['friends']));
        foreach ($friends as $id) {
          if (!isset($grouped[$id])) {
            // Init the friend array
            $grouped[$id] = array(
              'id' => $id,
              // Name must be added later, since it depends either on the user
              // being logged in, or knowing the if to fetch from FB, which is
              // done as a batch call.
              'name' => '',
              'runs' => array(),
            );
          }
          $grouped[$id]['runs'][] = $workout['Workout']['distance'];
        }
      }
    }
    return $grouped;
  }
}
