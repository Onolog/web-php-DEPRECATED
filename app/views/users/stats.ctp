<?php

$this->Include->css(array(
  'app/Profile',
  'components/Graph',
  'components/Topline'
));
$this->set('page_classes', array('profile'));

$src = 'https://graph.facebook.com/' . $user['User']['id'] . '/picture';
$this->set(
  'page_header',
  '<h2 class="clearfix">' .
    '<div class="userImg">' .
      $this->Html->image($src) .
    '</div>' .
    '<div class="userName">' .
      $user['User']['name'] .
    '</div>' .
  '</h2>'
);

echo
  '<div id="reactRoot">' .
    '<div class="loader loader-lg"></div>' .
  '</div>';

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Users/Stats/Stats.react'
  ], function(reactRender, Stats) {
    reactRender(Stats, {
      shoeCount: $shoe_count,
      totalMiles: $total_miles,
      totalRuns: $total_runs,
      workoutData: $json_workoutData,
      workoutDataByWeek: $json_workoutDataByWeek
    }, 'reactRoot');
  });
";
$this->Html->scriptEnd();
