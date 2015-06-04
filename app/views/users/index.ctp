<?php
/**
 * Displays the calendar view of all a user's workouts
 */
$this->Include->css(array(
  'app/Activity',
  'app/UserCalendar',
  'app/Workout',
  'components/Calendar',
  'components/Datepicker',
  'components/Facepile',
  'components/Topline',
  'token-input-facebook',
));
$this->set('page_classes', array('log'));

echo $this->element('loader', array(
  'id' => 'reactRoot'
));

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Users/Calendar/UserCalendarPage.react'
  ], function(reactRender, UserCalendarPage) {
    reactRender(
      UserCalendarPage, {
        month: $month-1,
        shoes: $json_shoes,
        year: $year
      }, 'reactRoot'
    );
  });
";
$this->Html->scriptEnd();
