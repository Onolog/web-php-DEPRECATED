<?php

/**
 * Renders a standard tooltip
 */
$this->Include->css('components/Topline');

if (!isset($stats)) {
  return;
}

$r =
  '<ul class="topline clearfix">';

foreach ($stats as $label => $stat) {
  $r .=
    '<li>' .
      '<div class="labeledStat">' .
        '<div class="labeledStatLabel">' . $label . '</div>' .
        '<div class="labeledStatData">' . $stat . '</div>' .
      '</div>' .
    '</li>';
}
$r .= '</ul>';

echo $r;
