<?php

/**
 * Renders a standard tooltip
 */
$this->Include->css('topline');

if (!isset($stats)) {
  return;
}

$r =
  '<ul class="topline clearfix">';

foreach ($stats as $label => $stat) {
  $r .=
    '<li>' .
      '<div class="label">' . $label . '</div>' .
      '<div class="number">' . $stat . '</div>' .
    '</li>';
}
$r .= '</ul>';

echo $r;
