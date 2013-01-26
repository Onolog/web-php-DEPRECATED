<?php
/**
 * User Entity Element
 * Renders a standard component consisting of the user's photo, name,
 * and some metadata or actions.
 *
 * File: /app/views/elements/user_entity.ctp
 *
 * @param   arr   $user
 * @param   arr   $metadata   optional actions/metadata associated with user
 */
$this->Include->css('user_entity'); // Why isn't this working?

$src = 'https://graph.facebook.com/'. $user['id'] .'/picture';
$profile_url = array(
  'ajax' => false, // Don't add ajax prefix
  'controller' => 'users',
  'action' => 'profile',
  $user['id']
);

$r =
  '<div class="user_entity clearfix">' .
    $this->Html->image($src, array(
      'url' => $profile_url,
      'class' => 'user_image'
    )) .
    $this->Html->link(
      $user['name'],
      $profile_url,
      array('class' => 'user_name')
    );

if (isset($metadata) && !empty($metadata)) {
  $r .= '<ul class="user_metadata clearfix">';
  foreach ($metadata as $item) {
    $r .= '<li>' . $item . '</li>';
  }
  $r .= '</ul>';
}

$r .=   '</div>';

echo $r;
