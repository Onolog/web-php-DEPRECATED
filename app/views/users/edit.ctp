<?php

$page_header = '<h2>' . __('Edit User', 1) . '</h2>';

$r =
  '<div class="users form">' .
    $this->Form->create('User') .
      $this->Form->input('id') .
      $this->Form->input('first_name') .
		  $this->Form->input('last_name') .
		  $this->Form->input('email') .
		  $this->Form->input('password') .
    $this->Form->end(__('Submit', 1)) .
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
