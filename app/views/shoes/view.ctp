<?php
$this->Include->css(array(
  'app/Shoe',
  'components/Topline'
));

$page_header = '<h2>' . $shoe['Shoe']['name'] . '</h2>';

if ($is_owner) {
  $page_header .=
    '<div class="btn-group auxContent">' .
      $this->Html->link(
  	    '<span class="glyphicon glyphicon-pencil"></span>',
        array('action' => 'edit', $shoe['Shoe']['id']),
  	    array(
  	     'class' => 'btn btn-default',
  	     'rel' => 'tooltip',
  	     'title' => __('Edit Shoe', 1),
  	     'escape' => false,
        )
      ) .
      $this->Html->link(
  	    '<span class="glyphicon glyphicon-trash"></span>',
  	    array(
          'action' => 'delete',
          $shoe['Shoe']['id']
        ),
  	    array(
  	     'class' => 'btn btn-default',
  	     'rel' => 'tooltip',
  	     'title' => __('Delete Shoe', 1),
  	     'escape' => false,
        ),
        'Are you sure you want to delete this shoe?'
      ) .
      $this->Html->link(
  	    '<span class="glyphicon glyphicon-plus"></span>',
  	    array('action' => 'add'),
  	    array(
  	     'class' => 'btn btn-default',
  	     'rel' => 'tooltip',
  	     'title' => __('New Shoe', 1),
  	     'escape' => false,
        )
      ) .
      $this->Html->link(
  	    '<span class="glyphicon glyphicon-th"></span>',
        array(
  	     'controller' => 'users',
  	     'action' => 'shoes'
        ),
  	    array(
  	     'class' => 'btn btn-default',
  	     'rel' => 'tooltip',
  	     'title' => __('All Shoes', 1),
  	     'escape' => false,
        )
      ) .
    '</div>';
}
$this->set('page_header', $page_header);

echo $this->element('loader', array(
  'id' => 'reactRoot'
));

$activity_count = $shoe['Shoe']['activity_count'];
$json_activities = json_encode($shoe['Workout']);
$mileage = $shoe['Shoe']['mileage'];

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Shoes/ShoeView.react',
    'lib/bootstrap.min'
  ], function(reactRender, ShoeView) {
    reactRender(ShoeView, {
      activityCount: $activity_count,
      activities: $json_activities,
      mileage: $mileage
    }, 'reactRoot');

    $('.btn').tooltip({ container: 'body' });
  });
";
$this->Html->scriptEnd();
