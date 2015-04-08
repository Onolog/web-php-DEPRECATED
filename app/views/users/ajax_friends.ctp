<?php
/**
 * Ajax endpoint for displaying friend data
 */
$r =
  $this->element('friend_list', array(
    'friends' => $friends,
    'small'   => true
  ));

$json = array('html' => $r);

// Send JSON data
echo json_encode($json);
