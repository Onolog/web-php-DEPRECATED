<?php
/**
 * Displays the calendar view of all a user's workouts
 */
$this->Include->css(array(
  'app/Workout',
  'components/Calendar',
  'components/Topline',
  'token-input-facebook',
));
$this->set('page_classes', array('log'));

$date = mktime(0, 0, 0, $month, 1, $year);

$page_header =
  '<h2>' . date('F Y', $date) . '</h2>' .

  // TODO: Reactify this
  '<div class="btn-group pull-right">' .
    $this->Html->link(
	    '◄',
	    date('/Y/m/', strtotime(date('Y-n', $date) . ' -1 month')),
	    array(
	     'class' => 'btn btn-default',
	     'rel' => 'tooltip',
	     'title' => __('Previous month', 1),
      )
    ) .
    $this->Html->link(
	    '•',
	    date('/Y/m/'),
	    array(
	     'class' => 'btn btn-default',
	     'rel' => 'tooltip',
	     'title' => __('This month', 1)
      )
    ) .
    $this->Html->link(
	    '►',
	    date('/Y/m/', strtotime(date('Y-n', $date) . ' +1 month')),
	    array(
	     'class' => 'btn btn-default',
	     'rel' => 'tooltip',
	     'title' => __('Next month', 1)
      )
    ) .
  '</div>';
$this->set('page_header', $page_header);

echo
  '<section class="panel panel-default">' .
    '<div class="panel-body" id="reactRoot">' .
      '<div class="loader loader-lg"></div>' .
    '</div>' .
  '</section>';

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Users/Calendar/UserCalendar.react'
  ], function(reactRender, UserCalendar) {
    reactRender(
      UserCalendar, {
        friends: $json_friends,
        month: $month-1,
        shoes: $json_shoes,
        year: $year
      }, 'reactRoot'
    );

    $('.btn').tooltip({ container: 'body' });
  });
";
$this->Html->scriptEnd();
