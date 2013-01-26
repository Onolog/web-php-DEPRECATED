<?php
/**
 * Add a run
 *
 * Path: /views/runs/add.ctp
 */
$this->Include->css('workout');
$this->Include->js('workout');

$options = array(
  'url' => '/runs/add/' . $date,
  'inputDefaults' => array(
    'div' => false,
    'label' => false
  )
);
$end = __('Add Run', true);

$r =
  // '<h2>' . $title . '</h2>' .
  '<h2>This is a sweet new Run</h2>' .

  $this->Form->create('Run', $options) .
    '<fieldset>' .
      '<dl class="form_table">' .

        // Distance
        '<dt class="data">' . __('Distance', 1) . ':</dt>' .
  		  '<dd class="clear">' .
  		    $this->Form->input('RunDetail.distance',
  		      array('class' => 'distance')
  		    ) .
  		    '<span>miles</span>' .
  		  '</dd>' .

        // Time
        '<dt class="data">' . __('Time', 1) . ':</dt>' .
    		'<dd class="clear">' .
    		  '<div class="time">' .
        		$this->Form->input('RunDetail.hh', array(
              'class' => 'hh',
              'maxLength' => 2,
              'placeholder' => 'hh'
        		)) .
        		'<span>:</span>' .
            $this->Form->input('RunDetail.mm', array(
              'class' => 'mm',
              'maxLength' => 2,
              'placeholder' => 'mm'
        		)) .
        		'<span>:</span>' .
        		$this->Form->input('RunDetail.ss', array(
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
          $this->Form->input('RunDetail.shoe_id',
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
    		  $this->Form->input('RunDetail.notes', array(
    		    'class' => 'notes'
    		  )) .
    		'</dd>' .

    '</fieldset>' .
  $this->Form->end($end);

echo $r;


$this->Html->scriptStart(array('inline' => false));
echo '
  $(document).ready(function () {
    calculate_pace();
    $("dd input").blur(function() {
      calculate_pace();
    });
  });
';
$this->Html->scriptEnd();
