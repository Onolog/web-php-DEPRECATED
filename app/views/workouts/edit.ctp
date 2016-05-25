<?php
/**
 * Edit a workout
 *
 * Path: /views/workouts/edit.ctp
 */
echo $this->element('react_page', array(
  'css' => array('app/Workout'),
  'data' => array(
    'workouts' => array($this->data['Workout']),
  ),
  'page' => 'WorkoutAddEdit',
  'title' => 'Edit Activity',
));
