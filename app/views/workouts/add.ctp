<?php
/**
 * Server-side endpoint for activity creation.
 */
echo $this->element('react_page', array(
  'css' => array(
    'app/Workout',
    'components/DateTimePicker',
    'components/FBFriendTokenizer',
  ),
  'page' => 'WorkoutAddEdit',
  'title' => 'Add Activity',
));
