<?php
/**
 * Add a workout
 *
 * Path: /views/workouts/add.ctp
 */
$this->Include->css(array(
  'app/Workout',
  'token-input-facebook'
));
$this->set('page_classes', array('workoutAdd'));

$selectedShoe = 0;
if (!empty($shoes)) {
  $activeShoeIDs = array_keys($shoes['Active']);
  $selectedShoe = reset($activeShoeIDs);
}

$this->set(
  'page_header',
  '<h2>' . $title . '</h2>'
);

echo
  '<section class="panel panel-default">' .
    '<div class="panel-body">' .
      $this->element('loader', array(
        'id' => 'reactRoot'
      )) .
      '<div class="btn-toolbar">' .
        $this->Button->set(array(
          'label' => __('Add Workout', 1),
          'type' => 'submit',
          'use' => 'primary',
          'id' => 'submit'
        ))->render() .
        $this->Button->set(array(
          'label' => __('Cancel', 1),
          'href' => get_home_uri(),
        ))->render() .
      '</div>' .
    '</div>' .
  '</section>';


$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Workouts/WorkoutAddPermalink.react',
    'lib/jquery/jquery.min'
  ], function(reactRender, WorkoutAddPermalink) {
    reactRender(WorkoutAddPermalink, {
      date: $date,
      selectedShoe: $selectedShoe,
      shoes: $json_shoes
    }, 'reactRoot');

    $('#submit').click(function() {
      $('.workoutForm').submit();
    });
  });
";
$this->Html->scriptEnd();
