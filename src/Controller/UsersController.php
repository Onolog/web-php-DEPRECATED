<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
use Cake\ORM\TableRegistry;

/**
 * Users Controller
 *
 * @property \App\Model\Table\UsersTable $Users
 */
class UsersController extends AppController {

  public function beforeFilter(Event $event) {
    parent::beforeFilter($event);

    // Are these still needed?
    $this->Auth->fields = array(
      'username' => 'id',
      'password' => null
    );

    $this->Auth->allow(['login', 'profile']);
  }

  /**
   * Authentication procedure using Facebook:
   *
   * - Authenticate via FB, and retrieve the user's FB data
   * - Check to see if the fbid already exists in the DB
   * - If so, get the user data and send them on to the site
   * - If not, create a new User in the DB with the FB data
   * - Once the new User is created, send them on to the site
   */
  public function login() {
    $user = $this->request->session()->read('Auth.User');

    if (!empty($user)) {
      // User is alread logged in, redirect to home.
      $this->Auth->setUser($user);
      return $this->redirect($this->Auth->redirectUrl());
    }

    if (!$this->request->is('ajax')) {
      // Just load the page.
      return;
    }

    // Handle the request.
    $data = $this->request->data;
    $uid = $data['id'];

    if (!$uid) {
      // There was some kind of problem receiving the auth response from FB.
      // TODO: Create custom exception handlers.
      $this->set([
        'message' => 'Sorry, we couldn\'t log you in for some reason. Please refresh the page and try again.',
        'payload' => $data,
        'success' => false,
      ]);
      return;
    }

    $user = $this->Users->get($uid);

    if (!empty($user)) {
      // User already exists. Save the latest login date and send back a
      // successful response.
      $user->last_login = date('Y-m-d h:i:s', time());
      $this->Users->save($user);
      $this->Auth->setUser($data);

      $this->set([
        'session' => $this->getSession(),
        'success' => true,
      ]);
      return;
    }

    // Create new user if no records exist.
    $user = $this->Users->newEntity([
      'id' => $uid,
      'first_name' => $data['first_name'],
      'last_name' => $data['last_name'],
      'email' => $data['email'],
      'password' => null, // Default pw, since FB takes care of auth
      'created' => date('Y-m-d h:i:s', time()), // YYYY-MM-DD HH:MM:SS
      'last_login' => date('Y-m-d h:i:s', time())
    ]);

    if ($this->Users->save($user)) {
      // Manually add 'name' on account creation/first login only.
      // For subsequent logins, it's added in afterFind().
      $user->name = $data['name'];
      $this->Auth->setUser($data);

      $this->set([
        'message' => 'Your account has been created',
        'session' => $this->getSession(),
        'success' => true,
      ]);
      return;
    }

    // The account couldn't be created for some reason.
    $this->set([
      'message' => 'Your account could not be created. Please refresh the page and try again.',
    ]);
    return;
  }

  /**
   * Log the User out of Onolog and Facebook
   */
  public function logout() {
    $this->request->session()->destroy();

    if (!$this->request->is('ajax')) {
      return $this->redirect($this->Auth->redirectUrl());
    }

    $this->set([
      'session' => $this->getSession(),
      'success' => true,
    ]);
  }

  /**
   * Default view for users, like a profile
   * This view is public to everyone.
   */
  public function profile($id=null) {
    if (!$id) {
      $this->redirect([
        'controller' => 'activities',
        'action' => 'index',
      ]);
      return;
    }

    $user = $this->Users->get($id);

    $activityQuery = id(TableRegistry::get('Activities'))->find();
    $activities = $activityQuery
      ->where(['user_id' => $user->id])
      ->select(['distance', 'duration', 'start_date'])
      ->order(['start_date' => 'DESC']);

    $shoeQuery = id(TableRegistry::get('Shoes'))->find();
    $shoes = $shoeQuery
      ->where(['user_id' => $user->id])
      ->contain(['Activities', 'Brands']);

    $this->set(compact(
      'activities',
      'shoes',
      'user'
    ));
  }

  /**
   * Display user account settings.
   */
  public function settings() {
    $id = $this->requireLoggedInUser();
    $user = $this->Users->get($id);
    $this->set('user', $user);
  }

  /**
   * Handles ajax call for editing user account info.
   */
  public function edit() {
    $user_id = $this->requireLoggedInUser();
    $data = $this->request->data;

    if (empty($data)) {
      // Error handling.
      return;
    }

    $user = $this->Users->get($data['id']);

    // Users can only edit their own data!
    if ($user->id !== $user_id) {
      // Error handling.
      return;
    }

    $this->Users->patchEntity($user, $data);
    if (!$this->Users->save($user)) {
      // Error handling.
      return;
    }

    $this->set([
      'message' => 'Your changes were successfully saved.',
      'user' => $user,
    ]);
  }

  /**
   * Shows a list of all the logged in user's friends, with running data
   * about them (num of runs/miles together)
   */
  public function friends() {
    $user = $this->requireLoggedInUser();
    $friends = array();
    $this->set('friends', $friends);
  }
}
