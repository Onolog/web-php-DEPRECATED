<?php
$this->Include->css('workout');

$defaults = array(
  'class' => 'form-horizontal workoutForm',
  'inputDefaults' => array(
    'div' => false,
    'label' => false
  )
);

$options = isset($options) ? array_merge($options, $defaults) : $defaults;

$r =
  $this->Form->create('Workout', $options) .
  // Distance
  '<div class="form-group">' .
    '<label for="distance" class="col-sm-2 control-label">' .
      __('Distance', 1) .
    '</label>' .
	  '<div class="col-sm-10">' .
	    $this->Form->input('distance',
	      array('class' => 'distance form-control')
	    ) .
	    '<span class="colon">miles</span>' .
	  '</div>' .
	'</div>' .

  // Time
  '<div class="form-group">' .
    '<label class="col-sm-2 control-label">' .
      __('Time', 1) .
    '</label>' .
		'<div class="col-sm-10">' .
		  '<div class="time">' .
    		$this->Form->input('hh', array(
          'class' => 'hh form-control',
          'maxLength' => 2,
          'placeholder' => 'hh'
    		)) .
    		'<span class="colon">:</span>' .
        $this->Form->input('mm', array(
          'class' => 'mm form-control',
          'maxLength' => 2,
          'placeholder' => 'mm'
    		)) .
    		'<span class="colon">:</span>' .
    		$this->Form->input('ss', array(
          'class' => 'ss form-control',
          'maxLength' => 2,
          'placeholder' => 'ss'
    		)) .
    		'<span id="pace" class="colon">' .
    		  '<span></span>' .
    		  ' per mile' .
    		'</span>' .
  		'</div>' .
    '</div>' .
  '</div>' .

  // Shoes
  '<div class="form-group">' .
    '<label for="shoe_id" class="col-sm-2 control-label">' .
      __('Shoes', 1) .
    '</label>' .
    '<div class="col-sm-10">' .
      $this->Form->input('shoe_id',
        array(
          'options'  => $shoes,
          'selected' => $selectedShoeID,
          'empty'    => 'Select shoes:',
          'class' => 'form-control'
        )
      ) .
    '</div>' .
  '</div>' .

  // Friends
  '<div class="form-group">' .
    '<label class="col-sm-2 control-label">' .
      __('Friends', 1) .
    '</label>' .
    '<div class="col-sm-10">' .
      $this->element('friend_typeahead') .
    '</div>' .
  '</div>' .

  // Notes
  '<div class="form-group">' .
    '<label class="col-sm-2 control-label">' .
      __('Notes', 1) .
    '</label>' .
    '<div class="col-sm-10">' .
		  $this->Form->input('notes', array(
		    'class' => 'notes form-control',
		    'placeholder' => 'Notes'
		  )) .
		'</div>' .
  '</div>'  .

  // Date
  $this->Form->input(
    'date',
    array('type' => 'hidden')
  );

echo $r;

$this->Html->scriptStart(array('inline' => false));
echo "
  require(['Workout'], function(Workout) {
    workout = new Workout();
    workout.init();
  });
";
$this->Html->scriptEnd();
