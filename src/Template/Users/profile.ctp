<?php
$this->set([
  'data' => [
    'activities' => $activities,
    'shoes' => $shoes,
    'users' => [$user],
  ],
  'title' => $user['name'],
]);
