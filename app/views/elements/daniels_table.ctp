<?php

$r =
  '<div class="section">' .
    '<table class="paces">' .
      '<thead>' .
        '<tr class="header">' .
          '<th rowspan="2">VDOT</th>' .
          '<th>E Pace</th>' .
          '<th>M Pace</th>' .
          '<th colspan="3">T Pace</th>' .
          '<th colspan="4">I Pace</th>' .
          '<th colspan="3" class="lastCol">R Pace</th>' .
          '<th rowspan="2">VDOT</th>' .
        '</tr>' .
        '<tr class="distance">' .
          '<th class="lastCol">Mile</th>' .
          '<th class="lastCol">Mile</th>' .
          '<th>400m</th>' .
          '<th>1000m</th>' .
          '<th class="lastCol">Mile</th>' .
          '<th>400m</th>' .
          '<th>1000m</th>' .
          '<th>1200m</th>' .
          '<th class="lastCol">Mile</th>' .
          '<th>200m</th>' .
          '<th>400m</th>' .
          '<th>800m</th>' .
        '</tr>' .
      '</thead>' .
      '<tbody>' .
        '<tr>' .
          '<td class="vdot">' . $vdot . '</td>';

foreach($paces as $type) {
  foreach ($type as $pace) {
    $r .= render_cell($pace);
  }
}
$r .=
          '<td class="vdot">' . $vdot . '</td>' .
        '</tr>' .
      '</tbody>' .
    '</table>' .
  '</div>';

echo $r;


function render_cell($value) {
  $pace = '&middot;'; // Default
  if (isset($value)) {
    // For paces under 100 seconds, just show as seconds
    $pace = $value >= 100 ? date('i:s', $value) : $value;
    $pace = ltrim($pace, '0'); // Strip leading zero
  }
  return '<td>' . $pace . '</td>';
}

