<style>
/**
 * Inline the styles since this is the only server-side component that needs
 * CSS.
 */
.react-loader {
  background-image: url('/img/loaders/spinner-large-bgLight-2x.gif');
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: 24px;
  display: block;
  min-height: 200px;
}
</style>

<?php
/**
 * Simple loader for PHP pages while JS loads
 */
echo
  '<div ' .
    (isset($id) ? 'id="'. $id .'" ' : '') .
    (isset($class) ? 'class="' . $class . '"' : '') .
    '>' .
    '<div class="react-loader"></div>' .
  '</div>';
