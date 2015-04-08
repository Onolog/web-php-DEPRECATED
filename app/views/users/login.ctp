<?php
/**
 * View for the main login page
 */
$this->Include->css('app/Login');
$this->set('page_classes', 'login');

$r =
  '<div id="reactRoot">' .
    '<div class="jumbotronContainer">' .
      '<div class="loader loader-lg full"></div>' .
      '<div class="bgImage"></div>' .
    '</div>' .
  '</div>';

echo $r;

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Users/Login/Login.react',
  ], function(reactRender, Login) {
    reactRender(Login, {}, 'reactRoot');
  });
";
$this->Html->scriptEnd();
