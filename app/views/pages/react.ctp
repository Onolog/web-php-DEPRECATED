<?php
$this->Include->css(array(
  'app/Activity',
  'app/Workout',
  'components/Calendar',
  'components/Facepile',
  'components/Topline',
  'token-input-facebook',
));

echo $this->element('loader', array(
  'id' => 'reactRoot'
));

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
