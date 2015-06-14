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
$this->set('page_classes', array(
  'narrow-page'
));

$selectedShoe = 0;
if (!empty($shoes)) {
  $activeShoeIDs = array_keys($shoes['Active']);
  $selectedShoe = reset($activeShoeIDs);
}

echo $this->element('loader', array(
  'id' => 'reactRoot',
));

$this->Js->set('date', $date);

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Workouts/WorkoutAddPage.react'
  ], function(reactRender, WorkoutAddPage) {
    reactRender(WorkoutAddPage, {
      date: $date,
      selectedShoe: $selectedShoe,
      shoes: $json_shoes
    }, 'reactRoot');
  });
";
$this->Html->scriptEnd();
