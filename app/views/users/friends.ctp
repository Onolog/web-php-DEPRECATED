<?php

$page_header =
  '<h2>' . __('Friends', 1) . '</h2>';

$r =
  $this->element('friend_list', array(
    'friends' => $friends,
  ));

echo $r;

$this->set('page_header', $page_header);
$this->set('sidebar', '');
