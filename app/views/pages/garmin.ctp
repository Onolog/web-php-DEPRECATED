<?php
$this->Include->css('app/GarminController');
$this->set(
  'page_header',
  '<h2>' . __('Garmin Communicator', 1) . '</h2>'
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
    'lib/react/jsx!app/Garmin/GarminConnectController.react'
  ], function(reactRender, GarminConnectController) {
    reactRender(GarminConnectController, {}, 'reactRoot');
  });
";
$this->Html->scriptEnd();
