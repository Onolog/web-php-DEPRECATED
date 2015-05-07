<?php
/**
 * Routes configuration
 *
 * In this file, you set up routes to your controllers and their actions.
 * Routes are very important mechanism that allows you to freely connect
 * different urls to chosen controllers and their actions (functions).
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
 * @since         CakePHP(tm) v 0.2.9
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 */

/**
 * Default Home Page Route
 *
 * Here, we are connecting '/' (base path) to controller called 'Pages',
 * its action called 'display', and we pass a param to select the view file
 * to use (in this case, /app/views/pages/home.ctp)...
 */
// Router::connect('/', array('controller' => 'pages', 'action' => 'display', 'home'));

/**
 * ...and connect the rest of 'Pages' controller's urls.
 */
Router::connect('/pages/*', array('controller' => 'pages', 'action' => 'display'));


/**
 * Home Page Route
 *
 * By default, show the calendar view when a user is logged in.
 * This is view serves as "home", and also "All Workouts"
 */
Router::connect(
  '/:year/:month',
  array(
    'controller' => 'users',
    'action' => 'index',
    'year' => null,
    'month' => null
  ),
  array(
    'year' => '[12][0-9]{3}',
    'month' => '0[1-9]|1[012]',
  )
);

Router::connect('/login', array(
  'controller' => 'users',
  'action' => 'login'
));

Router::connect('/shoes', array(
  'controller' => 'users',
  'action' => 'shoes'
));

Router::connect('/', array(
  'controller' => 'users',
  'action' => 'index'
));

Router::connect('/daniels', array(
  'controller' => 'vdots',
  'action' => 'index'
));
