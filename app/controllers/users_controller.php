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
  public function login() {
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
      // There was some kind of problem receiving the auth response from FB.
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
        ->setPayload($this->getSession())
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
        ->setPayload($this->getSession())
        ->send();
    }

    // The sccount couldn't be created for some reason.
    return $response
      ->setMessage('Your account could not be created. Please, try again.')
      ->send();
  }

  /**
   * Get the user's session data if they are logged in, otherwise return null.
   * Note that they can be logged out of the site while still being logged into
   * Facebook.
   */
  public function ajax_session() {
    $this->setIsAjax();

    return id(new Response())
      ->setSuccess(true)
      ->setPayload($this->getSession())
      ->send();
  }

  /**
   * Log the User out of Onolog and Facebook
   */
  public function logout() {
    $this->Session->destroy();
    $this->redirect($this->Auth->logout());
  }

  public function ajax_logout() {
    $this->setIsAjax();
    $this->Session->destroy();

    $response = new Response();
    return $response
      ->setSuccess(true)
      ->setPayload($this->getSession())
      ->send();
  }

  /**
   * Default "Home" view. User must be logged in to see this page.
   */
	public function index() {
    $user = $this->requireLoggedInUser();

    $year = idx($this->params, 'year', 0);
    $month = idx($this->params, 'month', 0);

    if (!$year || !$month) {
      $year = date('Y');
      $month = date('n');
    }

    $activities = $this->User->Workout->getWorkoutsForMonth(
      $year,
      $month,
      $user
    );

    $shoes = $this->User->Shoe->getShoesForActivities($activities);

    $this->set('activities', $activities);
    $this->set('shoes', $shoes);
    $this->set('title', $this->Auth->User('name'));
	}

  /**
   * Default view for users, like a profile
   * This view is public to everyone.
   */
	function profile($id=null) {
    // Validation
    $user = $this->User->find('first', array(
      'conditions' => array('User.id' => $id),
      'recursive' => -1,
    ));

		if (!$user) {
			$this->Session->setFlash(__('Invalid user', true));
			$this->redirect(array('action' => 'index'));
		}

    $user = $user['User'];
    unset($user['password']);

    // TODO: Why does this query return different results depending on
    // if the user is logged in or out?
    $workouts = $this->User->Workout->find('all', array(
		  'conditions' => array('Workout.user_id' => $id),
      // Only send down the minimum data we need.
      'fields' => array(
        'Workout.distance',
        'Workout.start_date',
        'Workout.duration',
      ),
      'order' => 'Workout.start_date DESC',
    ));
    $activities = $this->User->Workout->flattenWorkouts($workouts);

    $shoes = $this->User->Shoe->find('all', array(
      'conditions' => array('Shoe.user_id' => $id),
    ));

		$this->set(compact(
      'activities',
      'shoes',
      'user'
		));
	}

	function report($id=null, $year=null) {
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
        'Workout.start_date >=' => date('c', $start_date),
        'Workout.start_date <=' => date('c', $end_date),
      ),
      'order'  => 'Workout.start_date ASC'
    ));

    $friends = $this->getTopFriends($workouts);

    // Format and sort the data
    $workouts_by_year = $this->User->Workout->groupWorkoutsByYearMonthDay($workouts);
    $workouts_by_week = $this->User->Workout->groupWorkoutsByWeek($workouts);
    
    $total_miles = $workouts_by_year[$year]['miles'];
    $total_runs = $workouts_by_year[$year]['run_count'];
    $total_time = $workouts_by_year[$year]['time'];

    $workoutData = $workouts_by_year[$year];
    $workoutDataByWeek = $workouts_by_week[$year];

    // Shoe Data
    $shoes = $this->User->Shoe->find('all', array(
      'conditions' => array(
        'Shoe.user_id' => $id,
      ),
    ));

    $shoes = $this->User->Shoe->getActiveShoesForDateRange(
      $shoes,
      $start_date,
      $end_date
    );

    $shoe_count = count($shoes);
    $top_brand = $this->User->Shoe->getTopBrandData($shoes);

    $extremes = array();
    if ($workouts_by_year[$year]['run_count'] >= 2) {
      usort($workouts, function($a, $b) {
        $distanceA = $a['Workout']['distance'];
        $distanceB = $b['Workout']['distance'];
        if ($distanceA === $distanceB) {
          // TODO: If multiple runs are the same distance, display the number of
          // runs instead of the date for one of them.
          return 0;
        }
        return $distanceA > $distanceB ? 1 : -1;
      });

      $max = end($workouts);
      $min = reset($workouts);
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
		  'extremes',
		  'friends',
		  'workoutData',
		  'workoutDataByWeek',
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
    $id = $this->requireLoggedInUser();
		$user = $this->User->read(null, $id);
    $this->set('user', $user['User']);
	}

  /**
   * Allows the user to edit their information and modify account-specific
   * settings.
   */
  function ajax_settings() {
    $id = $this->requireLoggedInUser();

    $this->setIsAjax();
    $response = new Response();

    if (empty($this->data)) {
      return $response->send();
    }

    if ($this->data['User']['id'] !== $id) {
      return $response
        ->setMessage(
          'You do not have permission to change the settings for this user.'
        )
        ->send();
    }

    if ($this->User->save($this->data)) {
      return $response
        ->setSuccess(true)
        ->setMessage('Your changes were saved')
        ->setPayload($this->data['User'])
        ->send();
    }

    return $response
      ->setMessage('Your changes could not be saved. Please try again.')
      ->send();
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

    $friends = array();

    $this->set('friends', $friends);
  }

  /**
   * Overview of all a user's shoes, including mileage for each.
   * Not public.
   *
   * TODO: Should this be in the Shoe Controller?
   */
  public function shoes() {
    $user_id = $this->requireLoggedInUser();

    // TODO: Don't recursively fetch all the activity data.
    $shoes = $this->User->Shoe->find('all', array(
      'conditions' => array('Shoe.user_id' => $user_id),
    ));

    $this->set('shoes', $shoes);
  }

  /**
   * Ranks friends by number of runs, then miles
   */
  private function getTopFriends($workouts) {
    $grouped = $this->groupWorkoutsByFriend($workouts);

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

    // Sort first by number of runs, then by mileage.
    usort($grouped, 'friendSort');

    return $grouped;
  }

  /**
   * Given a set of workouts, this finds all the workouts that were done with
   * friends and provides the number of runs and total mileage with each friend.
   */
  private function groupWorkoutsByFriend($workouts) {
    $grouped = array();
    foreach ($workouts as $workout) {
      if (isset($workout['Workout']['friends'])) {
        $friends = array_filter(explode(',', $workout['Workout']['friends']));
        foreach ($friends as $id) {
          if (!isset($grouped[$id])) {
            // Init the friend array
            $grouped[$id] = array(
              'id' => $id,
              // Name must be added later, since it depends either on the user
              // being logged in, or knowing the if to fetch from FB, which is
              // done as a batch call.
              'name' => '',
              'runs' => array(),
            );
          }
          $grouped[$id]['runs'][] = $workout['Workout']['distance'];
        }
      }
    }
    return $grouped;
  }

}
