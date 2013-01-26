<?php
/**
 * Mileage stats element
 * /app/views/elements/mileage_stats.ctp
 *
 * Displays the following mileage stats:
 *  - Miles this week
 *  - Miles this month
 *  - Miles this year
 *  - Miles all-time
 *
 * @param   arr   $stats
 */

$r = '';
foreach ($stats as $key => $stat) {
  $units = render_units($stat['total']);
  $r .=
    '<div id="' . $key . '" class="sidebar_section clearfix">' .
      '<div class="mileage">' . number_format($stat['total'], 2) . '</div>' .
      '<div class="label">' . $units . '<br/>' . $stat['label'] . '</div>' .
    '</div>';
}
$r .=
  $this->Html->link(__('See all stats', 1), array(
    'ajax' => false,
    'controller' => 'users',
    'action' => 'profile',
    $this->Session->read('Auth.User.id')
  ), array(
    'class' => 'see_all'
  ));

echo $r;
