<?php
$this->set([
  'data' => [
    'activities' => $activities,
    'activitySummary' => $stats,
    'users' => [$user],
  ],
  'title' => $user['name'],
]);
