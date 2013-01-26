<?php
/**
 * Edit a workout
 *
 * Path: /views/runs/edit.ctp
 */

$date = $this->data['Workout']['date'];

$form_options = array(
  'inputDefaults' => array(
    'div' => false,
    'label' => false
  )
);
$form_end = __('Update Workout', 1);

$r =
  '<h2>' . date('F jS, Y', $date) . '</h2>' .

  // Workout fields
  $this->element('workout_edit_fields',
    array(
      'options' => $form_options,
      'end'     => $form_end
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
		    array('action' => 'index')
		  ) .
		'</li>' .
	'</ul>';

$this->set('sidebar', $sidebar);
