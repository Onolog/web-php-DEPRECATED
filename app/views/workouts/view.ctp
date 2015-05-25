<?php
/**
 * Displays a read-only view of a workout
 *
 * File: /app/views/workouts/view.ctp
 */

$this->Include->css(array(
  'app/Workout',
  'components/Facepile',
  'components/Topline'
));
$this->set('page_classes', array(
  'narrow-page',
  'workoutView'
));

$page_url = 'http://www.onolog.com/workouts/view/'.$workout['Workout']['id'];
$date = date('F jS, Y', $workout['Workout']['date']);
$time = format_time(sec_to_time($workout['Workout']['time']));
$distance = number_format($workout['Workout']['distance'], 2);

// Set OG meta tags
$this->Meta->og('og:title', $date . ' &middot; ' . $distance . ' miles &middot; ' . $time);
$this->Meta->og('og:url', $page_url);
$this->Meta->og('og:type', 'onolog:run');
$this->Meta->og('og:site_name', 'Onolog');
$this->Meta->og('og:description', idx($workout['Workout'], 'notes'));
$this->Meta->og('onolog:distance', $distance);
$this->Meta->og('onolog:time', $time);
$this->Meta->og('fb:app_id', FB_APP_ID);

echo $this->element('loader', array(
  'id' => 'reactRoot',
));

// Set JS for the page
$json_workout = json_encode($workout['Workout']);
$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Workouts/WorkoutViewPage.react'
  ], function(reactRender, WorkoutViewPage) {
    reactRender(WorkoutViewPage, {
      canEdit: $is_owner,
      workout: $json_workout
    }, 'reactRoot');
  });
";
$this->Html->scriptEnd();
