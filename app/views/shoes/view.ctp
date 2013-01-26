<?php

$page_header = '<h2>' . $shoe['Shoe']['name'] . '</h2>';

$r =
  $this->element('topline',
    array(
      'stats' => array(
        'Miles'  => $shoe['Shoe']['mileage'],
        'Runs' => $shoe['Shoe']['workouts'],
      )
    )
  ) .

  // Display Workouts
  '<div class="related">';

  if (!empty($shoe['Workout'])) {

    $r .= '<table cellpadding="0" cellspacing="0" class="item_list">';

		foreach ($shoe['Workout'] as $workout) {
		  $r .=
    		'<tr>' .
    			'<td>' . date('n/j/y', $workout['date']) . '</td>' .
    			'<td>' .
            $this->Html->link(truncate_text($workout['notes'], 60), array(
              'controller' => 'workouts',
              'action' => 'view',
              $workout['id']
            )) .
          '</td>' .
    			'<td class="mileage">' . render_distance($workout['distance'], 2) . '</td>' .
    			'<td class="time">' . format_time($workout['time_arr']) . '</td>' .
    		'</tr>';
    }
    $r .= '</table>';
  }
  $r .= '</div>';

echo $r;


$sidebar = '';
if ($is_owner) {
  $sidebar =
    $this->element('sidebar',
      array(
        'items' => array(
          array(
            'label' => __('Edit Shoe', 1),
            'actions' => array('action' => 'edit', $shoe['Shoe']['id'])
          ),
          array(
            'label' => __('Delete Shoe', 1),
            'actions' => array('action' => 'delete', $shoe['Shoe']['id']), null, sprintf(__('Are you sure you want to delete this shoe?', true), $shoe['Shoe']['id'])
          ),
          array(
            'label' => __('All Shoes', 1),
            'actions' => array('controller' => 'users', 'action' => 'shoes')
          ),
          array(
            'label' => __('New Shoe', 1),
            'actions' => array('action' => 'add')
          ),
        )
      )
    );
}

$this->set('page_header', $page_header);
$this->set('sidebar', $sidebar);
