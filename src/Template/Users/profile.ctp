<?php
$this->set([
  'data' => [
    'activities' => $activities,
    'activitySummary' => $activitySummary,
    'users' => [$user],
  ],
  'title' => $user['name'],
]);
