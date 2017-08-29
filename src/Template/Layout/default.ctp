<?php
use View\Helper\PageHelper;

$data = array_intersect_key($this->viewVars, [
  // Whitelisted keys for client-side store.
  // TODO: Remove the need to sync this with client app.
  'activities' => true,
  'activityMetrics' => true,
  'activitySummary' => true,
  'brands' => true,
  'session' => true,
  'shoes' => true,
  'users' => true,
]);

$this->Page
  ->setData($data)
  ->setMeta($this->fetch('meta'))
  ->render();
