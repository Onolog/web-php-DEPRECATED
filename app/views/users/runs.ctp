<?php
/**
 * Displays the calendar view of all a user's workouts
 */
$this->Include->css(array('calendar', 'log'));
$this->Include->js(array('log'));
$this->set('page_classes', array('log'));
$this->Calendar->setWorkouts($runs);

$page_header =
  '<div class="cal_header clearfix">' .
    '<div id="month_year" class="clearfix">' .
      '<h2>' .
        '<span class="month">' . date('F', $this->Calendar->getDate()) . '</span>' .
        ' ' .
        '<span class="year">' . date('Y', $this->Calendar->getDate()) . '</span>' .
      '</h2>' .
    '</div>' .
    /*
    '<div class="cal_select">' .
      $this->Form->create() .
        // $cal->renderMonthDropdown($month_params) .
        // $cal->renderYearDropdown($year_params) .
      $this->Form->end(__('Submit', true)) .
    '</div>' .
    */
  '</div>';

$r =
  '<div id="calendar">' .
    $this->Calendar->render() .
  '</div>';

echo $r;

// Set JS for the page
$this->Html->scriptStart(array('inline' => false));
echo "
  add_workout();
  $('#cal_submit').click(function() {
    selectDate($('#m').val(), $('#y').val());
  });
";
$this->Html->scriptEnd();

$this->set('page_header', $page_header);
