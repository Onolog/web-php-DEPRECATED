<?php

$this->Include->css(array(
  'app/Settings',
));
$this->set('page_classes', array('settings'));

$this->set(
  'page_header',
  '<h2 class="clearfix">' .
    __('Settings', 1) .
  '</h2>'
);

echo
  '<div id="reactRoot">' .
    '<div class="loader loader-lg"></div>' .
  '</div>';

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Users/Settings/Settings.react',
    'lib/bootstrap.min'
  ], function(reactRender, Settings) {
    reactRender(Settings, {
      user: $user
    }, 'reactRoot');
  });
";
$this->Html->scriptEnd();
