<?php
/**
 * Displays the calendar view of all a user's workouts
 */
$this->set([
  'data' => [
    'activities' => $activities,
    'shoes' => $shoes,
    'users' => $users,
  ],
  'title' => $title,
]);
