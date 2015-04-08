<?php
$this->Include->css(array(
  'app/Workout',
  'components/Calendar',
  'components/Topline',
  'token-input-facebook',
));

$page_header = '<h2>' . __('React Component Examples', 1) . '</h2>';
$this->set('page_header', $page_header);

echo '<div id="reactRoot"></div>';

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'lib/react/jsx!controllers/ReactExamplesController.react',
    'utils/reactRender',
  ], function(ReactExamples, reactRender) {
    reactRender(ReactExamples, {}, 'reactRoot');
  });
";
$this->Html->scriptEnd();
