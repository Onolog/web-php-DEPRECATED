<?php
/**
 * Displays the calendar view of all a user's workouts
 */
echo $this->element('react_page', array(
  'css' => array(
    'app/Activity',
    'app/UserCalendar',
    'app/Workout',
    'components/Calendar',
    'components/DateTimePicker',
    'components/Facepile',
    'components/FBFriendTokenizer',
    'components/Topline',
  ),
  'data' => array(
    'month' => $month,
    'year' => $year
  ),
  'path' => '/build/Home',
  'title' => $title,
));
