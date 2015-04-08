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
    'Button',
    'Html',
    'Form',
    'Session',
    'Js',
    'Include',
    'Facebook.Facebook',
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

    // Set Facebook user data for views
    // TODO: Is this needed or is it already in the Connect Session?
    $this->set('fb_user', $this->Connect->user());
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

  /**
   * Gets an object containing the logged-in user's FB friend data (name + id)
   *
   * @return arr
   */
  protected function getFbFriends() {
    $friends = array();
    $id = $this->getLoggedInUser();

    if (!$this->getAccessToken() || !$id) {
      return $friends;
    }

    // TODO: Add timeout handling
    $friendString = file_get_contents(
      'https://graph.facebook.com/' . $id . '/friends?' .
        'access_token=' . $this->getAccessToken()
    );

    if (!$friendString) {
      return $friends;
    }

    $friendObj = json_decode($friendString);

    // Convert to an array
    if ($friendObj) {
      foreach ($friendObj->data as $friend) {
        $friends[$friend->id] = array(
          'id' => $friend->id,
          'name' => $friend->name
        );
      }
    }

    return $friends;
  }

  /**
   * Given an array of user ids, retrieves the public data for each one
   */
  protected function getPublicFbUserData(/*array*/ $users) /*array*/ {
    // Build the query
    $query = array();
    foreach($users as $uid) {
      $query[] = array(
        'method' => 'GET',
        'relative_url' => $uid,
      );
    }

    $data =
      'access_token=' . $this->getAccessToken() . '&' .
      'batch=' . json_encode($query) . '&' .
      'include_headers=false';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://graph.facebook.com/');
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

    $response = json_decode(curl_exec($ch));
    curl_close($ch);

    // Convert to an array
    $friends = array();
    foreach ($response as $friend) {
      $data = json_decode($friend->body);
      $friends[$data->id] = array(
        'id' => $data->id,
        'name' => $data->name,
      );
    }
    return $friends;
  }

  /**
   * Retrieves the user's access token for the Connect session
   */
  private function getAccessToken() {
    $facebook = new Facebook(array(
      'appId'  => FB_APP_ID,
      'secret' => FB_SECRET,
    ));
    return $facebook->getAccessToken();
  }

  public function setIsAjax() {
    $this->layout = 'ajax';
    $this->autoLayout = false;
    $this->autoRender = false;
    App::import('Lib', 'Response');
  }
}
