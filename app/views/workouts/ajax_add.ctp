<?php
/**
 * Add a workout via ajax
 *
 * Path: /views/workouts/ajax_add.ctp
 */

$form_options = array(
  'url' => '/workouts/add/' . $date,
  'inputDefaults' => array(
    'div' => false,
    'label' => false
  )
);

$r =
  '<div class="modal-header">' .
    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' .
    '<h3>' . $title . '</h3>' .
  '</div>' .
  '<div class="modal-body">' .
    $this->element('workout_edit_fields',
      array(
        'options' => $form_options,
        'label'  => __('Add Workout', 1)
      )
    ) .
  '</div>' .
  '<div class="modal-footer">' .
    '<a href="#" class="btn" data-dismiss="modal">Close</a>' .
    '<a href="#" class="btn btn-primary">Save changes</a>' .
  '</div>';

// Send JSON data
echo json_encode(array('html' => $r));
