<?php
/**
 * Close Button element
 * /app/views/elements/close_button.ctp
 *
 * Renders a link to close or delete items
 *
 * @param   $link
 * @param   $confirmation
 */

if (!isset($confirmation)) {
  $confirmation = null;
}

echo
  $this->Html->link(
    '&times;',
    $link,
    array(
      'escape' => false,
      'class'  => 'close_button'
    ),
    $confirmation
  );
