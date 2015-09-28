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
    'month' => $month,
    'year' => $year
  ),
  'page' => 'Home',
  'title' => $title,
));
