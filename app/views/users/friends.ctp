<?php

$page_header =
  '<h2>' . __('Friends', 1) . '</h2>';

$r =
  '<div class="card">' .
    $this->element('friend_list', array(
      'friends' => $friends,
    )) .
  '</div>';

echo $r;

$this->set('page_header', $page_header);
$this->set('sidebar', '');
