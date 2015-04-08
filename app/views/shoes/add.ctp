<?php

$page_header =
  '<h2>' . __('Add a new shoe', 1) . '</h2>';

$r =
  $this->element('shoe_fields',
    array(
      'label'  => __('Add Shoe', 1)
    )
  );

echo $r;

$this->set('page_header', $page_header);
