<?php
/**
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
 * @subpackage    cake.cake.libs.view.templates.errors
 * @since         CakePHP(tm) v 0.10.0.1076
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 */

echo
  '<h2>' . sprintf(__('Missing Method in %s', true), $controller) . '</h2>' .

  // Standard Error
  '<p class="error">' .
    '<strong>' . __('Error', true) . ': </strong>' .
    sprintf(
      __('The action %1$s is not defined in controller %2$s', true),
      '<em>' . $action . '</em>',
      '<em>' . $controller . '</em>'
    ) .
  '</p>' .

  '<p class="error">' .
    '<strong>' . __('Error', true) . ': </strong>' .
    sprintf(
      __('Create %1$s%2$s in file: %3$s.', true),
      '<em>' . $controller . '::</em>',
      '<em>' . $action . '()</em>', APP_DIR . DS . 'controllers' . DS . Inflector::underscore($controller) . '.php'
    ) .
  '</p>' .

  '<pre>' .

"&lt;?php
class $controller extends AppController {

  var " .'$name' . " = $controllerName;

  <strong>
    function $action() {

    }
  </strong>
}
?&gt;" .

  '</pre>';
