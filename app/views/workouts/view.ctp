<?php
/**
 * Displays a read-only view of a workout
 *
 * File: /app/views/workouts/view.ctp
 */

$this->Include->css(array(
  'app/Workout',
  'components/Topline'
));

$this->set('page_classes', array('workoutView'));

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

$page_header = '<h2>' . $date . '</h2>';

if ($is_owner) {
  $page_header .=
    '<div class="btn-group auxContent">' .
      /*
      $this->Html->link(
  	    '<span class="glyphicon glyphicon-pencil"></span>',
        array('action' => 'edit', $workout['Workout']['id']),
  	    array(
  	     'class' => 'btn btn-default',
  	     'rel' => 'tooltip',
  	     'title' => __('Edit Workout', 1),
  	     'escape' => false,
        )
      ) .
      */
      $this->Html->link(
  	    '<span class="glyphicon glyphicon-trash"></span>',
  	    array(
          'action' => 'delete',
          $workout['Workout']['id']
        ),
  	    array(
  	     'class' => 'btn btn-default',
  	     'rel' => 'tooltip',
  	     'title' => __('Delete Workout', 1),
  	     'escape' => false,
        ),
        'Are you sure you want to delete this workout?'
      ) .
      /*
      $this->Html->link(
  	    '<span class="glyphicon glyphicon-plus"></span>',
  	    array('action' => 'add'),
  	    array(
  	     'class' => 'btn btn-default',
  	     'rel' => 'tooltip',
  	     'title' => __('New Workout', 1),
  	     'escape' => false,
        )
      ) .
      */
      $this->Html->link(
  	    '<span class="glyphicon glyphicon-th"></span>',
  	    array('controller' => 'users', 'action' => 'index'),
  	    array(
  	     'class' => 'btn btn-default',
  	     'rel' => 'tooltip',
  	     'title' => __('All Workouts', 1),
  	     'escape' => false,
        )
      ) .
    '</div>';
}

$this->set('page_header', $page_header);

echo
  '<section class="panel panel-default">' .
    $this->element('loader', array(
      'class' => 'panel-body',
      'id' => 'reactRoot',
    )) .
  '</section>';

// Set JS for the page
$json_workout = json_encode($workout['Workout']);
$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Workouts/WorkoutView.react',
    'lib/bootstrap.min'
  ], function(reactRender, WorkoutView) {
    reactRender(WorkoutView, { workout: $json_workout }, 'reactRoot');

    $('.btn').tooltip({ container: 'body' });
  });
";
$this->Html->scriptEnd();
