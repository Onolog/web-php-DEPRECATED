<?php
/**
 * Displays the calendar view of all a user's workouts
 */
$this->Include->css(array('calendar', 'log', 'workout'));
$this->Include->js(array('Calendar', 'workout'));
$this->set('page_classes', array('log'));

$this->Calendar
  ->setWorkouts($workouts)
  ->setDate($month, $year);

$date = $this->Calendar->getDate();

$page_header =
  '<h2>' . date('F Y', $date) . '</h2>' .
  '<div class="btn-group auxContent">' .
    $this->Html->link(
	    '◄',
	    date('/Y/m/', strtotime(date('Y-n', $this->Calendar->getDate()) . ' -1 month')),
	    array(
	     'class' => 'btn',
	     'rel' => 'tooltip',
	     'title' => __('Previous month', 1),
      )
    ) .
    $this->Html->link(
	    '•',
	    date('/Y/m/'),
	    array(
	     'class' => 'btn',
	     'rel' => 'tooltip',
	     'title' => __('This month', 1)
      )
    ) .
    $this->Html->link(
	    '►',
	    date('/Y/m/', strtotime(date('Y-n', $this->Calendar->getDate()) . ' +1 month')),
	    array(
	     'class' => 'btn',
	     'rel' => 'tooltip',
	     'title' => __('Next month', 1)
      )
    ) .
  '</div>';

$r =
  '<div id="calendar">' .
    $this->Calendar->render() .
  '</div>' .

  // Modal markup for workouts
  '<div ' .
    'id="workoutModal" ' .
    'class="modal hide fade" ' .
    'tabindex="-1" ' .
    'role="dialog" ' .
    'aria-labelledby="myModalLabel" ' .
    'aria-hidden="true">' .
  '</div>';

echo $r;

// Sidebar
$sidebar =
  $this->element('sidebar_tabs') .
  '<div id="sidebar_content">' .
    $this->element('mileage_stats', array(
      'stats' => $stats
    )) .
  '</div>';

// Set JS for the page
$this->Html->scriptStart(array('inline' => false));
echo "
  $('.btn').tooltip({
    'animation': false
  });
  new Calendar();
";
$this->Html->scriptEnd();

$this->set('page_header', $page_header);
// $this->set('sidebar', $sidebar);
