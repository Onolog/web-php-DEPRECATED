<?php
$this->Include->css('app/Daniels');
$this->set('page_classes', array('daniels'));

$this->set(
  'page_header',
  '<h2>' . __('Daniels VDOT Resources', 1) . '</h2>'
);

echo $this->element('loader', array(
  'id' => 'reactRoot'
));

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
