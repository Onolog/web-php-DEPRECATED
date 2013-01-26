<?php

/**
 * /app/views/helpers/chart.php
 *
 * Class for rendering the Graph view of workouts
 */
class ChartHelper extends AppHelper {

  var $helpers = array(
    'Html',
    'Include',
    'Tooltip'
  );

  private
    $scale      = 3.0, // 1 mile = $scale px
    $baseHeight = 50,
    $workoutsByDay,
    $workoutsByMonth,
    $workoutsByYear,
    $workoutsFilled;

  /**
   * @param   arr   $workouts
   */
  public function setWorkouts($workouts) {
    $this->workoutsByDay   = $workouts['day'];
    $this->workoutsByMonth = $workouts['month'];
    $this->workoutsByYear  = $workouts['year'];
    $this->workoutsFilled  = $workouts['filled'];
    return $this;
  }

  public function render() {
    $this->Include->css('chart');

    $by_year  = $this->workoutsByYear;
    $by_month = $this->workoutsByMonth;
    $detailed = $this->workoutsFilled;

    // Calendar info
    $info = cal_info(CALENDAR_TYPE);
    $cal_months = $info['abbrevmonths'];
    $y_curr = date('Y');    

    $html = '<div id="daily">' .
              '<ol class="chart">';
  
    foreach ($detailed as $year => $months) {
      $year_mileage_total = 0;
      $year_workout_total = 0;
      if (isset($by_year[$year])) {
        $year_mileage_total = array_sum($by_year[$year]);
        $year_workout_total = count($by_year[$year]);
      }
      $class = ($year == $y_curr) ? ' current_year' : '';
      $class.= $year % 2 ? ' y_odd' : '';

      $html.=
        '<li class="year clearfix' . $class . '">' .
          $this->renderYearHeader(
            $year,
            $year_mileage_total,
            $year_workout_total
          ) .
          '<ol class="month_container">';

      foreach ($months as $month => $days) {
        $class = $month % 2 ? ' m_odd' : '';
        $monthly_total = isset($by_month[$year][$month]) ?
          array_sum($by_month[$year][$month]) : 0;

        $html.=
          '<li class="month clearfix' . $class . '">' .

            // Render all the days in the month
            // TODO: add ability to aggregate by week or month
            $this->renderDays($days, $year, $month) .

            '<div class="month_label">' .
              '<h4>' . $cal_months[$month] . '</h4>' .
              '<div class="month_total">' .
                render_distance($monthly_total, 2) .
              '</div>' .
            '</div>' .
          '</li>';
      }

      $html.=     '</ol>' // Months
            .   '</li>';
    }
    $html.=   '</ol>' // Years
          . '</div>'  // #daily

          /*
          Eventualy add weekly and monthly aggregations
          . '<div id="weekly">'
          .   'Weekly'
          . '</div>'
          . '<div id="monthly">'
          .   'Monthly'
          . '</div>'
          */
          . '';

    return $html;
  }

  /**
   * Render all the days, with any workouts of a given month
   */
  protected function renderDays($days, $year, $month) {
    $html = '<ol>'; // Days
    $by_month = $this->workoutsByMonth;

    foreach ($days as $num => $day) {

      // Calculate and set the top margin for each day
      $distance = isset($by_month[$year][$month][$num]) ?
        $by_month[$year][$month][$num] : 0;
      $total_height = (int) ($this->getBaseHeight() * $this->getScale());
      $height = (int) ($distance * $this->getScale());
      $margin = $total_height - $height - (count($day) - 1);

      $classes = array('day');
      if ($distance == 0) {
        $classes[] = 'noWorkouts';
      }

      $html.=
        '<li ' .
          'class="'.implode(' ', $classes).'" ' .
          'style="margin-top: '.$margin.'px;">';

      foreach ($day as $workout) {
        if (isset($workout['id'])) {
          $height = (int) (idx($workout, 'distance', 0) * $this->getScale());

          $html .= $this->Html->link(
            $this->renderWorkoutTooltip($workout),
            array(
              'controller' => 'workouts',
              'action'     => 'view',
              $workout['id']
            ),
            array(
              'class' => 'workout',
              'style' => $this->Html->style(array('height' => $height.'px')),
              'escape' => false
            )
          );

        }
      }
      $html.= '</li>';
    }
    $html.=   '</ol>';

    return $html;
  }

  /**
   * Renders abbreviated version of workout details
   */
  protected function renderWorkoutTooltip($workout) {

    // Set the position of the tooltip
    $bottom = $workout['distance'] * $this->getScale() + 3;

    // If the distance is 1 miles, use singular form
    $units = ($workout['distance'] == 1) ? 2 : 1;

    $html =
      '<span class="date">' . date('D M j, Y', $workout['date']) . '</span>' .
        '<span class="distance_time">' .
          format_distance($workout['distance']) .
          '<span class="distance_label">' .
            render_units($workout['distance']) .
          '</span>' .
        '</span>';

    if (isset($workout['time']) && $workout['time'] != 0) {
      $html.=
        '<span class="time">' .
          format_time($workout['time_arr']) .
        '</span>';
    }

    $tooltip = 
      $this->Tooltip
        ->setMarkup($html)
        ->addClass(array('details', 'short'))
        ->setStyles(array('bottom' => $bottom.'px'))
        ->render();

    return $tooltip;
  }

  protected function getScale() {
    return $this->scale;
  }

  protected function getBaseHeight() {
    return $this->baseHeight;
  }

  private function renderYearHeader(
      $year,
      $year_mileage_total,
      $year_workout_total) {

    $run_label = $year_workout_total == 1 ? 'run' : 'runs';

    return
      '<div class="yearHeader clearfix">' .
      '<h3>' . $year . '</h3>' .
      '<ul class="year_totals clearfix">' .
        '<li>' .
          render_distance($year_mileage_total, 1) .
        '</li>' .
        '<li>' .
          $year_workout_total . ' ' . $run_label .
        '</li>' .
      '</ul>' .
    '</div>';
  }

  protected function renderGoogleMapImage($params) {
    $src = 'http://maps.google.com/maps/api/staticmap?' . $params;
    return render_image($src);
  }

}