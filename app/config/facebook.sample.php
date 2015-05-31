<?php
/**
 * Config file for Facebook Platform.
 *
 * Configure the App ID and Secret on individual machines.
 */
define('FB_APP_ID', '');
define('FB_SECRET', '');

$config = array(
  'Facebook' => array(
    'appId'  => FB_APP_ID,
    'secret' => FB_SECRET,
    'status' => true,
    'cookie' => true,
    'locale' => 'en_US'
  )
);
