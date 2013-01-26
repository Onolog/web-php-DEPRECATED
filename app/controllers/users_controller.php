<?php
class UsersController extends AppController {

	var $name = 'Users';

	function beforeFilter() {
    parent::beforeFilter();

    // Are these still needed?
    $this->Auth->fields = array(
      'username' => 'id',
      'password' => null
    );

    $this->Auth->allowedActions = array('*');
  }

  /**
   * Authentication procedure for Onolog, using Facebook:
   *
   * - Authenticate via FB, and retrieve the user's FB data
   * - Check to see if the fbid already exists in the DB
   * - If so, get the user data and send them on to the site
   * - If not, create a new User in the DB with the FB data
   * - Once the new User is created, send them on to the site
   */
  function login() {
    $this->set('title_for_layout', 'Welcome');

    if (!$this->Auth->User() && $this->Connect->user('id')) {

      // See if this facebook id is in the User database
      $data = $this->User->find('first', array(
        'conditions' => array('User.id' => $this->Connect->user('id')),
      ));

      // Create new user if no records exist
      if (empty($data)) {

        $this->User->create();

  		  // Add the user's info
        $data['User'] = array(
          'id' => $this->Connect->user('id'),
          'first_name' => $this->Connect->user('first_name'),
          'last_name' => $this->Connect->user('last_name'),
          'email' => $this->Connect->user('email'),
          'password' => null, // Default pw, since FB takes care of auth
          'created' => date('Y-m-d h:i:s', time()), // 2011-01-04 08:33:24
          'last_login' => date('Y-m-d h:i:s', time())
        );

  			if ($this->User->save($data)) {
  				$this->Session->setFlash(__('Your account has been created', 1));

          // We manually add 'name' on account creation/first login
          // only. For subsequent logins, it's added in afterFind().
          $data['User']['name'] = $this->Connect->user('name');

  			} else {
  				$this->Session->setFlash(__('Your account could not be created. Please, try again.', 1));
  			}
  		}

  		// Write the user data to the session
      $this->Session->write('Auth', $data);
    }

    // Redirect to Home if the user is logged in
    if ($this->Auth->User('id')) {
    
      // TODO: Save auth token for the session

      // Save the latest login date for the user
      $this->User->id = $this->Auth->User('id');
      $this->User->saveField('last_login', date('Y-m-d h:i:s', time()));

      // Explicitly redirect to index instead of using Auth since it is causing
      // a redirect loop for some reason
  		$this->redirect(date(CALENDAR_URI_FORMAT));
  	}
  }

  /**
   * Log the User out of Onolog and Facebook
   */
  function logout() {
    $this->Session->destroy();
    $this->redirect($this->Auth->logout());
  }

  /**
   * Default "Home" view. User must be logged in to see this page.
   */
	function index() {
    $user = $this->requireLoggedInUser();

    $year = idx($this->params, 'year', 0);
    $month = idx($this->params, 'month', 0);

    if (!$year || !$month) {
      $year = date('Y');
      $month = date('m');
    }

    $this->set(
      'title_for_layout',
      $this->Auth->User('name')
    );

    $this->helpers[] = 'Calendar';
    $workouts = $this->User->Workout->find('all', array(
		  'conditions' => array(
        'Workout.user_id' => $user,
      ),
    ));

    // Get workout distances for the stats sidebar
    $stats = $this->User->Workout->getWorkoutStats($workouts);

    $this->set(compact('workouts', 'stats', 'year', 'month'));
	}

  /**
   * Test view of index using Runs + RunDetails
   */
	function runs() {
    $user = $this->requireLoggedInUser();

    $this->set(
      'title_for_layout',
      $this->Auth->User('name')
    );

    $this->helpers[] = 'Calendar';

    // Retrieve the Run and RunDetail data
    $this->User->RunDetail->bindModel(array('belongsTo' => array('Run')));
    $runs = $this->User->RunDetail->find('all', array(
      'conditions'=>array(
        'RunDetail.user_id' => $user
      )
    ));
    debug($runs, 1);

    $this->set('runs', $runs);
	}


  /**
   * Default view for users, like a profile
   * This view is public to everyone.
   */
	function profile($id=null) {
    // Validation
		if (!$id) {
			$this->Session->setFlash(__('Invalid user', true));
			$this->redirect(array('action' => 'index'));
		}

    $this->helpers[] = 'Chart';

    $user = $this->User->read(null, $id);

    // Why does this query return different results depending on
    // if the user is logged in or out?
    $workouts = $this->User->Workout->find('all', array(
		  'conditions' => array(
        'Workout.user_id' => $id,
      ),
      'order'  => 'Workout.date ASC'
    ));

    // Format and sort the data
    $workouts = $this->User->Workout->sortWorkouts($workouts);

    $shoe_count = $this->User->Shoe->find(
      'count', array(
        'conditions' => array('Shoe.user_id' => $id),
      )
    );
    $this->set('title_for_layout', $user['User']['name']);
		$this->set(compact('workouts', 'user', 'shoe_count'));
	}

