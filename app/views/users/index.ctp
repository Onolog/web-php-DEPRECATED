<?php
/**
 * Displays the calendar view of all a user's workouts
 */
$this->layout = 'basic';
$this->Include->css(array(
  'app/Activity',
  'app/UserCalendar',
  'app/Workout',
  'components/Calendar',
  'components/DateTimePicker',
  'components/Facepile',
  'components/FBFriendTokenizer',
  'components/Topline',
));
$this->set('page_classes', array('log'));

echo $this->element('loader', array(
  'id' => 'reactRoot'
));

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Users/Home/Home.react'
  ], function(reactRender, Home) {
    reactRender(
      Home, {
        month: $month-1,
        year: $year
      }, 'reactRoot'
    );
  });
";
$this->Html->scriptEnd();
