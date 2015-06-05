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

$date = $this->data['Workout']['date'];
$page_header =
  '<h2>' . date('F jS, Y', $date) . '</h2>' .
  '<div class="btn-group auxContent">' .
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
$this->set('page_header', $page_header);

echo
  '<section class="panel panel-default">' .
    '<div class="panel-body">' .
      $this->element('loader', array(
        'id' => 'reactRoot'
      )) .
      '<div class="btn-toolbar">' .
        $this->Button->set(array(
          'label' => __('Update Workout', 1),
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

$workout = json_encode($this->data['Workout']);

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Workouts/WorkoutFields.react',
    'lib/bootstrap.min'
  ], function(reactRender, WorkoutFields) {
    reactRender(WorkoutFields, {
      action: 'edit',
      shoes: $json_shoes,
      workout: $workout
    }, 'reactRoot');

    $('#submit').click(function() {
      $('.workoutForm').submit();
    });
    $('.btn').tooltip({ container: 'body' });
  });
";
$this->Html->scriptEnd();
