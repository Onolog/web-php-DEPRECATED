<?php
$this->Include->css(array(
  'app/Activity',
  'app/Workout',
  'components/Calendar',
  'components/Datepicker',
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
    'lib/react/jsx!app/Pages/ReactPage.react',
    'utils/reactRender',
  ], function(ReactPage, reactRender) {
    reactRender(ReactPage, {}, 'reactRoot');
  });
";
$this->Html->scriptEnd();
