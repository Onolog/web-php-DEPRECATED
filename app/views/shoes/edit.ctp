<?php

$page_header =
  '<h2>' . $this->Form->value('Shoe.name') . '</h2>';

$r =
  $this->Form->create('Shoe') .
    '<fieldset>' .
      $this->Form->input('id') .
      $this->Form->input(
        'brand_id',
        array(
          'options'  => $brands,
          'selected' => $this->Form->value('Shoe.brand_id'),
          'empty'    => 'Select a brand:'
        )
      ) .
      $this->Form->input('model') .
      $this->Form->input('inactive') .
    '</fieldset>' .
  $this->Form->end(__('Save', true));

echo $r;

$sidebar =
    $this->element('sidebar',
      array(
        'items' => array(
          array(
            'label' => __('Delete', true),
            'actions' => array(
              'action' => 'delete',
              $this->Form->value('Shoe.id')
            ),
            null,
            __('Are you sure you want to delete this shoe?', true)
          ),
          array(
            'label' => __('All Shoes', true),
            'actions' => array('action' => 'index')
          ),
        )
      )
    );

$this->set('page_header', $page_header);
$this->set('sidebar', $sidebar);
