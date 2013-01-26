<?php
$this->Include->css('workout');
$this->Include->js('workout');

$r =
  $this->Form->create('Workout', $options) .
    '<fieldset>' .
      '<dl class="form_table">' .

        // Distance
        '<dt class="data">' . __('Distance', 1) . ':</dt>' .
  		  '<dd class="clear">' .
  		    $this->Form->input('distance',
  		      array('class' => 'distance')
  		    ) .
  		    '<span>miles</span>' .
  		  '</dd>' .

        // Time
        '<dt class="data">' . __('Time', 1) . ':</dt>' .
    		'<dd class="clear">' .
    		  '<div class="time">' .
        		$this->Form->input('hh', array(
              'class' => 'hh',
              'maxLength' => 2,
              'placeholder' => 'hh'
        		)) .
        		'<span>:</span>' .
            $this->Form->input('mm', array(
              'class' => 'mm',
              'maxLength' => 2,
              'placeholder' => 'mm'
        		)) .
        		'<span>:</span>' .
        		$this->Form->input('ss', array(
              'class' => 'ss',
              'maxLength' => 2,
              'placeholder' => 'ss'
        		)) .
        		'<span id="pace"><span></span>per mile</span>' .
      		'</div>' .
        '</dd>' .

        // Shoes
        '<dt>' . __('Shoes', 1) . ':</dt>' .
        '<dd class="clear">' .
          $this->Form->input('shoe_id',
            array(
              'options'  => $shoes,
              'selected' => $this->Form->value('shoe_id'),
              'empty'    => 'Select shoes:'
            )
          ) .
        '</dd>' .

        // Friends
        '<dt class="data">' . __('Friends', 1) . ':</dt>' .
        '<dd class="clear">' .
          $this->element('friend_typeahead') .
        '</dd>' .

        // Notes
        '<dt>' . __('Notes', 1) . ':</dt>' .
        '<dd class="clear">' . 
    		  $this->Form->input('notes', array(
    		    'class' => 'notes'
    		  )) .
    		'</dd>' .

        // Date
  		  $this->Form->input(
  		    'date',
  		    array('type' => 'hidden')
  		  ) .
    '</fieldset>' .
  '<div class="btn-toolbar">' .
    $this->Form->submit(
      $label,
      array(
        'div' => false,
        'class' => 'btn btn-primary'
      )
    ) .
    $this->Html->link(
      __('Cancel', 1),
      get_home_uri(),
      array('class' => 'btn')
    ) .
  '</div>';

echo $r;

$this->Html->scriptStart(array('inline' => false));
echo '
  $(document).ready(function() {
    calculate_pace();
    $("dd input").blur(function() {
      calculate_pace();
    });
  });
';
$this->Html->scriptEnd();

