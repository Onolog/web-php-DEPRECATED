<?php
/**
 * Ajax endpoint for displaying mileage stats
 */
$r =
  $this->element('mileage_stats', array(
    'stats' => $stats,
  ));

$json = array('html' => $r);

// Send JSON data
echo json_encode($json) . "\n";
