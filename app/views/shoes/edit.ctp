<?php

$page_header =
  '<h2>' . $this->Form->value('Shoe.name') . '</h2>' .
  '<div class="btn-group auxContent">' .
    $this->Html->link(
	    '<span class="glyphicon glyphicon-trash"></span>',
	    array(
        'action' => 'delete',
        $shoe['id']
      ),
	    array(
	     'class' => 'btn btn-default',
	     'rel' => 'tooltip',
	     'title' => __('Delete Shoe', 1),
	     'escape' => false,
      ),
      'Are you sure you want to delete this shoe?'
    ) .
    $this->Html->link(
	    '<span class="glyphicon glyphicon-th"></span>',
      array(
	     'controller' => 'users',
	     'action' => 'shoes'
      ),
	    array(
	     'class' => 'btn btn-default',
	     'rel' => 'tooltip',
	     'title' => __('All Shoes', 1),
	     'escape' => false,
      )
    ) .
  '</div>';

$this->set('page_header', $page_header);


$r =
  $this->element('shoe_fields',
    array(
      'label'  => __('Update Shoe', 1)
    )
  );

echo $r;


$this->Html->scriptStart(array('inline' => false));
echo "
  require(['lib/bootstrap.min'], function() {
    $('.btn').tooltip({ container: 'body' });
  });
";
$this->Html->scriptEnd();
