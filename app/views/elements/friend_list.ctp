<?php
/**
 * Friend list element
 * /app/views/elements/friend_list.ctp
 *
 * Display a list of all FB friends in the system,
 * along with info like number of common runs
 *
 * @param   arr   $friends
 */

$this->Include->css('friend_list');

$classes = array('friend_list');
if (isset($small) && $small) {
  $classes[] = 'small';
}

$r =
  '<ul class="' . implode(' ', $classes) . '">';
  foreach ($friends as $friend) {
    $r .=
      '<li>' .
        $this->element('user_entity', array(
          'user' => $friend,
          // TODO: Get actual run count
          // 'metadata' => array('X runs in common')
        )) .
      '</li>';
  }

$r.= '</ul>';

echo $r;
