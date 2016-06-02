<?php
// Set any page-level classes.
if (isset($classes)) {
  $this->set('page_classes', $classes);
}

// Load any CSS files.
if (isset($css)) {
  $this->Include->css($css);
}

// Set the page title.
if (isset($title)) {
  $this->set('title_for_layout',  $title);
}

// Render the root element on the page
echo $this->element('loader', array('id' => 'root'));

// Prepare all the data for the client.
$appData = array(
  'activities' => array(),
  'brands' => array(),
  'session' => $this->Session->read('Config'),
  'shoes' => array(),
  'user' => $this->Session->read('Auth.User'),
);

if (isset($data)) {
  $appData = array_merge($appData, $data);
}

// Write the initial page data.
$this->Html->scriptStart(array('inline' => false));
echo 'window.APP_DATA = ' . json_encode($appData, JSON_NUMERIC_CHECK);
$this->Html->scriptEnd();

// Finally, write the app script to the page.
$this->Html->script('build/' . $page, array('inline' => false));
