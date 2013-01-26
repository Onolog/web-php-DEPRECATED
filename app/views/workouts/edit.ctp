<?php
/**
 * Edit a workout
 *
 * Path: /views/workouts/edit.ctp
 */

$date = $this->data['Workout']['date'];

$form_options = array(
  'inputDefaults' => array(
    'div' => false,
    'label' => false
  )
);

$page_header = '<h2>' . date('F jS, Y', $date) . '</h2>';

$r =
  $this->element('workout_edit_fields',
    array(
      'options' => $form_options,
      'label'   => __('Update Workout', 1)
    )
  );

echo $r;


$sidebar =
  '<ul class="actions">' .
    '<li>' .
      $this->Html->link(
        __('Delete Workout', true),
        array('action' => 'delete', $this->Form->value('Workout.id')),
        null,
        __('Are you sure you want to delete this workout?', true)
      ) .
    '</li>' .
		'<li>' .
		  $this->Html->link(
		    __('All Workouts', true),
        get_home_uri()
		  ) .
		'</li>' .
	'</ul>';

$this->set('page_header', $page_header);
$this->set('sidebar', $sidebar);
