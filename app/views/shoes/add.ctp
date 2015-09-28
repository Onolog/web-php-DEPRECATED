<?php
$this->set('page_classes', array('narrow-page'));

$page_header =
  '<h2>' . __('Add a new shoe', 1) . '</h2>';

$this->set('page_header', $page_header);

echo $this->element('shoe_fields', array(
  'label'  => __('Add Shoe', 1)
));
