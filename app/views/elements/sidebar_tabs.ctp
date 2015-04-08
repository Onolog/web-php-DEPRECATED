<?php

/**
 * Renders the filters for the log sidebar.
 */
$this->Include->css('sidebar_summary');

$filters = array(
  array(
    'name' => 'Mileage',
    'selected'  => 1
  ),
  array(
    'name' => 'Shoes'
  ),
  array(
    'name' => 'Friends'
  ),
);

$r = '<ul id="filters" class="clearfix">';

foreach ($filters as $filter) {
  $id = strtolower($filter['name']);
  $class = idx($filter, 'selected') ? ' class="selected"' : '';

  $r .= '<li id ="' . $id . '"'.$class.'>'
     .    $this->Html->link($filter['name'], '#')
     .  '</li>';
}
$r .= '</ul>';

echo $r;

$this->Html->scriptStart(array('inline' => false));
echo "
  require(['lib/bootstrap.min'], function() {
    $('#sidebar a').click(function() {
      toggle_sidebar(this.parentNode);
    });
  });
";
$this->Html->scriptEnd();
