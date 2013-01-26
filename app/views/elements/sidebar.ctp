<?php

$r =
  '<ul class="actions">';

foreach ($items as $item) {
  $r .=
    '<li>' .
      $this->Html->link(
        $item['label'],
        $item['actions'],
        null,
        idx($item, 'confirmation')
      ) .
    '</li>';
}
$r .=
    '</ul>';

echo $r;
