<?php
class WorkoutsController extends AppController {

	var $name = 'Workouts';

	function beforeFilter() {
    parent::beforeFilter();

    $this->Auth->allowedActions = array('*');
  }

  /**
   * Read-only view of a single workout with the given id
   *
   * @param int   $id   Workout ID
   */
	public function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid workout', 1));
			$this->redirect(array('action' => 'index'));
		}

    // Get the workout data
		$workout = $this->Workout->read(null, $id);
    if (empty($workout)) {
      // The workout doesn't exist. Redirect.
      $this->Session->setFlash(__('That workout doesn\'t exist', 1));
			$this->redirect(array('action' => 'index'));
    }

    // Friend info
    // TODO: This throws a lot of errors when a logged out
    // user is viewing the page
    $friends =
      $this->getWorkoutFriends($workout['Workout']['friends']);

    // Does the workout belong to the person viewing it?
		$is_owner = ($workout['User']['id'] == $this->Auth->User('id'));

    $brand = $this->Workout->Shoe->Brand->read(null, $workout['Shoe']['brand_id']);
    $this->set(compact('workout', 'brand', 'is_owner', 'friends'));
	}

  /**
   * Lets the user add a workout
   *
   * TODO: Don't let the user submit an empty workout
   * TODO: Can this somehow be combined with edit()?
   * 
   * @param   int   $date   unix timestamp of the workout date
   */
	public function add($date=null) {
    $user = $this->requireLoggedInUser();

    // If there's no date selected, default to today.
    if (!$date) {
      $date = time();
    }

    // On form submission
		if (!empty($this->data)) {

		  // Add the user id and date to the data
      $this->data['Workout']['user_id'] = $user;
      $this->data['Workout']['date'] = $date;

      // Format the time back to seconds
		  $time = array(
		    $this->data['Workout']['hh'],
		    $this->data['Workout']['mm'],
		    $this->data['Workout']['ss']
		  );
		  $this->data['Workout']['time'] = time_to_sec($time);

      // Check the list of friends and add any that are not already in the system
      /*
      $friends = explode(',', $this->data['Workout']['friends']);
      $r = $this->Workout->User->checkAndAddFriends($friends);
		  debug($friends);
		  */

			$this->Workout->create();
			if ($this->Workout->save($this->data)) {
				$this->Session->setFlash(__('Your workout was added', 1));

        // Redirect to the calendar page
				$this->redirect(date(CALENDAR_URI_FORMAT, $date));
			} else {
				$this->Session->setFlash(__('Your workout could not be added. Please try again.', 1));
			}
		}

    $title = date('F jS, Y', $date);
    $this->set('title_for_layout', $title);
    $shoes = $this->getShoesForWorkout();

		$this->set(compact('shoes', 'date', 'title'));
	}

  public function sms_add($date=null) {
    $this->set('title_for_layout', 'SMS');
  }

  /**
   * Lets the user add a workout via ajax from a modal or flyout
   * 
   * @param   int   $date   unix timestamp of the workout date
   */
	public function ajax_add($date=null) {
    $this->layout = 'ajax';
    $user = $this->requireLoggedInUser();

    // If there's no date selected, default to today.
    if (!$date) {
      $date = time();
    }

    // On form submission
		if (!empty($this->data)) {

		  // Add the user id and date to the data
      $this->data['Workout']['user_id'] = $user;
      $this->data['Workout']['date'] = $date;

      // Format the time back to seconds
		  $time = array(
		    $this->data['Workout']['hh'],
		    $this->data['Workout']['mm'],
		    $this->data['Workout']['ss']
		  );
		  $this->data['Workout']['time'] = time_to_sec($time);

      // Check the list of friends and add any that are not already in the system
      /*
      $friends = explode(',', $this->data['Workout']['friends']);
      $r = $this->Workout->User->checkAndAddFriends($friends);
		  debug($friends);
		  */

			$this->Workout->create();
			if ($this->Workout->save($this->data)) {
				$this->Session->setFlash(__('Your workout was added', 1));

        // Redirect to the calendar page
				$this->redirect(date(CALENDAR_URI_FORMAT, $date));
			} else {
				$this->Session->setFlash(__('Your workout could not be added. Please try again.', 1));
			}
		}

    $title = date('F jS, Y', $date);
    $this->set('title_for_layout', $title);
    $shoes = $this->getShoesForWorkout();

		$this->set(compact('shoes', 'date', 'title'));
	}


  /**
   * Lets the user edit a given workout
   *
   * TODO: Can this somehow be combined with add()?
   * 
   * @param   int   $wid   Workout id
   */
	public function edit($wid = null) {
    $user = $this->requireLoggedInUser();

		if (!$wid && empty($this->data)) {
			$this->Session->setFlash(__('Invalid workout', true));
			$this->redirect(array(
        'controller' => 'users',
        'action' => 'index'
      ));
		}

    // On update
		if (!empty($this->data)) {
		  // Format the time back to seconds
		  $time = array(
		    $this->data['Workout']['hh'],
		    $this->data['Workout']['mm'],
		    $this->data['Workout']['ss']
		  );
		  $this->data['Workout']['time'] = time_to_sec($time);

			if ($this->Workout->save($this->data)) {
				$this->Session->setFlash(__('Workout saved', true));
				$this->redirect(date(CALENDAR_URI_FORMAT, $this->data['Workout']['date']));
			} else {
				$this->Session->setFlash(__('The workout could not be saved. Please, try again.', true));
			}
		}

		if (empty($this->data)) {
			$this->data = $this->Workout->read(null, $wid);

      // Make sure users only edit their own workouts!
      if ($this->data['User']['id'] != $user) {
        $this->Session->setFlash(__('You are not allowed to edit this workout', true));
        $this->redirect(array(
          'controller' => 'users',
          'action' => 'index'
        ));
      }

      // Format time for display
      $time = sec_to_time($this->data['Workout']['time']);
		  $this->data['Workout']['hh'] = $time['hh'];
		  $this->data['Workout']['mm'] = $time['mm'];
      $this->data['Workout']['ss'] = $time['ss'];
		}

    // Display friends associated with the workout
    $workout_friends =
      $this->getWorkoutFriends($this->data['Workout']['friends']);
        
    $friends = '';
    if (!empty($workout_friends)) {
      // Change the array to JSON format so it can be passed to the tokenizer
      $friends = json_encode($workout_friends);
    }

    $shoes = $this->getShoesForWorkout();

		$this->set(compact('shoes', 'friends'));
	}

  /**
   * Lets the user delete a given workout
   * 
   * @param   int   $wid   Workout id
   */
	public function delete($wid = null) {
    $user = $this->requireLoggedInUser();

		if (!$wid) {
			$this->Session->setFlash(__('Invalid id for workout', true));
			$this->redirect(array('action'=>'index'));
		}

    $data =
      $this->Workout->find('first', array(
        'conditions' => array('Workout.id' => $wid),
      ));

    // Make sure users only delete their own workouts!
    if ($data['User']['id'] != $user) {
      $this->Session->setFlash(__('You are not allowed to delete this workout', true));
      $this->redirect(array(
        'controller' => 'users',
        'action' => 'index'
      ));
    }

    // The workout was successfully deleted
		if ($this->Workout->delete($wid)) {
			$this->Session->setFlash(__('Workout deleted', true));
			$this->redirect(array('action'=>'index'));
		}

    // Something went wrong
		$this->Session->setFlash(__('Workout was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}

  /**
   * Get all the user's shoes and split into active and inactive
   */
  protected function getShoesForWorkout() {
    $shoes = $this->Workout->Shoe->find('all', array(
		  'conditions' => array(
        'Shoe.user_id' => $this->Auth->User('id'),
      ),
    ));
    return $this->Workout->Shoe->sortActiveShoes($shoes);
  }

  /**
   * Get info about friends associated with a particular workout
   *
   * @param   str  Comma delimited string of fbids: "11,4280"
   * @returns arr
   */
  public function getWorkoutFriends($friends) {
    if (!isset($friends)) {
      return array();
    }
    $friends = explode(',', $friends);

    // Try and see if the users are already in the system, and get their info
    $users = $this->Workout->User->find('all', array(
      'conditions' => array('User.id' => $friends),
    ));

    // Put any matching users in the new array
    $workout_friends = array();
    if (!empty($users)) {
      foreach ($users as $user) {
        $workout_friends[$user['User']['id']] = array(
          'id' => $user['User']['id'],
          'name' => $user['User']['name']
        );
      }
    }

    // If not all the friends are in the system, we need to get their info from FB
    if (count($workout_friends) != count($friends)) {

      // Rekey the friends array by fbid
      foreach ($friends as $key => $fbid) {
        $friends[$fbid] = $fbid;
        unset($friends[$key]);
      }

      // Unset any friends we already have
      foreach ($workout_friends as $fbid => $friend) {
        unset($friends[$fbid]);
      }

      // Match the remaining workout friends with the corresponding FB friend
      // Get the user's FB friends
      $fb_friends = $this->getFriends();
      foreach ($fb_friends->data as $friend) {
        foreach ($friends as $fbid) {
          if ($friend->id == $fbid) {
            // Convert the FB friend object to an array
            $workout_friends[] = (array)$friend;
            break; // Once we have the info, break out of the loop
          }
        }
      }
    }

    // Reset the array keys since the typeahead doesn't like them
    // and will break otherwise
    return array_values($workout_friends);
  }

  /**
   * REMOVE THIS
   *
  public function migrate() {
    $workouts = $this->Workout->find('all');
    foreach ($workouts as $key => $workout) {
      $workouts[$key]['Workout']['user_id'] = $workout['User']['fbid'];
      $workouts[$key]['Shoe']['user_id'] = $workout['User']['fbid'];
      $workouts[$key]['User']['id'] = $workout['User']['fbid'];
    }

    if ($this->Workout->saveAll($workouts, array('validate' => false))) {
		  $this->Session->setFlash(__('Migration completed', 1));
		} else {
      debug($this->Workout->invalidFields());
		  $this->Session->setFlash(__('Migration Failed.', 1));
		}
    $this->set('workouts', $workouts);
  }
  */

}
