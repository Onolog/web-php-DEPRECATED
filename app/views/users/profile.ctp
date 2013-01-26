<?php

$this->Include->css('profile');
$this->Chart->setWorkouts($workouts);
$this->set('page_classes', array('profile'));

$src = 'https://graph.facebook.com/' . $user['User']['id'] . '/picture';

$page_header =
  '<h2 class="clearfix">' .
    '<div class="user_img">' .
      $this->Html->image($src) .
    '</div>' .
    '<div class="user_name">' .
      $user['User']['name'] .
    '</div>' .
  '</h2>';

$r =
  '<div id="summary" class="clearfix">' .

    // Render the topline summary of the user's data
    $this->element('topline',
      array(
        'stats' => array(
          'Miles' => number_format(array_sum($workouts['day']), 2),
          'Runs'  => number_format(count($workouts['runs'])),
          'Shoes' => $shoe_count
        )
      )
    ) .
  '</div>' .  
  $this->Chart->render();

echo $r;

$this->set('page_header', $page_header);
