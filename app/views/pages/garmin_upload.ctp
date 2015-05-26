<?php
$this->Include->css(array(
  'app/Activity',
  'components/Facepile',
  'components/Topline'
));
$this->set('page_classes', array(
  'narrow-page',
));

$this->set(
  'page_header',
  '<h2>' . __('Garmin File Uploader', 1) . '</h2>'
);

echo $this->element('loader', array(
  'id' => 'reactRoot'
));

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
