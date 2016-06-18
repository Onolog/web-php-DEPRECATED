<?php
/**
 * Displays the calendar view of all a user's workouts
 */
echo $this->element('react_page', [
  'css' => [
    'app/UserCalendar',
    'components/Calendar',
  ],
  'data' => [
    'activities' => $activities,
    'shoes' => $shoes,
    'users' => [$user],
  ],
  'page' => 'Home',
  'title' => $title,
]);
