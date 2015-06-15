<?php
/**
 * Add a workout
 *
 * Path: /views/workouts/add.ctp
 */
$this->Include->css(array(
  'app/Workout',
  'components/Datepicker',
  'components/FBFriendTokenizer',
));

$this->set('title_for_layout', __('Add Activity', 1));
$this->set('page_classes', array(
  'narrow-page'
));

echo $this->element('loader', array(
  'id' => 'reactRoot',
));

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Workouts/WorkoutAddEditPage.react'
  ], function(reactRender, WorkoutAddEditPage) {
    reactRender(WorkoutAddEditPage, {}, 'reactRoot');
  });
";
$this->Html->scriptEnd();
