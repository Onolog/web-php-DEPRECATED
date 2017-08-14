<?php
/**
 * Routes configuration
 *
 * In this file, you set up routes to your controllers and their actions.
 * Routes are very important mechanism that allows you to freely connect
 * different URLs to chosen controllers and their actions (functions).
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

use Cake\Core\Plugin;
use Cake\Routing\RouteBuilder;
use Cake\Routing\Router;

/**
 * The default class to use for all routes
 *
 * The following route classes are supplied with CakePHP and are appropriate
 * to set as the default:
 *
 * - Route
 * - InflectedRoute
 * - DashedRoute
 *
 * If no call is made to `Router::defaultRouteClass()`, the class used is
 * `Route` (`Cake\Routing\Route\Route`)
 *
 * Note that `Route` does not do any inflections on URLs which will result in
 * inconsistently cased URLs when used with `:plugin`, `:controller` and
 * `:action` markers.
 *
 */
Router::defaultRouteClass('DashedRoute');

Router::scope('/', function (RouteBuilder $routes) {

  // Allowed extensions.
  $routes->extensions(['json', 'xml', 'ajax']);

  $routes->connect('/pages/*', [
    'controller' => 'pages',
    'action' => 'display',
  ]);

  $routes->connect('/privacy', [
    'controller' => 'pages',
    'action' => 'display',
  ]);

  $routes->connect('/terms', [
    'controller' => 'pages',
    'action' => 'display',
  ]);

  $routes->connect('/vdot', [
    'controller' => 'pages',
    'action' => 'display',
  ]);

  /**
   * Home Page Route
   *
   * By default, show the calendar view when a user is logged in.
   * This is view serves as "home", and also "All Workouts"
   */
  $routes->connect('/:year/:month', [
    'controller' => 'activities',
    'action' => 'index',
    'year' => null,
    'month' => null
  ], [
    'year' => '[12][0-9]{3}',
    'month' => '0[1-9]|1[012]',
  ]);

  $routes->connect('/', [
    'controller' => 'activities',
    'action' => 'index',
  ]);

  $routes->connect('/data', [
    'controller' => 'Users',
    'action' => 'data',
  ]);

  $routes->connect('/friends', [
    'controller' => 'Users',
    'action' => 'friends',
  ]);

  $routes->connect('/login', [
    'controller' => 'Users',
    'action' => 'login',
  ]);

  $routes->connect('/settings', [
    'controller' => 'Users',
    'action' => 'settings',
  ]);

  // Allows /action/:id instead of /action/view/:id
  $routes->connect('/activities/:id', [
    'controller' => 'activities',
    'action' => 'view',
  ], [
    'id' => '\d+',
    'pass' => ['id']
  ]);

  $routes->connect('/shoes/:id', [
    'controller' => 'Shoes',
    'action' => 'view',
  ], [
    'id' => '\d+',
    'pass' => ['id']
  ]);

  $routes->connect('/users/:id', [
    'controller' => 'Users',
    'action' => 'profile',
  ], [
    'id' => '\d+',
    'pass' => ['id']
  ]);

  /**
   * Connect catchall routes for all controllers.
   *
   * Using the argument `DashedRoute`, the `fallbacks` method is a shortcut for
   *    `$routes->connect('/:controller', ['action' => 'index'], ['routeClass' => 'DashedRoute']);`
   *    `$routes->connect('/:controller/:action/*', [], ['routeClass' => 'DashedRoute']);`
   *
   * Any route class can be used with this method, such as:
   * - DashedRoute
   * - InflectedRoute
   * - Route
   * - Or your own route class
   *
   * You can remove these routes once you've connected the
   * routes you want in your application.
   */
  $routes->fallbacks('DashedRoute');
});

/**
 * Load all plugin routes.  See the Plugin documentation on
 * how to customize the loading of plugin routes.
 */
Plugin::routes();
