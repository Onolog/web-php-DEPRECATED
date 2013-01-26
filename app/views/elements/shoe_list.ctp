<?php
/**
 * Shoe list element
 * /app/views/elements/shoe_list.ctp
 *
 * Displays a list of active shoes with corresponding mileage
 *
 * @param   arr   $shoes
 */

$r = '';
foreach ($shoes as $shoe) {
  $r .=
    '<div class="sidebar_section clearfix">' .
      $this->Html->link($shoe['Shoe']['name'], array(
        'ajax' => false,
        'controller' => 'shoes',
        'action' => 'view',
        $shoe['Shoe']['id']
      ), array(
        'class' => 'shoe_name'
      )) .
      '<div class="shoe_mileage">' .
        render_distance($shoe['Shoe']['mileage'], 2) .
      '</div>' .
    '</div>';
}
$r .=
  $this->Html->link(__('See all shoes', 1), array(
    'ajax' => false,
    'controller' => 'users',
    'action' => 'shoes'
  ), array(
    'class' => 'see_all'
  ));

echo $r;
