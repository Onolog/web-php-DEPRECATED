<?php
$this->Include->css('workout');
$this->Include->css('daniels');
$this->set('page_classes', array('daniels'));

$result = !empty($paces) ?
  $this->element(
    'daniels_table',
    array('paces' => $paces, 'vdot' => $vdot)
  ) : '';

$page_header = '<h2>' . $title_for_layout . '</h2>';

$r =
  $result .
  $this->Form->create(
    'Vdot',
    array(
      'inputDefaults' => array(
        'div' => false,
        'label' => false
      )
    )
  ) .
    '<fieldset>' .
      '<dl class="form_table">' .

        // Distance
        '<dt>' . __('Distance', 1) . ':</dt>' .
        '<dd class="clear">' .
          $this->Form->input('distances', array(
            'options'  => $distances,
            'selected' => $this->Form->value('distances'),
            'empty'    => 'Select a distance:'
          )) .
        '</dd>' .

        // Time
        '<dt>' . __('Time', 1) . ':</dt>' .
    		'<dd class="clear">' .
    		  '<div class="time">' .
        		$this->Form->input('hh', array(
        		  'options' => range(0, 6),
              'class' => 'hh',
              'maxLength' => 2,
              'placeholder' => 'hh'
        		)) .
        		'<span>:</span>' .
            $this->Form->input('mm', array(
              'options' => range(0, 59),
              'class' => 'mm',
              'maxLength' => 2,
              'placeholder' => 'mm'
        		)) .
        		'<span>:</span>' .
        		$this->Form->input('ss', array(
        		  'options' => range(0, 59),
              'class' => 'ss',
              'maxLength' => 2,
              'placeholder' => 'ss'
        		)) .
      		'</div>' .
        '</dd>' .
    '</fieldset>' .
  $this->Form->end(__('Submit', 1));

echo $r;

$this->set('page_header', $page_header);
