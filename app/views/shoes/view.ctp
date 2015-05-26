<?php
$this->Include->css(array(
  'app/Activity',
  'app/Shoe',
  'components/Topline'
));
$this->set('page_classes', array('narrow-page'));

echo $this->element('loader', array(
  'id' => 'reactRoot'
));

$this->Html->scriptStart(array('inline' => false));
echo "
  require([
    'utils/reactRender',
    'lib/react/jsx!app/Shoes/ShoeViewPage.react'
  ], function(reactRender, ShoeViewPage) {
    reactRender(ShoeViewPage, {
      canEdit: $can_edit,
      shoe: $shoe
    }, 'reactRoot');
  });
";
$this->Html->scriptEnd();
