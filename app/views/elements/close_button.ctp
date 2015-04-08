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

if (isset($params)) {
  $params = array_merge(
    array(
      'escape' => false,
      'class'  => 'close'
    ),
    $params
  );

  if (idx($params, 'tooltip')) {
    $params['rel'] = 'tooltip';
    $params['title'] = $params['tooltip'];

    $this->Html->scriptStart(array('inline' => false));
    echo "
      require(['lib/bootstrap.min'], function() {
        $('.close').tooltip();
      });
    ";
    $this->Html->scriptEnd();
  }
}

echo
  $this->Html->link(
    '&times;',
    $link,
    $params,
    $confirmation
  );
