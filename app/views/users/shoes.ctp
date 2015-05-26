<?php
/**
 * Displays a list of all the user's shoes
 */
$this->Include->css(array(
  'app/Activity',
  'app/Shoe',
  'components/Topline'
));
$this->set('page_classes', array(
  'narrow-page'
));

echo $this->element('loader', array(
  'id' => 'reactRoot'
));

// Set JS for the page
$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Shoes/ShoesPage.react'
  ], function(reactRender, ShoesPage) {
    reactRender(ShoesPage, {}, 'reactRoot');
  });
";
$this->Html->scriptEnd();
