<?php
use View\Helper\PageHelper;

$data = array_intersect_key($this->viewVars, [
  // Whitelisted keys for client-side store.
  // TODO: Remove the need to sync this with client app.
  'activities' => true,
  'activitySummary' => true,
  'brands' => true,
  'session' => true,
  'shoes' => true,
  'title' => true,
  'users' => true,
]);

// Don't pass title to the client.
// TODO: Set title on client instead of server.
$title = idx($data, 'title', $this->fetch('title'));
unset($data['title']);

$this->Page
  ->setPageTitle($title)
  ->setData($data)
  ->setMeta($this->fetch('meta'))
  ->render();
