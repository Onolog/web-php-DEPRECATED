<?php

/**
 * View for the main login page
 */
$this->Include->css('login');
$this->set('page_classes', 'login');

// Create the FB login button
$button = $facebook->login(array(
  'label' => 'Sign in with Facebook',
  'size' => 'large',
  'scope' => 'email,user_online_presence,offline_access',
));

// If for some reason the user is logged into FB and not
// automatically redirected, display the logout button
if (isset($fb_user['id'])) {
  $button = $facebook->logout(array(
    'size' => 'large',
    'label' => 'Sign Out',
    'redirect' => array(
      'controller' => 'users',
      'action' => 'logout'
    )
  ));
}

$r =
  '<div class="clearfix">' .
    '<div class="headline">' .
      __('Yet another run logging app...', 1) .
    '</div>' .
    '<div class="login_button">' .
      $button .
    '</div>' .
  '</div>' .
  
  // FB Facepile
  '<div class="fb_facepile">' .
    '<iframe src="http://www.facebook.com/plugins/facepile.php?' .
      'app_id=192729344110082&amp;' .
      'size=small&amp;' .
      'width=400&amp;' .
      'max_rows=1&amp;' .
      'colorscheme=light" '.
      'scrolling="no" ' .
      'frameborder="0" ' .
      'style="border:none; overflow:hidden; width:400px; height:125px;" ' .
      'allowTransparency="true">' .
    '</iframe>' .
  '</div>';

echo $r;
