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
    $workouts;

  const SCALE = 3.0; // 1 mile = SCALE px;
  const BASE_HEIGHT = 50;

  /**
   * @param   arr   $workouts
   */
  public function setWorkouts($workouts) {
    krsort($workouts);
    $this->workouts = $workouts;
    return $this;
  }

  public function render() {
    $this->Include->css('chart');

    $grouped  = $this->workouts;

    // Calendar info
    $info = cal_info(CALENDAR_TYPE);
    $cal_months = $info['abbrevmonths'];
    $y_curr = date('Y');    

    $html = '<div id="daily">' .
              '<ol class="chart">';
  
    foreach ($grouped as $year => $yData) {
      $months = $yData['months'];
      $class = ($year == $y_curr) ? ' currentYear' : '';
      $class.= $year % 2 ? ' y_odd' : '';

      $html.=
        '<li class="year clearfix panel panel-default' . $class . '">' .
          $this->renderYearHeader($yData) .
          '<div class="panel-body clearfix">' .
            '<ol class="monthContainer">';

      foreach ($months as $month => $mData) {
        $days = $mData['days'];
        $class = $month % 2 ? ' m_odd' : '';
        $monthly_total = $mData['miles'];

        $html.=
          '<li class="month clearfix' . $class . '">' .

            // Render all the days in the month
            // TODO: add ability to aggregate by week or month
            $this->renderDays($days, $year, $month) .

            '<div class="monthLabel">' .
              '<h4>' . $cal_months[$month] . '</h4>' .
              '<div class="monthTotal">' .
                render_distance($monthly_total, 2) .
              '</div>' .
            '</div>' .
          '</li>';
      }

      $html.=
            '</ol>' . // monthContainer
          '</div>' .
        '</li>';
    }
    $html.=
        '</ol>' . // Years
      '</div>';  // #daily

    return $html;
  }

  /**
   * Render all the days, with any workouts of a given month
   */
  protected function renderDays($days, $year, $month) {
    $html = '<ol>'; // Days
    $grouped = $this->workouts;

    foreach ($days as $day => $data) {

      // Calculate and set the top margin for each day
      $distance = $data['miles'];
      $total_height = self::BASE_HEIGHT * self::SCALE;
      $height = round($distance) * self::SCALE;
      $margin = $total_height - $height - ($data['run_count'] > 1 ? $data['run_count'] + 2 : 0);

      $classes = array('day');
      if ($distance === 0) {
        $classes[] = 'noWorkouts';
      }

      $html.=
        '<li ' .
          'class="'.implode(' ', $classes).'" ' .
          'style="margin-top: '.$margin.'px;">';

      foreach ($data['workouts'] as $workout) {
        if (isset($workout['id'])) {
          $height = round(idx($workout, 'distance', 0)) * self::SCALE;

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
    $bottom = $workout['distance'] * self::SCALE + 3;

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

    if (isset($workout['time']) && $workout['time'] !== 0) {
      $html.=
        '<span class="time">' .
          format_time($workout['time']) .
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

  private function renderYearHeader($yearData) {

    $run_label = $yearData['run_count'] === 1 ? 'run' : 'runs';

    return
      '<div class="yearHeader clearfix panel-heading">' .
        '<h3 class="panel-title">' . $yearData['year'] . '</h3>' .
        '<ul class="yearTotals clearfix">' .
          '<li>' .
            render_distance($yearData['miles'], 1) .
          '</li>' .
          '<li>' .
            $yearData['run_count'] . ' ' . $run_label .
          '</li>' .
        '</ul>' .
      '</div>';
  }
}