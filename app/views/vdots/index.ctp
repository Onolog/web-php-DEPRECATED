<?php
$this->Include->css('app/Daniels');
$this->set('page_classes', array('daniels'));

$this->set(
  'page_header',
  '<h2>' . __('Daniels VDOT Resources', 1) . '</h2>'
);

$r = '<div id="reactRoot"></div>';

echo $r;

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'lib/react/jsx!app/Daniels/Daniels.react',
    'utils/reactRender',
  ], function(Daniels, reactRender) {
    reactRender(Daniels, {}, 'reactRoot');
  });
";
$this->Html->scriptEnd();
