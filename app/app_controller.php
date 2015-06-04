<?php

/**
 * Application level Controller
 *
 * This file is application-wide controller file. You can put all
 * application-wide controller-related methods here.
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
 * @subpackage    cake.cake.libs.controller
 * @since         CakePHP(tm) v 0.2.9
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 */

/**
 * This is a placeholder class.
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @package       cake
 * @subpackage    cake.cake.libs.controller
 * @link http://book.cakephp.org/view/957/The-App-Controller
 */
class AppController extends Controller {
  var $components = array(
    'Auth',
    'Cookie',
    'Session',
    'RequestHandler',
  );

  var $helpers = array(
    'Button',
    'Html',
    'Form',
    'Session',
    'Js',
    'Include',
    'Meta'
  );

  function beforeFilter() {
    // Configure AuthComponent
    $this->Auth->authorize = 'actions';
    $this->Auth->loginAction = array('controller' => 'users', 'action' => 'login');
    $this->Auth->logoutRedirect = array('controller' => 'users', 'action' => 'login');
    $this->Auth->loginRedirect = array('controller' => 'users', 'action' => 'index');
  
    // As we will be using a global root ACO we need to modify AuthComponent
    // so that it knows about the existence of this root node, so that when
    // making ACL checks it can use the correct node path when looking up
    // controllers/actions.
    $this->Auth->actionPath = 'controllers/';
    $this->Auth->allowedActions = array('display');
  }

  /**
   * 
   */
  public function getLoggedInUser() {
    return $this->Auth->User('id');
  }

  /**
   * Checks to see if the user is logged in. If not, redirect to the login page.
   */
  public function requireLoggedInUser() {
    $uid = $this->getLoggedInUser();
    if (!isset($uid)) {
      $this->redirect($this->Auth->logout());
    }
    return $uid;
  }

  /**
   * Directs the user back to their home page. You can optionally set a message.
   */
  public function goHome($flash='') {
    if ($flash) {
      $this->Session->setFlash($flash);
    }
    $this->redirect(array(
      'controller' => 'users',
      'action' => 'index'
    ));
  }

  public function setIsAjax() {
    $this->layout = 'ajax';
    $this->autoLayout = false;
    $this->autoRender = false;
    App::import('Lib', 'Response');
  }
}
