<?php
/**
 * Displays a list of all the user's shoes
 */

$page_header =
  '<h2>' . __('Shoes', 1) . '</h2>' .
  '<div class="btn-group auxContent">' .
    $this->Html->link(
	    '<span class="glyphicon glyphicon-plus"></span> New Shoe',
	    array(
	     'controller' => 'shoes',
	     'action' => 'add'
      ),
	    array(
	     'class' => 'btn btn-default',
	     'escape' => false,
      )
    ) .
  '</div>';

$this->set('page_header', $page_header);

$r = '';
if (empty($shoes)) {
  $r =
    '<section class="panel panel-default">' .
      '<div class="panel-body emptyState">' .
        'You don\'t have any shoes to display. ' .
        $this->Html->link(
          'Add some',
    	    array(
    	     'controller' => 'shoes',
    	     'action' => 'add'
          )
        ) .
      '.</div>' .
    '</section>';
}

foreach ($shoes as $status => $shoeGroup) {
  $r .=
    '<section class="panel panel-default">' .
      '<div class="panel-heading">' .
        '<h3 class="panel-title">' . ucfirst($status) . '</h3>' .
      '</div>' .
      '<div class="panel-body">' .
        '<table cellpadding="0" cellspacing="0" class="item_list">';

	foreach ($shoeGroup as $shoe) {
		$classes = array();
    $token = __('Active', 1);
		if ($shoe['inactive']) {
		  $classes[] = 'inactive';
		  $token = __('Inactive', 1);
		}
		$class = empty($classes) ? '' : ' class="' . implode(' ', $classes) . '"';

    // Print the correct label for number of runs
		$runs_label = $shoe['activity_count'] === 1 ? __('run', 1) : __('runs', 1);

    $r .=
    	'<tr' . $class . '>' .
        '<td class="activity">' .
          $this->Html->link(
      	    '',
      	    '#',
      	    array(
      	     'class' => 'token',
      	     'rel' => 'tooltip',
      	     'title' => $token
            )
          ) .
        '</td>' .
    		'<td>' . $shoe['brand'] . '</td>' .
    		'<td>' . $this->Html->link($shoe['model'], array('controller' => 'shoes', 'action' => 'view', $shoe['id'])) . '</td>' .
        '<td>' . $shoe['activity_count'] . ' ' . $runs_label .'</td>' .
        '<td class="mileage">' .
          render_distance($shoe['mileage'], 2) .
        '</td>' .
    		'<td class="actions">' .
    			$this->Html->link(__('Edit', 1), array(
            'controller' => 'shoes',
            'action' => 'edit',
            $shoe['id']
          )) .
          $this->element('close_button', array(
            'link' => array(
              'controller' => 'shoes',
              'action' => 'delete',
              $shoe['id']
            ),
            'params' => array(
              'tooltip' => __('Delete', 1)
            ),
            'confirmation' => __('Are you sure you want to delete this shoe?', 1)
          )) .
    		'</td>' .
    	'</tr>';
  }

  $r .=
        '</table>' .
      '</div>' .
    '</section>';
}

echo $r;

// Set JS for the page
$this->Html->scriptStart(array('inline' => false));
echo "
  require(['lib/bootstrap.min'], function() {
    $('.token').tooltip();
  });
";
$this->Html->scriptEnd();
