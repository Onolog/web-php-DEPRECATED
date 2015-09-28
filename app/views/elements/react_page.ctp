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

$this->Html->script($path, array('inline' => false));

// Set data for window
if (isset($data)) {
  $this->Js->set($data);
  echo $this->Js->writeBuffer(array('onDomReady' => false));
}
