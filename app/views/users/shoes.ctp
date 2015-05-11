<?php
/**
 * Displays a list of all the user's shoes
 */
$this->Include->css(array(
  'app/Shoe',
  'components/Topline'
));

echo $this->element('loader', array(
  'id' => 'reactRoot'
));

// Set JS for the page
$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Shoes/ShoesPage.react',
    'lib/bootstrap.min'
  ], function(reactRender, ShoesPage) {
    reactRender(ShoesPage, {}, 'reactRoot');
  });
";
$this->Html->scriptEnd();
