<?php

$page_header =
  '<h2>' . __('Add Shoes', 1) . '</h2>';

$r =
  $this->Form->create('Shoe') .
    '<fieldset>' .
		  // $this->Form->input('user_id') .
      $this->Form->input(
        'brand_id',
        array(
          'options'  => $brands,
          'selected' => $this->Form->value('Shoe.brand_id'),
          'empty'    => 'Select a brand:'
        )
      ) .
		  $this->Form->input('model') .
		  // $this->Form->input('inactive') . // Only put this in the "Edit" view
    '</fieldset>' .
  $this->Form->end(__('Add Shoe', 1));

echo $r;

$sidebar =
    $this->element('sidebar',
      array(
        'items' => array(
          array(
            'label' => __('All Shoes', true),
            'actions' => array('action' => 'index')
          ),
        )
      )
    );

$this->set('page_header', $page_header);
$this->set('sidebar', $sidebar);
