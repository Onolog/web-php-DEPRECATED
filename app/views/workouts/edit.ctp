<?php
/**
 * Edit a workout
 *
 * Path: /views/workouts/edit.ctp
 */
$this->Include->css(array(
  'app/Workout',
  'components/Datepicker',
  'components/FBFriendTokenizer',
));
$this->set('page_classes', array(
  'narrow-page'
));

echo $this->element('loader', array(
  'id' => 'reactRoot',
));

$workout = json_encode($this->data['Workout'], JSON_NUMERIC_CHECK);

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Workouts/WorkoutAddEditPage.react'
  ], function(reactRender, WorkoutAddEditPage) {
    reactRender(WorkoutAddEditPage, {
      isEditing: true,
      shoes: $json_shoes,
      workout: $workout
    }, 'reactRoot');
  });
";
$this->Html->scriptEnd();
