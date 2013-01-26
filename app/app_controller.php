<?php
App::import('Plugins', 'facebook/facebook');

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
    'Facebook.Connect',
    'RequestHandler',
  );

  var $helpers = array(
    'Html',
    'Form',
    'Session',
    'Js',
    'Include',
    'Facebook.Facebook',
    'Meta'
  );

  private $isMobile = false;

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

    // Mobile
    // $this->initMobile();

    // Set Facebook user data for views
    // TODO: Is this needed or is it already in the Connect Session?
    $this->set('fb_user', $this->Connect->user());
  }

  public function getIsMobile() {
    return $this->isMobile;
  }

  /**
   * Checks to see if the user is logged in. If not, redirect to the login page.
   */
  public function requireLoggedInUser() {
    $uid = $this->Auth->User('id');
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

  /**
   * Gets an object containing the logged-in user's FB friend data (name + id)
   *
   * @return obj
   */
  protected function getFriends() {
    if (!$this->getAccessToken()) {
      return array();
    }

    return json_decode(file_get_contents(
      'https://graph.facebook.com/' .
        $this->Connect->user('id') .
        '/friends?access_token=' . $this->getAccessToken()
    ));
  }

  /**
   * Retrieves the user's access token for the Connect session
   */
  protected function getAccessToken() {
    $facebook = new Facebook(array(
      'appId'  => FB_APP_ID,
      'secret' => FB_SECRET,
    ));
    return $facebook->getAccessToken();
  }

  /**
   * Returns a list of all the friends the user ran with for a given set of
   * workouts, ordered by frequency, and with a frequency count.
   *
   * @param   arr   $workouts   Set of workouts
   *
   * @returns arr
   */
  public function getTopFriends($workouts) {
    // Write this function
    return array();
  }

  protected function initMobile() {
    $this->isMobile = !!idx($this->params, 'mobile', false);

    // Redirect if mobile a mobile device, not yet in the mobile site, and doesn't have the cookie yet.
    $visited = $this->Cookie->read('Info.Visited') || null;

    // Not on the mobile site, is a mobile device, and a first-time visitor
    if (!$visited) {
      $this->Cookie->write('Info.Visited', 1);

      if (!$this->isMobile && $this->RequestHandler->isMobile()) {
        $this->redirect(array('controller' => 'posts', 'action' => 'index', 'mobile' => true));
      }
    }

    $this->set('mobile', $this->isMobile);

    if ($this->isMobile) {
      $this->layout = 'mobile';
    }
  }

}
