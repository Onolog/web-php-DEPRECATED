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
    'lib/react/jsx!app/Pages/TermsPage.react',
    'lib/bootstrap.min'
  ], function(reactRender, TermsPage) {
    reactRender(TermsPage, {}, 'reactRoot');
  });
";
$this->Html->scriptEnd();
