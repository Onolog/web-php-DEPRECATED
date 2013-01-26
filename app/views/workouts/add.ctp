<?php
/**
 * Add a workout
 *
 * Path: /views/workouts/add.ctp
 */

$form_options = array(
  'url' => '/workouts/add/' . $date,
  'inputDefaults' => array(
    'div' => false,
    'label' => false
  )
);

$page_header = '<h2>' . $title . '</h2>';

$r =
  $this->element('workout_edit_fields',
    array(
      'options' => $form_options,
      'label'  => __('Add Workout', 1)
    )
  );

echo $r;


$sidebar =
	'<ul class="actions">' .
		'<li>' .
		  $this->Html->link(
		    __('All Workouts', true),
		    get_home_uri()
		  ) .
		'</li>' .
	'</ul>';

$this->set('page_header', $page_header);
// $this->set('sidebar', $sidebar);
