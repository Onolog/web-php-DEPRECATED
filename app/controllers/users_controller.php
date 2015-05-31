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
    $this->layout = 'marketing';
    $this->set('title_for_layout', 'Welcome');

    // Redirect to Home if the user is logged in
    if ($this->Auth->User('id')) {
      // Save the latest login date for the user
      $this->User->id = $this->Auth->User('id');
      $this->User->saveField('last_login', date('Y-m-d h:i:s', time()));

      // Explicitly redirect to index instead of using Auth since it is causing
      // a redirect loop for some reason
  		$this->redirect(date(CALENDAR_URI_FORMAT));
  	}
  }

  public function ajax_login() {
    $this->setIsAjax();
    $response = new Response();

    $data = $this->params['form'];

    // Write the user data to the session
    $this->Session->write('Auth.User', $data);
    $uid = $this->Auth->User('id');

    if (!$uid) {
      // There was somekind of problem receiving the auth response from FB.
      return $response
        ->setMessage(
          'Sorry, your information could not be authenticated. Please try ' .
          'again later.'
        )
        ->send();
    }

    // See if this user is already in the database
    $user = $this->User->find('first', array(
      'conditions' => array('User.id' => $uid),
    ));

    if (!empty($user)) {
      // User already exists. Save the latest login date and send back a
      // successful response.
      $this->User->id = $this->Auth->User('id');
      $this->User->saveField('last_login', date('Y-m-d h:i:s', time()));

      return $response
        ->setSuccess(true)
        ->send();
    }

    // Create new user if no records exist
    $this->User->create();

    // Add the user's info
    $user['User'] = array(
      'id' => $uid,
      'first_name' => $this->Auth->User('first_name'),
      'last_name' => $this->Auth->User('last_name'),
      'email' => $this->Auth->User('email'),
      'password' => null, // Default pw, since FB takes care of auth
      'created' => date('Y-m-d h:i:s', time()), // 2011-01-04 08:33:24
      'last_login' => date('Y-m-d h:i:s', time())
    );

    if ($this->User->save($user)) {
      $this->Session->setFlash(__('Your account has been created', 1));

      // We manually add 'name' on account creation/first login
      // only. For subsequent logins, it's added in afterFind().
      $user['User']['name'] = $this->Auth->user('name');

      return $response
        ->setSuccess(true)
        ->send();
    }

    // The sccount couldn't be created for some reason.
    return $response
      ->setMessage('Your account could not be created. Please, try again.')
      ->send();
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

    $shoes = $this->User->Shoe->find('all', array(
		  'conditions' => array(
        'Shoe.user_id' => $this->Auth->User('id'),
      ),
    ));
    $json_shoes = json_encode(
      $this->User->Shoe->sortShoesForJSON($shoes)
    );

    $json_friends = json_encode(
      array_values($this->getFbFriends())
    );

    $this->set(
      'title_for_layout',
      $this->Auth->User('name')
    );

    $this->set(compact(
      'year',
      'month',
      'json_shoes',
      'json_friends'
    ));
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

    $user = $this->User->read();

    // Why does this query return different results depending on
    // if the user is logged in or out?
    $workouts = $this->User->Workout->find('all', array(
		  'conditions' => array('Workout.user_id' => $id),
    ));

    $workoutData = $this->User->Workout->groupWorkoutsByYearMonthDay($workouts);
    $workoutDataByWeek = $this->User->Workout->groupWorkoutsByWeek($workouts);

    $json_workoutData = json_encode($workoutData);
    $json_workoutDataByWeek = json_encode($workoutDataByWeek);

    $total_runs = 0;
    $total_miles = 0;
    foreach ($workoutData as $years) {
      $total_runs += $years['run_count'];
      $total_miles += $years['miles'];
    }

    $shoes = $this->User->Shoe->find('all', array(
      'conditions' => array('Shoe.user_id' => $id),
    ));
    $shoe_count = count($shoes);

    $this->set('title_for_layout', $user['User']['name']);
		$this->set(compact(
		  'json_workoutData',
		  'json_workoutDataByWeek',
      'shoe_count',
      'total_miles',
      'total_runs',
      'user'
		));
	}

  /**
   * Default view for users, like a profile
   * This view is public to everyone.
   */
	function report($id=null, $year=null) {
    $this->layout = 'no_header';

    // Validation
		if (!$id) {
			$this->Session->setFlash(__('Invalid user', true));
			$this->redirect(array('action' => 'index'));
		}

    $user = $this->User->read(null, $id);

    if (!$year) {
      $year = date('Y');
    }
    // First and last days of the year
    $start_date = mktime(0, 0, 0, 1, 1, $year);
    $end_date   = mktime(11, 59, 59, 12, 31, $year);

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

    $json_friends = json_encode(
      $this->getTopFriends($workouts)
    );

    // Format and sort the data
    $workouts = $this->User->Workout->groupWorkouts($workouts);
    
    $total_miles = $workouts['grouped'][$year]['miles'];
    $total_runs = $workouts['grouped'][$year]['run_count'];
    $total_time = $workouts['grouped'][$year]['time'];

    $json_workoutData = json_encode($workouts['grouped'][$year]);
    $json_workoutDataByWeek = json_encode($workouts['week'][$year]);

    // Shoe Data
    $shoes = $this->User->Shoe->find(
      'all', array(
        'conditions' => array(
          'Shoe.user_id' => $id,
        ),
      )
    );

    $shoes = $this->User->Shoe->getActiveShoesForDateRange(
      $shoes,
      $start_date,
      $end_date
    );

    $shoe_count = count($shoes);
    $top_brand = json_encode($this->User->Shoe->getTopBrandData($shoes));

    $extremes = array();
    if ($workouts['grouped'][$year]['run_count'] >= 2) {
      usort($workouts['workouts'], function($a, $b) {
        $distanceA = $a['Workout']['distance'];
        $distanceB = $b['Workout']['distance'];
        if ($distanceA === $distanceB) {
          // TODO: If multiple runs are the same distance, display the number of
          // runs instead of the date for one of them.
          return 0;
        }
        return $distanceA > $distanceB ? 1 : -1;
      });

      $max = end($workouts['workouts']);
      $min = reset($workouts['workouts']);
      $extremes = array(
        'max' => array(
          'date' => $max['Workout']['date'],
          'distance' => $max['Workout']['distance'],
        ),
        'min' => array(
          'date' => $min['Workout']['date'],
          'distance' => $min['Workout']['distance'],
        ),
      );
    }
    $json_extremes = json_encode($extremes);

    $this->set('title_for_layout', $year . ' In Miles');
		$this->set(compact(
		  'end_date',
		  'json_extremes',
		  'json_friends',
		  'json_workoutData',
		  'json_workoutDataByWeek',
		  'shoe_count',
		  'start_date',
		  'top_brand',
		  'total_miles',
		  'total_runs',
		  'total_time',
		  'user'
		));
	}

  /**
   * Allows the user to edit their information and modify account-specific
   * settings.
   */
	function settings() {
    $user = $this->requireLoggedInUser();

		if (!empty($this->data)) {
      if ($this->data['User']['id'] !== $user) {
        $this->Session->setFlash(
          __('You may not change the settings for this user.', 1)
        );
        $this->redirect(array('action' => 'index'));
      }

			if ($this->User->save($this->data)) {
				$this->Session->setFlash(
          __('Your changes were saved.', 1)
        );
				// $this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(
          __('Your changes could not be saved. Please try again.', 1)
        );
			}
		}

		if (empty($this->data)) {
			$this->data = $this->User->read(null, $user);
		}

    $this->set('json_user', json_encode($this->data['User']));
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

    $fb_friends = $this->getFbFriends();
    $friends = array();

    // Only display friends that are in the system
    if (!empty($fb_friends)) {
      foreach ($fb_friends as $friend) {
        $f = $this->User->find('first', array(
          'conditions' => array('User.id' => $friend['id'])
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
    $fbFriends = $this->getFbFriends();
    $friends = array();

    // Only display friends that are in the system
    foreach ($fbFriends as $friend) {
      $f = $this->User->find('first', array(
        'conditions' => array('User.id' => $friend['id'])
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
    $user = $this->requireLoggedInUser();
    $this->setIsAjax();

    // Retrieve all the user's friends
    $friends = $this->getFbFriends();

    // Get the query param from the url
    $q = idx($this->params['url'], 'q');

    $query = '/'.$q.'/i'; // case-insensitive
    $results = array();
    foreach ($friends as $friend) {
      // Only return the set of friends that matches the query string
      if (preg_match($query, $friend['name'])) {
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

  /**
   * Ranks friends by number of runs, then miles
   */
  private function getTopFriends($workouts) {
    $grouped = $this->User->Workout->groupWorkoutsByFriend($workouts);

    function friendSort($a, $b) {
      $aRuns = count($a['runs']);
      $bRuns = count($b['runs']);

      // First sort by # of runs, then by total mileage
      if ($aRuns === $bRuns) {
        $aMiles = array_sum($a['runs']);
        $bMiles = array_sum($b['runs']);
        if ($aMiles === $bMiles) {
          return 0;
        }
        return $aMiles > $bMiles ? -1 : 1;
      }
      return $aRuns > $bRuns ? -1 : 1;
    }

    // Add friend names, since all we currently have is the id.
    $friendData = $this->getPublicFbUserData(array_keys($grouped));
    foreach($grouped as $id => $friend) {
      $grouped[$id]['name'] = $friendData[$id]['name'];
    }

    // Sort first by number of runs, then by mileage.
    usort($grouped, 'friendSort');

    return $grouped;
  }

}
