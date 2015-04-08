<?php

$defaults = array(
  'class' => 'form-horizontal',
  'inputDefaults' => array(
    'div' => false,
    'label' => false
  )
);

$page_header = '<h2>' . __('Edit Settings', 1) . '</h2>';

$r =
  '<div class="card settingsForm">' .
    $this->Form->create('User', $defaults) .
    $this->Form->input('id') .

    '<div class="form-group">' .
      '<label for="distance" class="col-sm-2 control-label">' .
        __('First Name', 1) .
      '</label>' .
		  '<div class="col-sm-10">' .
		    $this->Form->input('first_name', array(
          'class' => 'form-control'
        )) .
      '</div>' .
    '</div>' .

    '<div class="form-group">' .
      '<label for="distance" class="col-sm-2 control-label">' .
        __('Last Name', 1) .
      '</label>' .
		  '<div class="col-sm-10">' .
		    $this->Form->input('last_name', array(
          'class' => 'form-control'
        )) .
      '</div>' .
    '</div>' .

    '<div class="btn-toolbar">' .
      $this->Button->set(array(
        'label' => __('Update Settings', 1),
        'size' => 'large',
        'type' => 'submit',
        'use' => 'primary'
      ))->render() .
      $this->Button->set(array(
        'label' => __('Cancel', 1),
        'href' => '/',
        'size' => 'large'
      ))->render() .
    '</div>' .
  '</div>';

echo $r;

$sidebar =
  $this->element('sidebar',
    array(
      'items' => array(
        array(
          'label' => __('Delete', 1),
          'actions' => array('action' => 'delete', $this->Form->value('User.id')),
          null,
          sprintf(__('Are you sure you want to delete # %s?', 1), $this->Form->value('User.id'))
        ),
        array(
          'label' => __('List Shoes', 1),
          'actions' => array('controller' => 'shoes', 'action' => 'index'),
        ),
        array(
          'label' => __('New Shoe', 1),
          'actions' => array('controller' => 'shoes', 'action' => 'add'),
        ),
        array(
          'label' => __('List Workouts', 1),
          'actions' => array('controller' => 'workouts', 'action' => 'index'),
        ),
        array(
          'label' => __('New Workout', 1),
          'actions' => array('controller' => 'workouts', 'action' => 'add'),
        ),
      )
    )
  );

$this->set('page_header', $page_header);
$this->set('sidebar', $sidebar);
