<?php
/**
 * Displays a list of all the user's shoes
 */
$this->Include->css(array(
  //'app/Friends'
));
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
    'lib/react/jsx!app/Users/Friends/Friends.react'
  ], function(reactRender, Friends) {
    reactRender(Friends, {}, 'reactRoot');
  });
";
$this->Html->scriptEnd();
