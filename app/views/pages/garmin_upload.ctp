<?php
$this->Include->css(array(
  'app/GarminController',
  'app/Workout',
  'components/Topline'
));
$this->set(
  'page_header',
  '<h2>' . __('Garmin File Uploader', 1) . '</h2>'
);

echo
  '<section class="panel panel-default">' .
    '<div id="reactRoot" class="panel-body">' .
      '<div class="loader loader-lg"></div>' .
    '</div>' .
  '</section>';

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Garmin/GarminFileUploadController.react'
  ], function(reactRender, GarminFileUploadController) {
    reactRender(GarminFileUploadController, {}, 'reactRoot');
  });
";
$this->Html->scriptEnd();
