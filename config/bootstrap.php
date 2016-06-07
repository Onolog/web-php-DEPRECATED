<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @since         0.10.8
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

// You can remove this if you are confident that your PHP version is sufficient.
if (version_compare(PHP_VERSION, '5.5.9') < 0) {
    trigger_error('You PHP version must be equal or higher than 5.5.9 to use CakePHP.', E_USER_ERROR);
}

// You can remove this if you are confident you have intl installed.
if (!extension_loaded('intl')) {
    trigger_error('You must enable the intl extension to use CakePHP.', E_USER_ERROR);
}

// You can remove this if you are confident you have mbstring installed.
if (!extension_loaded('mbstring')) {
    trigger_error('You must enable the mbstring extension to use CakePHP.', E_USER_ERROR);
}

/**
 * Configure paths required to find CakePHP + general filepath
 * constants
 */
require __DIR__ . '/paths.php';

// Use composer to load the autoloader.
require ROOT . DS . 'vendor' . DS . 'autoload.php';

/**
 * Bootstrap CakePHP.
 *
 * Does the various bits of setup that CakePHP needs to do.
 * This includes:
 *
 * - Registering the CakePHP autoloader.
 * - Setting the default application paths.
 */
require CORE_PATH . 'config' . DS . 'bootstrap.php';

use Cake\Cache\Cache;
use Cake\Console\ConsoleErrorHandler;
use Cake\Core\App;
use Cake\Core\Configure;
use Cake\Core\Configure\Engine\PhpConfig;
use Cake\Core\Plugin;
use Cake\Database\Type;
use Cake\Datasource\ConnectionManager;
use Cake\Error\ErrorHandler;
use Cake\Log\Log;
use Cake\Mailer\Email;
use Cake\Network\Request;
use Cake\Routing\DispatcherFactory;
use Cake\Utility\Inflector;
use Cake\Utility\Security;

/**
 * Read configuration file and inject configuration into various
 * CakePHP classes.
 *
 * By default there is only one configuration file. It is often a good
 * idea to create multiple configuration files, and separate the configuration
 * that changes from configuration that does not. This makes deployment simpler.
 */
try {
    Configure::config('default', new PhpConfig());
    Configure::load('app', 'default', false);
} catch (\Exception $e) {
    exit($e->getMessage() . "\n");
}

// Load an environment local configuration file.
// You can use a file like app_local.php to provide local overrides to your
// shared configuration.
//Configure::load('app_local', 'default');

// When debug = false the metadata cache should last
// for a very very long time, as we don't want
// to refresh the cache while users are doing requests.
if (!Configure::read('debug')) {
    Configure::write('Cache._cake_model_.duration', '+1 years');
    Configure::write('Cache._cake_core_.duration', '+1 years');
}

/**
 * Set server timezone to UTC. You can change it to another timezone of your
 * choice but using UTC makes time calculations / conversions easier.
 */
date_default_timezone_set('UTC');

/**
 * Configure the mbstring extension to use the correct encoding.
 */
mb_internal_encoding(Configure::read('App.encoding'));

/**
 * Set the default locale. This controls how dates, number and currency is
 * formatted and sets the default language to use for translations.
 */
ini_set('intl.default_locale', Configure::read('App.defaultLocale'));

/**
 * Register application error and exception handlers.
 */
$isCli = PHP_SAPI === 'cli';
if ($isCli) {
    (new ConsoleErrorHandler(Configure::read('Error')))->register();
} else {
    (new ErrorHandler(Configure::read('Error')))->register();
}

// Include the CLI bootstrap overrides.
if ($isCli) {
    require __DIR__ . '/bootstrap_cli.php';
}

/**
 * Set the full base URL.
 * This URL is used as the base of all absolute links.
 *
 * If you define fullBaseUrl in your config file you can remove this.
 */
if (!Configure::read('App.fullBaseUrl')) {
    $s = null;
    if (env('HTTPS')) {
        $s = 's';
    }

    $httpHost = env('HTTP_HOST');
    if (isset($httpHost)) {
        Configure::write('App.fullBaseUrl', 'http' . $s . '://' . $httpHost);
    }
    unset($httpHost, $s);
}

Cache::config(Configure::consume('Cache'));
ConnectionManager::config(Configure::consume('Datasources'));
Email::configTransport(Configure::consume('EmailTransport'));
Email::config(Configure::consume('Email'));
Log::config(Configure::consume('Log'));
Security::salt(Configure::consume('Security.salt'));

/**
 * The default crypto extension in 3.0 is OpenSSL.
 * If you are migrating from 2.x uncomment this code to
 * use a more compatible Mcrypt based implementation
 */
//Security::engine(new \Cake\Utility\Crypto\Mcrypt());

/**
 * Setup detectors for mobile and tablet.
 */
Request::addDetector('mobile', function ($request) {
    $detector = new \Detection\MobileDetect();
    return $detector->isMobile();
});
Request::addDetector('tablet', function ($request) {
    $detector = new \Detection\MobileDetect();
    return $detector->isTablet();
});

/**
 * Custom Inflector rules, can be set to correctly pluralize or singularize
 * table, model, controller names or whatever other string is passed to the
 * inflection functions.
 *
 * Inflector::rules('plural', ['/^(inflect)or$/i' => '\1ables']);
 * Inflector::rules('irregular', ['red' => 'redlings']);
 * Inflector::rules('uninflected', ['dontinflectme']);
 * Inflector::rules('transliteration', ['/å/' => 'aa']);
 */

/**
 * Plugins need to be loaded manually, you can either load them one by one or all of them in a single call
 * Uncomment one of the lines below, as you need. make sure you read the documentation on Plugin to use more
 * advanced ways of loading plugins
 *
 * Plugin::loadAll(); // Loads all plugins at once
 * Plugin::load('Migrations'); //Loads a single plugin named Migrations
 *
 */

Plugin::load('Migrations');

// Only try to load DebugKit in development mode
// Debug Kit should not be installed on a production system
if (Configure::read('debug')) {
    Plugin::load('DebugKit', ['bootstrap' => true]);
}

/**
 * Connect middleware/dispatcher filters.
 */
DispatcherFactory::add('Asset');
DispatcherFactory::add('Routing');
DispatcherFactory::add('ControllerFactory');

/**
 * Enable immutable time objects in the ORM.
 *
 * You can enable default locale format parsing by adding calls
 * to `useLocaleParser()`. This enables the automatic conversion of
 * locale specific date formats. For details see
 * @link http://book.cakephp.org/3.0/en/core-libraries/internationalization-and-localization.html#parsing-localized-datetime-data
 */
Type::build('time')
    ->useImmutable();
Type::build('date')
    ->useImmutable();
Type::build('datetime')
    ->useImmutable();

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
 * Facebook API
 */
define('FB_APP_ID', '192729344110082');
define('FB_APP_SECRET', '756380338bb32d062402d8aea5b1a352');

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