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
 * Facebook Platform App ID
 *
 * https://developers.facebook.com/apps/192729344110082
 */
define('FB_APP_ID', '192729344110082');
define('FB_SECRET', '756380338bb32d062402d8aea5b1a352');

/**
 * Google Analytics ID
 */
define('GOOGLE_ANALYTICS_CODE', 'UA-5839822-1');

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
    'hh' => (int) ($seconds / 3600),
    'mm' => (int) date('i', $seconds),
    'ss' => (int) date('s', $seconds)
  );

  // Pad minutes and seconds with a leading zero
  foreach ($time as $key => $unit) {
    if ($key != 'hh') {
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
 * Convenience wrapper for displaying distances
 *
 * @param   float   $distance
 * @param   int     $show_units
 */
function render_distance($distance, $show_units=0) {
  switch($show_units) {
    case 1:
      // Non-abbreviated: "miles"
      $units = render_units($distance, 0);
      break;
    case 2:
      // Abbreviated: "mi"
      $units = render_units($distance, 1);
      break;
    case 0:
    default:
      $units = '';
      break;
  }
  return
    '<span class="distance">' .
      format_distance($distance) .
    '</span>' . $units;
}

/**
 *  Converts the distance from miles to km if applicable
 *  Strips extra zeroes (and decimal, if necessary)
 */
function format_distance($distance) {
  if (!$distance) {
    return '0';
  }

  // Convert to km if necessary
  if (!distance_in_miles()) {
    $distance = miles_to_km($distance);
  }

  // Split the whole miles/km from the fractional part
  $parts = explode('.', $distance);
  $whole = $parts[0];

  $frac = '';
  if (isset($parts[1])) {
    // Remove trailing 0's from the fractional portion
    $frac = rtrim($parts[1], '0');
  }

  return ($frac ? ($whole . '.' . $frac) : $whole);
}

/**
 * Calculates pace of the workout (distance/time)
 *
 * @param   int     $time       Time in seconds
 * @param   float   $distance   Distance in miles
 *
 * @returns str     pace
 */
function calculate_pace($time, $distance) {
  // Default pace is zero
  $pace = '0:00';

  if ($distance && $distance != 0 && $time != 0) {
  
    // Find the pace in minutes
    $p = $time/($distance*60);

    // Split the whole minutes from the fraction
    $p_arr = explode('.', $p);

    // Convert from fractions of a minute to seconds
    // and round to the nearest whole second
    $seconds = 0;
    if (isset($p_arr[1])) {
      $seconds = round(('.'.$p_arr[1]) * 60);
    }

    // If there are less than 10 seconds, add a leading zero
    $seconds = add_leading_zero($seconds);
    $minutes = $p_arr[0];

    // When seconds get rounded up to 60, it displays 60 instead of an extra
    // minute. Fix this.
    if ($seconds == 60) {
      $seconds = '00';
      $minutes++;
    }
    $pace = $minutes . ':' . $seconds;
  } 
  return $pace;
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
 *  Displays the unit of measure for distances, either in miles or km
 *  
 *  @param  int     The function takes the following args:
 *                    0 = Abbreviated: "m" or "km" (Default)
 *                    1 = Plural: "miles" or "kilometers"
 *                    2 = Singular: "mile" or "kilometer"
 *  @return string
 */
function render_units($distance, $abbreviate=false) {
  $use_miles = distance_in_miles();

  if ($abbreviate) {
    return $use_miles ? ' mi' : ' km';
  }

  // Use the singular form if it's only 1 mile or kilometer
  if ($distance == 1) {
    $units = $use_miles ? 'mile' : 'kilometer';
  } else {
    $units = $use_miles ? 'miles' : 'kilometers';
  }

  // Add a space in front of the units if we're not abbreviating
  return ' '.$units;
}

// Converts distances from kilometers to miles
function km_to_miles($distance) {
  return ($distance/1.609344);
}

// Converts distances from miles to kilometers
function miles_to_km($distance) {
  return ($distance*1.609344);
}

/**
 * 
 */
function get_home_uri($date=null) {
  return date('/Y/m/');
}

/**
 * Truncate a given string to the desired length
 *
 * @param   str   $text
 * @param   int   $length
 */
function truncate_text($text, $length=20) {
  if (strlen($text) > $length) {
    $text = trim(substr($text, 0, $length)) . '...';
  }
  return $text;
}

function render_middot() {
  return '<span class="middot">&middot;</span>';
}

/**
 * Helper function for creating an array of sequential numbers, up to a
 * certain amount. Can also be padded to have 01, 02... instead of 1, 2...
 * Useful for time or date dropdowns
 *
 * @param     int   $max_val    The max number to display
 * @param     bool  $pad        Whether to add leading zeroes or not
 * @returns   arr
 */
function create_numeric_array($max_val, $pad=true) {
  $list = array();
  for ($i=0; $i<=$max_val; $i++) {
    $i_val = $i;
    if ($i_val<10 && $pad) {
      $i_val = add_leading_zero($i);
    }
    $list[$i] = $i_val;
  }
  return $list;
}
