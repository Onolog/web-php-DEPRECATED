<?php

/**
 * /app/views/helpers/calendar.ctp
 *
 * Class for rendering the Calendar view of workouts
 */
class CalendarHelper extends AppHelper {

  var $helpers = array('Html');

  private $month;
  private $year;
  private $day;
  private $date;
  private $workouts = array();

  // This should probably be private...
  protected $week   = array();

  /**
   * By default, sets today as the date. If no other date is set, the calendar
   * will render as the current month and year, with today's date highlighted.
   */
  public function __construct() {
    $this->setDate(date('n'), date('Y'), date('j'));
  }

  /**
   * @param   int     $month  ex: 1=January, 2=February, 3=March, etc
   * @param   int     $year   ex: 2008
   * @param   int     $day    Numeric day of the month, 1 up to 31
   */
  public function setDate($month, $year, $day=1) {
    $this->month  = $month;
    $this->year   = $year;
    if ($day) {
      $this->day = $day;
    }

    $this->date = mktime(0, 0, 0, $month, $day, $year);
    return $this;
  }

  public function setWorkouts($workouts) {
    $this->workouts = $workouts;
    return $this;
  }

  public function getDate() {
    return $this->date;
  }

  protected function getMonth() {
    return $this->month;
  }

  protected function getYear() {
    return $this->year;
  }

  protected function getWorkouts() {
    return $this->workouts;
  }

  // Displays a running total of the number of miles run for the week
  protected function getWeeklyTotal() {
    $week_start = $this->week[0];
    $week_end   = $this->week[6];
    $mileage    = array();
    $days = $this->getWorkouts();

    if (!empty($days)) {
      foreach ($days as $day) {
        $date = $day['Workout']['date'];
        if ($date >= $week_start && $date <= $week_end) {
          $mileage[] = $day['Workout']['distance'];
        }
      }
    }
    return array_sum($mileage);
  }

  /**
   * Finds the weekday on which a month begins. Returns that day as an integer:
   * 0=Sunday, 1=Monday, 2=Tuesday, etc.
   *
   * @param   int   $month
   * @param   int   $year
   *
   * @return  int   $start_day
   */
  protected function getMonthStartDay() {
    $date       = mktime(0, 0, 0, $this->month, 1, $this->year);
    $date_info  = getdate($date);
    return $date_info['wday'];
  }

  /**
   * Checks to see if a given date is today's date.
   *
   * @param   int   $day    The day of the month
   * @return  bool
   */
  protected function isToday($day) {
    $is_today = false;
    if (date('FY') == date('FY', $this->date) && date('j') == $day) {
      $is_today = true;
    }
    return $is_today;
  }


  public function render() {
    $r =
      '<table class="calendar">' .
        '<thead>' .
          '<tr>';

    // Print all the days of the week for the table header
    foreach($this->getWeekdays() as $weekday) {
      $r .=     '<th>' . $weekday . '</th>';
    }
    $r .=
          '</tr>' .
        '</thead>' .
        '<tbody>' .
          $this->renderCalendarContent() .
        '</tbody>' .
      '</table>';

    return $r;
  }

  protected function renderCalendarContent() {
    $num_days   = cal_days_in_month(
                    CALENDAR_TYPE,
                    $this->getMonth(),
                    $this->getYear()
                  );
    $start_day  = $this->getMonthStartDay();
    $items      = 7; // Number of items per row, aka days in a week
    $i          = 0; // Counter

    // Print the first row
    $r = '<tr>';

    // Start the month on the right day of the week
    if ($start_day != 0) {

      for ($i=0; $i < $start_day; $i++) {

        // Calculate the days from the previous month to display
        $day    = (($i+1)-$start_day);
        $class  = 'last_month'; // Add the CSS class

        $r .= $this->renderCalendarCell($day, $class);
      }
    }

    // Print all the days in the selected month
    for ($day = 1; $day <= $num_days; $day++) {
      
      // Do we need to start a new row?
      if ($i == 0) {
        $r .= '<tr>';
      }

      // If the cell being printed matches today's date, add a CSS class
      $class = ($this->isToday($day)) ? 'today' : '';

      // Print the record
      $r .=   $this->renderCalendarCell($day, $class);
      $i++;

      // Do we need to end the row?
      if ($i == $items) {
        // Print the weekly total
        $r .= '</tr>';

        $this->week = array(); // Reset the weekly workout counter
        $i = 0; // Reset counter
      }
    } // End for loop

    // Is the last row incomplete?
    if ($i > 0) {

      // Print the necessary number of cells to complete the row
      // Continue incrementing $day; ex: Oct 32nd == Nov. 1st
      for ($i; $i < $items; $i++, $day++) {

        $class  = 'next_month'; // Add a CSS class
        $r .=   $this->renderCalendarCell($day, $class);
      }
      $r .= '</tr>'; // Complete the row
    }
    return $r;
  }

  protected function renderCalendarCell($day, $class='') {
    $date   = mktime(0, 0, 0, $this->getMonth(), $day, $this->getYear());
    $class  = $class ? ' class="' . $class . '"' : '';
    $this->week[] = $date; // Keep track of the the workouts in each week
    $day_of_week = date('w', $date);
    $week_total = ($day_of_week == 6) ? $this->renderWeeklyTotal() : '';

    return
      '<td' . $class . '>' .
        '<div class="wrapper">' .
          '<h3>' . date('j', $date) . '</h3>' .
          $this->renderWorkouts($date) .
          $this->renderAddLink($date) .
          $week_total .
        '</div>' .
      '</td>';
  }

  protected function renderWeeklyTotal() {
    return
      '<div class="total">' .
        render_distance($this->getWeeklyTotal(), 2) .
      '</div>';
  }

  protected function renderAddLink($date) {
    $icon = '<b class="icon-plus"></b>';
    return
      $this->Html->link(
        $icon,
        '#',
        array(
          'id' => $date,
          'class' => 'add btn btn-small',
          'escape' => false,
          'rel' => 'tooltip',
          'title' => __('Add workout', 1),
          'data-placement' => 'right',
        )
      );
  }

  protected function renderWorkouts($date) {
    $r = '';
    $workouts = $this->getWorkouts();

    // If the user has any workouts to display
    if (!empty($workouts)) {
      $r .= '<ul>';

      foreach ($workouts as $day) {
        foreach ($day as $workout) {

          // Format the distance
          $distance = format_distance(idx($workout, 'distance', 0));
  
          // Match the actual day, month and year, not the timestamp
          if (isset($workout['date']) &&
            date('ymj', $workout['date']) == date('ymj', $date)) {

            // Include a partial description, if it exists
            /*
            $notes = idx($workout, 'notes', '');
            if ($notes) {
              $notes = ' &middot; ' . truncate_text($notes, 20);
            }
            */

            $r .=
              '<li>' .
                $this->Html->link(
                  render_distance($distance, 2),
                  array(
                    'controller' => 'workouts',
                    'action' => 'view',
                    $workout['id']
                  ),
                  array(
                    'id' => $workout['id'],
                    'class' => 'workout',
                    'escape' => false
                  )
                ) .
              '</li>';
          }
        }
      } // End foreach
      $r .= '</ul>';
    }
    return $r;
  }

  protected function getWeekdays() {
    return array(
      0 => 'Sun',
      1 => 'Mon',
      2 => 'Tue',
      3 => 'Wed',
      4 => 'Thu',
      5 => 'Fri',
      6 => 'Sat'
    );
  }

} // End class
