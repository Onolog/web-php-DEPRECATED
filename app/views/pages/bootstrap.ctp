<?php
$this->layout = 'basic';

echo $this->element('loader', array(
  'id' => 'reactRoot'
));

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'lib/react/jsx!app/Pages/BootstrapPage.react',
    'utils/reactRender',
  ], function(BootstrapPage, reactRender) {
    reactRender(BootstrapPage, {}, 'reactRoot');
  });
";
$this->Html->scriptEnd();