  /**
   * Default view for users, like a profile
   * This view is public to everyone.
   */
	function report($id=null) {
    // Validation
		if (!$id) {
			$this->Session->setFlash(__('Invalid user', true));
			$this->redirect(array('action' => 'index'));
		}

    $this->helpers[] = 'Chart';

    $user = $this->User->read(null, $id);

    $start_date = mktime(0, 0, 0, 1, 1, 2012);
    $end_date   = mktime(23, 59, 59, 4, 7, 2012);

    // Why does this query return different results depending on
    // if the user is logged in or out?
    $workouts = $this->User->Workout->find('all', array(
		  'conditions' => array(
        'Workout.user_id' => $id,
        'Workout.date >=' => $start_date,
        'Workout.date <=' => $end_date,
      ),
      'order'  => 'Workout.date ASC'
    ));

    // Format and sort the data
    $workouts = $this->User->Workout->sortWorkouts($workouts);

    $shoe_count = $this->User->Shoe->find(
      'count', array(
        'conditions' => array('Shoe.user_id' => $id),
      )
    );
    $this->set('title_for_layout', $user['User']['name']);
		$this->set(compact(
		  'workouts',
		  'user',
		  'shoe_count',
		  'start_date',
		  'end_date'
		));
	}


  /**
   * Allows the user to edit their information. Most of this should be done
   * through Facebook, but we'll probably want to allow users to edit certain
   * Onolog-specific settings here, like distance units (miles vs. kilometers)
   */
	function edit($id = null) {
    $user = $this->requireLoggedInUser();

		if (!$id || $user != $id) {
			$this->Session->setFlash(__('You are not allowed to see this page.', true));
			$this->redirect(array('action' => 'index'));
		}

		if (!empty($this->data)) {
			if ($this->User->save($this->data)) {
				$this->Session->setFlash(__('The user has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The user could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->User->read(null, $id);
		}
	}

  /**
   * Allow the user to delete their account
   */
	function delete($id=null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for user', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->User->delete($id)) {
			$this->Session->setFlash(__('User deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('User was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}

  /**
   * Shows a list of all the logged in user's friends, with running data
   * about them (num of runs/miles together)
   */
  public function friends() {
    $user = $this->requireLoggedInUser();
    $this->set('title_for_layout', 'Friends');

    $fb_friends = $this->getFriends();
    $friends = array();

    // Only display friends that are in the system
    if (!empty($fb_friends)) {
      foreach ($fb_friends->data as $key => $friend) {
        $f = $this->User->find('first', array(
          'conditions' => array('User.id' => $friend->id)
        ));
  
        if ($f) {
          $friends[] = $f['User'];
        }
      }
    }

    // TODO: Once we have the list of friends, we need to go find the
    // associated workouts.
    $this->set('friends', $friends);
  }

  /**
   * Shows a list of all the logged in user's friends, with running data
   * about them (num of runs/miles together)
   */
  public function ajax_friends() {
    $this->layout = 'ajax';
    $user = $this->requireLoggedInUser();

    // Retrieve all the user's friends
    $fb_friends = $this->getFriends();
    $friends = array();

    // Only display friends that are in the system
    foreach ($fb_friends->data as $key => $friend) {
      $f = $this->User->find('first', array(
        'conditions' => array('User.id' => $friend->id)
      ));

      if ($f) {
        $friends[] = $f['User'];
      }
    }

    // TODO: Get a common workout count for each friend and
    // display only the top 5
    $this->set('friends', $friends);
  }


  /**
   * Ajax endpoint controller for friend tokenizer.
   * Takes a search query and retrieves matching friends
   *
   * @param  str  $q    The search query
   */
  public function ajax_friends_list() {    
    $this->layout = 'ajax';
    $user = $this->requireLoggedInUser();

    // Retrieve all the user's friends
    $friends = $this->getFriends();

    // Get the query param from the url
    $q = idx($this->params['url'], 'q');

    $query = '/'.$q.'/i'; // case-insensitive
    $results = array();
    foreach ($friends->data as $friend) {
      // Only return the set of friends that matches the query string
      if (preg_match($query, $friend->name)) {
        $results[] = $friend;
      }
    }

    $this->set('friends', $results);
  }

  /**
   * Overview of all a user's shoes, including mileage for each.
   * Not public.
   *
   * TODO: Should this be in the Shoe Controller?
   */
  public function shoes() {
    $user = $this->requireLoggedInUser();
    $this->set('title_for_layout', 'Shoes');

    // Get all the user's shoes
    $shoes = $this->User->Shoe->find(
      'all', array(
        'conditions' => array('Shoe.user_id' => $user),
      )
    );

    $this->set('shoes', $shoes);
  }

  /**
   * Ajax version of the above
   */
  public function ajax_shoes() {
    $this->layout = 'ajax';
    $user = $this->requireLoggedInUser();

    // Get all the user's shoes
    $shoes = $this->User->Shoe->find(
      'all', array(
        'conditions' => array(
          'Shoe.user_id' => $user,
          'Shoe.inactive' => 0
        ),
      )
    );
    $this->set('shoes', $shoes);
  }

  /**
   * Gets the following mileage summary via ajax:
   *  - Mileage this week
   *  - Mileage this month
   *  - Mileage this year
   *  - Mileage all time
   */
  public function ajax_miles() {
    $this->layout = 'ajax';
    $user = $this->requireLoggedInUser();

    $workouts = $this->User->Workout->find('all', array(
		  'conditions' => array(
        'Workout.user_id' => $user,
      ),
    ));

    $stats = $this->User->Workout->getWorkoutStats($workouts);
    $this->set('stats', $stats);
  }

  /**
   * Takes an array of fbids and checks to see if they are already Onolog users.
   * If not, they are added.
   *
   * @param   arr   $friends
   * @returns
   */
  public function checkAndAddFriends($friends) {
    // Try and see if the users are already in the system
    $users = $this->User->find('all', array(
      'conditions' => array('User.fbid' => $friends),
    ));

    // If not all the users are in the system, we need to add the ones who aren't
    if (count($users) != count($friends)) {
      
    }
  }

}
