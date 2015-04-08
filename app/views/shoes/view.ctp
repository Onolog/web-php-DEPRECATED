<?php
$this->Include->css('app/Shoe');

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


$r =
  '<section class="panel panel-default">' .
    '<div class="panel-body">' .
      $this->element('topline',
        array(
          'stats' => array(
            'Miles'  => $shoe['Shoe']['mileage'],
            'Runs' => $shoe['Shoe']['workouts'],
          )
        )
      ) .
    '</div>' .
  '</section>' .

  // Display Workouts
  '<section class="related panel panel-default">' .
    '<div class="panel-body">';

  if (!empty($shoe['Workout'])) {

    $r .= '<table cellpadding="0" cellspacing="0" class="shoeList item_list">';

		foreach ($shoe['Workout'] as $workout) {
		  $time_arr = sec_to_time($workout['time']);
		  $r .=
    		'<tr>' .
    			'<td>' . date('n/j/y', $workout['date']) . '</td>' .
    			'<td class="workoutDescription">' .
            '<div class="workoutDescriptionTruncator">' .
              $this->Html->link($workout['notes'], array(
                'controller' => 'workouts',
                'action' => 'view',
                $workout['id']
              )) .
            '</div>' .
          '</td>' .
    			'<td class="mileage">' . render_distance($workout['distance'], 2) . '</td>' .
    			'<td class="time">' . format_time($time_arr) . '</td>' .
    		'</tr>';
    }
    $r .= '</table>';
  }
  $r .=
      '</div>' .
    '</section>';

echo $r;

$this->Html->scriptStart(array('inline' => false));
echo "
  require(['lib/bootstrap.min'], function() {
    $('.btn').tooltip({ container: 'body' });
  });
";
$this->Html->scriptEnd();
