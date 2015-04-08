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
			$this->goHome(__('Invalid workout', 1));
		}

    // Get the workout data
		$workout = $this->Workout->read(null, $id);
    if (empty($workout)) {
      // The workout doesn't exist. Redirect.
      $this->goHome(__('That workout doesn\'t exist', 1));
    }

    // Friend info
    // TODO: This throws a lot of errors when a logged out
    // user is viewing the page
    $workout['Workout']['friends'] =
      $this->getWorkoutFriends($workout['Workout']['friends']);

    // Does the workout belong to the person viewing it?
		$is_owner = $workout['User']['id'] == $this->Auth->User('id');
    $this->set(compact('workout', 'is_owner'));
	}

  /**
   * @param int   $id   Workout ID
   */
	public function ajax_view($id = null) {
    $this->setIsAjax();
    $response = new Response();

		if (!$id) {
			$response->setMessage('Invalid workout.');
		} else {
      // Get the workout data
  		$workout = $this->Workout->read(null, $id);
      if (empty($workout)) {
        // The workout doesn't exist
        $response->setMessage('That workout doesn\'t exist.');
      } else {
        // Friend info
        $workout['Workout']['friends'] =
          $this->getWorkoutFriends($workout['Workout']['friends']);

        $response
          ->setSuccess(true)
          ->setPayload($workout['Workout'])
          ->setField(
            'isOwner',
            $workout['User']['id'] === $this->Auth->User('id')
          );
      }
		}
    return $response->get();
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

      $this->formatWorkoutDataForWrite();

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
    $json_shoes = $this->getShoesForWorkoutJSON();

		$this->set(compact('json_shoes', 'date', 'title'));
	}

  /**
   * Lets the user add a workout via ajax from a modal or flyout
   * 
   * @param   int   $date   unix timestamp of the workout date
   */
	public function ajax_add($date=null) {
    $this->setIsAjax();
    $response = new Response();

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

      // Unset the placeholder ID
      unset($this->data['Workout']['id']);

      $this->formatWorkoutDataForWrite();

      // Create the new workout and attempt to write to the DB
			$this->Workout->create();
      if ($this->Workout->save($this->data)) {
			  // Return the newly added workout in the response.
			  $workout = $this->Workout->read(null,$this->Workout->id);
			  $response
				  ->setSuccess(true)
			    ->setPayload($workout['Workout'])
				  ->setMessage('Your workout was added');
			} else {
				$response->setMessage('Your workout could not be added. Please try again.');
			}
		}
    return $response->get();
	}

  public function sms_add($date=null) {
    $this->set('title_for_layout', 'SMS');
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

    // On submit, update the workout
		if (!empty($this->data)) {
      $this->formatWorkoutDataForWrite();

			if ($this->Workout->save($this->data)) {
				$this->Session->setFlash(__('Workout saved', true));
				$this->redirect(date(CALENDAR_URI_FORMAT, $this->data['Workout']['date']));
			} else {
				$this->Session->setFlash(__('The workout could not be saved. Please try again.', true));
			}
		}

		if (empty($this->data)) {
			$this->data = $this->Workout->read(null, $wid);

      // Make sure users only edit their own workouts!
      if ($this->data['User']['id'] !== $user) {
        $this->goHome(__('You are not allowed to edit this workout', true));
      }
		}

    $fbFriends = $this->getFbFriends();

    // Format friend data associated with the workout
    $this->data['Workout']['friends'] = $this->getWorkoutFriends(
      $this->data['Workout']['friends']
    );

    $json_shoes = $this->getShoesForWorkoutJSON();
    $json_friends = json_encode(array_values($fbFriends));

		$this->set(compact('json_shoes', 'json_friends'));
	}

  /**
   * Lets the user edit a given workout
   *
   * TODO: Can this somehow be combined with add()?
   * 
   * @param   int   $wid   Workout id
   */
	public function ajax_edit($wid = null) {
    $user = $this->requireLoggedInUser();

    $this->setIsAjax();
    $response = new Response();

		if (!$wid && empty($this->data)) {
      return $response
        ->setMessage('Invalid workout.')
        ->get();
		}

    // On submit, update the workout
		if (!empty($this->data)) {
      // Make sure users only edit their own workouts!
      if ($this->data['Workout']['user_id'] !== $user) {
        return $response
          ->setMessage('You are not allowed to edit this workout.')
          ->get();
      }

      $this->formatWorkoutDataForWrite();

			if ($this->Workout->save($this->data)) {
				$workout = $this->data['Workout'];
				$workout['friends'] = $this->getWorkoutFriends($workout['friends']);

        $response
          ->setSuccess(true)
				  ->setMessage('Your workout was successfully updated.')
				  ->setPayload($workout);

			} else {
        $response->setMessage(
          'The workout could not be saved. Please try again.'
        );
			}
		}

		return $response->get();
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
      $this->goHome(__('You are not allowed to delete this workout', true));
    }

    // The workout was successfully deleted
		if ($this->Workout->delete($wid)) {
		  $this->goHome(__('Workout deleted', true));
		}

    // Something went wrong
		$this->goHome(__('Workout was not deleted', true));
	}

	public function ajax_delete($wid = null) {
    $user = $this->requireLoggedInUser();

    $this->setIsAjax();
    $response = new Response();

		if (!$wid) {
			$this->goHome(__('Invalid id for workout', true));
		}

    $data =
      $this->Workout->find('first', array(
        'conditions' => array('Workout.id' => $wid),
      ));

    // Make sure users only delete their own workouts!
    if ($data['User']['id'] != $user) {
      $this->goHome(__('You are not allowed to delete this workout', true));
    }

    // The workout was successfully deleted
		if ($this->Workout->delete($wid)) {
		  $response
		    ->setSuccess(true)
		    ->setPayload($wid)
		    ->setMessage(__('Your workout was deleted', 1));
		} else {
		  $response->setMessage(
		    __('Sorry, we couldn\'t delete your workout for some reason', 1)
		  );
		}

    return $response->get();
	}

  /**
   * Same as getShoesForWorkout, but formatted for JSON
   */
  protected function getShoesForWorkoutJSON() {
    $shoes = $this->Workout->Shoe->find('all', array(
		  'conditions' => array(
        'Shoe.user_id' => $this->Auth->User('id'),
      ),
    ));
    return json_encode($this->Workout->Shoe->sortShoesForJSON($shoes));
  }

  /**
   * Get info about friends associated with a particular workout
   *
   * @param   str  Comma delimited string of fbids: "11,4280"
   * @returns arr
   */
  public function getWorkoutFriends(/*string*/ $friends) {
    if (!isset($friends)) {
      return array();
    }
    $friends = explode(',', $friends);
    return array_values($this->getPublicFbUserData($friends));
  }

  /**
   * Formats workout data when adding or editing to properly write to the DB.
   */
  private function formatWorkoutDataForWrite() {
    if ($this->layout !== 'ajax') {
      // Take hh:mm:ss and convert to seconds
      $this->data['Workout']['time'] = time_to_sec(array(
        $this->data['Workout']['hh'],
        $this->data['Workout']['mm'],
        $this->data['Workout']['ss']
      ));
  
      // Unset the hh:mm:ss data
      unset($this->data['Workout']['hh']);
      unset($this->data['Workout']['mm']);
      unset($this->data['Workout']['ss']);
    }

    // Convert friends to a string if they're in array form
    $friends = idx($this->data['Workout'], 'friends', array());
    if (is_array($friends) && !empty($friends)) {
      $f = array();
      foreach ($friends as $friend) {
        $f[] = $friend['id'];
      }
      $this->data['Workout']['friends'] = implode($f, ',');
    }

    // Be sure to escape notes entries
	  $this->data['Workout']['notes'] =
      htmlspecialchars(idx($this->data['Workout'], 'notes'), ENT_QUOTES);
  }
}
