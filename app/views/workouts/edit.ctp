<?php
/**
 * Edit a workout
 *
 * Path: /views/workouts/edit.ctp
 */
echo $this->element('react_page', array(
  'css' => array(
    'app/Workout',
    'components/DateTimePicker',
    'components/FBFriendTokenizer',
  ),
  'data' => array(
    'isEditing' => true,
    'workout' => $this->data['Workout']
  ),
  'page' => 'WorkoutAddEdit',
  'title' => 'Edit Activity',
));
