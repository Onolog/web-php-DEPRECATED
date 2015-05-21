<?php

$this->Include->css(array(
  'app/Settings',
));
$this->set('page_classes', array(
  'settings',
  'narrow-page'
));

$this->set(
  'page_header',
  '<h2 class="clearfix">' .
    __('Settings', 1) .
  '</h2>'
);

echo $this->element('loader', array(
  'id' => 'reactRoot'
));

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Users/Settings/Settings.react'
  ], function(reactRender, Settings) {
    reactRender(Settings, {
      user: $json_user
    }, 'reactRoot');
  });
";
$this->Html->scriptEnd();
