<?php
/**
 * Displays a list of all the user's shoes
 */

$page_header = '<h2>' . __('Shoes', 1) . '</h2>';

$r =
  '<table cellpadding="0" cellspacing="0" class="item_list">' .

    /*
  	'<tr>' .
      '<th>' . __('Brand', 1) . '</th>' .
  		'<th>' . __('Name', 1) . '</th>' .
  		'<th>' . __('Runs', 1) . '</th>' .
  		'<th>' . __('Miles', 1) . '</th>' .
  		'<th class="actions">' . __('Actions', 1) . '</th>' .
  	'</tr>';
  	*/
  '';

	$i = 0;
	foreach ($shoes as $shoe) {
		$classes = array();
		/*
		if ($i++ % 2 == 0) {
			$classes[] = 'altrow';
		}
		*/

    $token = __('Active', 1);
		if ($shoe['Shoe']['inactive']) {
		  $classes[] = 'inactive';
		  $token = __('Inactive', 1);
		}
		$class = empty($classes) ? '' : ' class="' . implode(' ', $classes) . '"';

    // Print the correct label for number of runs
		$runs_label = $shoe['Shoe']['workouts'] > 1 ? __('runs', 1) : __('run', 1);

    $r .=
    	'<tr' . $class . '>' .
        '<td class="activity"><div class="token">' . $token . '</div></td>' .
    		'<td>' . $shoe['Shoe']['brand'] . '</td>' .
    		'<td>' . $this->Html->link($shoe['Shoe']['model'], array('controller' => 'shoes', 'action' => 'view', $shoe['Shoe']['id'])) . '</td>' .
        '<td>' . $shoe['Shoe']['workouts'] . ' ' . $runs_label .'</td>' .
        '<td class="mileage">' .
          render_distance($shoe['Shoe']['mileage'], 2) .
        '</td>' .
    		'<td class="actions">' .
    			$this->Html->link(__('Edit', 1), array(
            'controller' => 'shoes',
            'action' => 'edit',
            $shoe['Shoe']['id']
          )) .
          $this->element('close_button', array(
            'link' => array(
              'controller' => 'shoes',
              'action' => 'delete',
              $shoe['Shoe']['id']
            ),
            'confirmation' => __('Are you sure you want to delete this shoe?', 1)
          )) .
    		'</td>' .
    	'</tr>';
  }

$r .= '</table>';
echo $r;

$sidebar =
  $this->element('sidebar',
    array(
      'items' => array(
        array(
          'label' => __('New Shoe', 1),
          'actions' => array('controller' => 'shoes', 'action' => 'add')
        ),
      )
    )
  );

$this->set('page_header', $page_header);
$this->set('sidebar', $sidebar);
