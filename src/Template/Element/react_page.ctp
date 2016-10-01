<?php
// Set any page-level classes.
if (isset($classes)) {
  $this->set('page_classes', $classes);
}

// Load any CSS files.
if (isset($css)) {
  $this->Html->css($css, ['block' => true]);
}

// Set the page title.
if (isset($title)) {
  $this->set('title',  $title);
}

// Render the root element on the page
echo $this->element('loader', ['id' => 'root']);

// Prepare all the data for the client.
$session = $this->request->session();
$loggedInUser = $session->read('Auth.User');

$appData = [
  'activities' => [],
  'brands' => [],
  'session' => array_merge(
    $loggedInUser ?: [],
    $session->read('Config')
  ),
  'shoes' => [],
  'users' => [],
];

if (isset($data)) {
  $appData = array_merge($appData, $data);
}

// Write the initial page data.
$this->Html->scriptStart(['block' => true]);
echo 'window.APP_DATA = ' . json_encode($appData, JSON_NUMERIC_CHECK);
$this->Html->scriptEnd();

// Finally, write the app script to the page.
$this->Html->script('build/' . get_asset_name($page), ['block' => true]);
