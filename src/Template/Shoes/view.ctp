<?php
echo $this->element('react_page', [
  'data' => [
    'activities' => $activities,
    'shoes' => [$shoe],
  ],
  'page' => 'Shoe',
]);
