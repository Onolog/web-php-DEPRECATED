<?php
/**
 * This file is loaded automatically by the app/webroot/index.php file after the core bootstrap.php
 *
 * This is an application wide file to load any function that is not used within a class
 * define. You can also use this to include or require any files in your application.
 *
 * PHP versions 4 and 5
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright 2005-2010, Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright 2005-2010, Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       cake
 * @subpackage    cake.app.config
 * @since         CakePHP(tm) v 0.10.8.2117
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 */

/** 
 * Define default calendar type
 * 0 or CAL_GREGORIAN - Gregorian Calendar
 * 1 or CAL_JULIAN    - Julian Calendar
 * 2 or CAL_JEWISH    - Jewish Calendar
 * 3 or CAL_FRENCH    - French Revolutionary Calendar
 */
define('CALENDAR_TYPE', 0);

/**
 * Date format for displaying a given month in the calendar view.
 */
define('CALENDAR_URI_FORMAT', '/Y/m/');

/**
 * Google Analytics ID
 */
define('GOOGLE_ANALYTICS_CODE', 'UA-5839822-1');

/**
 * Garmin Communicator API Key
 */
define('GARMIN_API_KEY', '2b3f4a3a13900af73dd5a19c1c8f77e3');

/**
 * Google API Key
 * https://code.google.com/apis/console/?pli=1#project:227714135206:access
 */
define('GOOGLE_API_KEY', 'AIzaSyBI2oBuFbYuvwmHpNrQGjvmg7r-eIFKtEM');

/**
 * The settings below can be used to set additional paths to models, views and controllers.
 * This is related to Ticket #470 (https://trac.cakephp.org/ticket/470)
 *
 * App::build(array(
 *     'plugins' => array('/full/path/to/plugins/', '/next/full/path/to/plugins/'),
 *     'models' =>  array('/full/path/to/models/', '/next/full/path/to/models/'),
 *     'views' => array('/full/path/to/views/', '/next/full/path/to/views/'),
 *     'controllers' => array('/full/path/to/controllers/', '/next/full/path/to/controllers/'),
 *     'datasources' => array('/full/path/to/datasources/', '/next/full/path/to/datasources/'),
 *     'behaviors' => array('/full/path/to/behaviors/', '/next/full/path/to/behaviors/'),
 *     'components' => array('/full/path/to/components/', '/next/full/path/to/components/'),
 *     'helpers' => array('/full/path/to/helpers/', '/next/full/path/to/helpers/'),
 *     'vendors' => array('/full/path/to/vendors/', '/next/full/path/to/vendors/'),
 *     'shells' => array('/full/path/to/shells/', '/next/full/path/to/shells/'),
 *     'locales' => array('/full/path/to/locale/', '/next/full/path/to/locale/')
 * ));
 *
 */

/**
 * As of 1.3, additional rules for the inflector are added below
 *
 * Inflector::rules('singular', array('rules' => array(), 'irregular' => array(), 'uninflected' => array()));
 * Inflector::rules('plural', array('rules' => array(), 'irregular' => array(), 'uninflected' => array()));
 */


/**
 *  Identity function. Mostly useful idiomatically, because this doesn't
 *  compile:
 *
 *    new ClassName()->methodName();
 *
 *  ...but this works fine:
 *
 *    id(new ClassName())->method();
 *
 *  PHP is a pretty stupid language.
 *
 *  @param    Value to return.
 *  @return   The passed value.
 */
function id($x) {
  return $x;
}

/**
 *  Returns $arr[$idx], because php doesn't let you index into
 *  arrays returned from a function.
 *
 *  a()[0] doesn't work
 *
 *  idx(a(), 0) does.
 *
 *  PHP is a pretty stupid language.
 *
 *  @param    array to index into
 *  @param    index. if negative, start at the end.
 *  @param    default to return if $arr[$idx] is not set
 *  @return   array[index]
 */
function idx($arr, $idx, $default=null) {
  if ($idx === null || !is_array($arr)) {
    return $default;
  }
  $idx = $idx >= 0 ? $idx : count($arr) + $idx;
  return array_key_exists($idx, $arr) ? $arr[$idx] : $default;
}


/**
 * Takes a time in seconds and calculates the hours, minutes and seconds.
 * Returns an array with h:mm:ss (no leading zero for hours):
 *
 *    3273 -> array(0, 54, 33)
 *
 * @param   int   $seconds
 * @returns arr
 */
function sec_to_time($seconds) {
  $time = array(
    'hh' => 0,
    'mm' => 0,
    'ss' => 0
  );
  
  if (is_numeric($seconds)) {
    $time['hh'] = (int) ($seconds / 3600);
    $time['mm'] = (int) date('i', $seconds);
    $time['ss'] = (int) date('s', $seconds);
  }

  // Pad minutes and seconds with a leading zero
  foreach ($time as $key => $unit) {
    if ($key !== 'hh') {
      $time[$key] = add_leading_zero($unit);
    }
  }

  return $time;
}

/**
 * Takes an array of hours/mins/secs and converts to seconds
 *
 * @param   arr   $time = array($hours, $minutes, $seconds)
 * @return  int
 */
function time_to_sec($time) {
  return (int)($time[0]*3600 + $time[1]*60 + $time[2]);
}

/**
 * Takes an array of hh/mm/ss and formats as a string: 'hh:mm:ss'
 *
 * @param   arr   $time
 * @returns str
 */
function format_time($time) {
  $time = sec_to_time($time);

  if ($time['hh'] === 0) {
    unset($time['hh']);
  }

  // Add leading zeroes. Don't add them for the first unit of time
  // Ie: 1:22:18 or 9:44
  $time = array_values($time);
  foreach ($time as $key => $unit) {
    // Skip the first value
    if ($key) {
      $time[$key] = add_leading_zero($unit);
    }
  }
  return implode(':', $time);
}

/**
 * Convenience wrapper for adding leading zeroes to time or distance
 *
 * @param  numeric  $num
 */
function add_leading_zero($num) {
  if (!is_numeric($num)) {
    return $num;
  }
  return str_pad($num, 2, '0', STR_PAD_LEFT);
}

/**
 * Retrieve a user's settings and see if they are set to miles or km.
 * Default to miles
 *
 * TODO: Connect this to user settings
 *
 * @return  bool  true for miles, false for km
 */
function distance_in_miles() {
  return true;
}

/**
 * 
 */
function get_home_uri($date=null) {
  return date('/Y/m/');
}
