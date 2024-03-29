<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link      http://cakephp.org CakePHP(tm) Project
 * @since     0.2.9
 * @license   http://www.opensource.org/licenses/mit-license.php MIT License
 */
namespace App\Controller;

use Cake\Controller\Controller;
use Cake\Event\Event;
use Cake\Network\Exception\UnauthorizedException;

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @link http://book.cakephp.org/3.0/en/controllers.html#the-app-controller
 */
class AppController extends Controller {

  /**
   * Initialization hook method.
   *
   * Use this method to add common initialization code like loading components.
   *
   * e.g. `$this->loadComponent('Security');`
   *
   * @return void
   */
  public function initialize() {
    parent::initialize();

    $this->loadComponent('RequestHandler');
    $this->loadComponent('Flash');
    $this->loadComponent('Auth', [
      'loginRedirect' => [
        'controller' => 'Activities',
        'action' => 'index',
      ],
      'logoutRedirect' => [
        'controller' => 'Users',
        'action' => 'login',
      ]
    ]);

    // All actions use the common view:
    $this->viewBuilder()->templatePath('Common');
    $this->viewBuilder()->template(COMMON_TEMPLATE);
  }

  public function beforeFilter(Event $event) {
    $this->Auth->allow('*');
  }

  /**
   * Before render callback.
   *
   * @param \Cake\Event\Event $event The beforeRender event.
   * @return void
   */
  public function beforeRender(Event $event) {
    if (
      !array_key_exists('_serialize', $this->viewVars) &&
      in_array($this->response->type(), ['application/json', 'application/xml'])
    ) {
      $this->set('_serialize', true);
    }
  }

  public function getSession() {
    $session = $this->request->session();
    $loggedInUser = $session->read('Auth.User') ?: [];
    $sessionConfig = $session->read('Config') ?: [];

    // This should match what's in PageHelper
    return array_merge($loggedInUser, $sessionConfig);
  }

  public function getLoggedInUser() {
    return (int) $this->request->session()->read('Auth.User.id');
  }

  /**
   * Checks to see if the user is logged in. If not, redirect to the login page.
   */
  public function requireLoggedInUser() {
    $uid = $this->getLoggedInUser();
    if (isset($uid)) {
      return $uid;
    }

    if ($this->request->is('ajax')) {
      throw new UnauthorizedException(
        'You must be logged in to complete this action. Please log in and ' .
        'try again.'
      );
    } else {
      $this->redirect($this->Auth->logout());
    }
  }

  /**
   * Directs the user back to their home page. You can optionally set a message.
   */
  public function goHome($flash='') {
    if ($flash) {
      $this->Session->setFlash($flash);
    }
    $this->redirect([
      'controller' => 'users',
      'action' => 'index'
    ]);
  }
}
