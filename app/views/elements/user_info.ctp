<?php

$r = '';
$user = $this->Session->read('Auth.User');

if ($user) {

  $logout_link =
    $facebook->logout(array(
      'label' => 'Sign Out',
      'redirect' => array(
        'controller' => 'users',
        'action' => 'logout'
    )));

  $r =
    '<div class="user_info">' .
      $this->element('user_entity', array(
        'user'     => $user,
        'metadata' => array($logout_link)
      )) .
    '</div>';

}

echo $r;
