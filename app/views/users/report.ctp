<?php
$this->Include->css(array(
  'app/Report',
  'components/Graph',
  'components/Topline',
));
$this->set('page_classes', array('report'));

// Page header
$this->set(
  'page_header',
  '<div>' .
    '<h2>' . date('Y', $start_date) . ' In Miles' . '</h2>' .
    // '<h2>' . $user['User']['name'] . '</h2>' .
  '</div>'
);

// Page content
echo
  '<div id="reactRoot">' .
    '<section class="panel panel-default">' .
      '<div class="panel-body">' .
        '<div class="loader loader-lg">' .
        '</div>' .
      '</div>' .
    '</section>' .
  '</div>';

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'lib/react/jsx!app/Users/Report/Report.react',
    'utils/reactRender',
  ], function(Report, reactRender) {
    reactRender(Report, {
      runExtremes: $json_extremes,
      shoeCount: $shoe_count,
      topBrand: $top_brand,
      topFriends: $json_friends,
      totalMiles: $total_miles,
      totalRuns: $total_runs,
      totalTime: $total_time,
      workoutData: $json_workoutData,
      workoutDataByWeek: $json_workoutDataByWeek
    }, 'reactRoot');
  });
";
$this->Html->scriptEnd();
