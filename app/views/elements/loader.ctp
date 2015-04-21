<?php

/**
 * Simple loader for PHP pages while JS loads
 */ 
$this->Include->css('components/Loader');

echo
  '<div ' .
    (isset($id) ? 'id="'. $id .'" ' : '') .
    (isset($class) ? 'class="' . $class . '"' : '') .
    '>' .
    '<div class="loader loader-lg"></div>' .
  '</div>';
