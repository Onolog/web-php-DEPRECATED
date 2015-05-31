<?php
$this->set('page_classes', array(
  'narrow-page'
));

echo $this->element('loader', array(
  'id' => 'reactRoot'
));

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Pages/PrivacyPage.react',
    'lib/bootstrap.min'
  ], function(reactRender, PrivacyPage) {
    reactRender(PrivacyPage, {}, 'reactRoot');
  });
";
$this->Html->scriptEnd();
