<?php

$defaults = array(
  'class' => 'form-horizontal',
  'inputDefaults' => array(
    'div' => false,
    'label' => false
  )
);

$options = isset($options) ? array_merge($options, $defaults) : $defaults;

$shoe_id = $this->Form->value('Shoe.id');
$cancel_href = $shoe_id ? '/shoes/view/' . $shoe_id : '/shoes';

$brands_sorted = array();
foreach ($brands as $brand) {
  $brands_sorted[$brand['id']] = $brand['name'];
}

$r =
  '<section class="shoeForm panel panel-default">' .
    '<div class="panel-body">' .
      $this->Form->create('Shoe', $defaults) .

        // Brand
        '<div class="form-group">' .
          '<label for="distance" class="col-sm-2 control-label">' .
            __('Brand', 1) .
          '</label>' .
    		  '<div class="col-sm-10">' .
    		    $this->Form->input('id') .
            $this->Form->input(
              'brand_id',
              array(
                'class' => 'form-control',
                'options'  => $brands_sorted,
                'selected' => $this->Form->value('Shoe.brand_id'),
                'empty'    => 'Select a brand:'
              )
            ) .
    		  '</div>' .
    		'</div>' .

        // Model
        '<div class="form-group">' .
          '<label for="distance" class="col-sm-2 control-label">' .
            __('Model', 1) .
          '</label>' .
    		  '<div class="col-sm-10">' .
            $this->Form->input('model', array(
              'class' => 'form-control'
            )) .
    		  '</div>' .
    		'</div>';

  if ($shoe_id) {
    $r .=
        '<div class="form-group">' .
    		  '<div class="col-sm-offset-2 col-sm-10">' .
    		    '<div class="checkbox">' .
      		    '<label>' .
                $this->Form->input('inactive') .
                __('Inactive', 1) .
              '</label>' .
            '</div>' .
    		  '</div>' .
    		'</div>';
  }

  $r .=
      '<div class="btn-toolbar pull-right">' .
        $this->Button->set(array(
          'label' => __('Cancel', 1),
          'href' => $cancel_href,
        ))->render() .
        $this->Button->set(array(
          'label' => $label,
          'type' => 'submit',
          'use' => 'primary'
        ))->render() .
      '</div>' .
    '</div>' .
  '</section>';

echo $r;
