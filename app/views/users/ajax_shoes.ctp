<?php
/**
 * Ajax endpoint for displaying shoe data
 */
$r =
  $this->element('shoe_list', array(
    'shoes' => $shoes,
  ));

$json = array('html' => $r);

// Send JSON data
echo json_encode($json) . "\n";
