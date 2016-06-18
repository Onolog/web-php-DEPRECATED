<?php
/**
 * Displays the calendar view of all a user's workouts
 */
echo $this->element('react_page', array(
  'css' => array(
    'app/UserCalendar',
    'app/Workout',
    'components/Calendar',
  ),
  'data' => array(
    'activities' => $activities,
    'shoes' => $shoes,
  ),
  'page' => 'Home',
  'title' => $title,
));
