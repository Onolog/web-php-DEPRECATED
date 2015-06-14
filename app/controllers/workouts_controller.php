<?php
class WorkoutsController extends AppController {

	var $name = 'Workouts';

	function beforeFilter() {
    parent::beforeFilter();
    $this->Auth->allowedActions = array('*');
  }

  /**
   * Retrieves all workouts for a given month, including the last week of
   * the previous month and the first week of the next month.
   */
  public function ajax_calendar() {
    $user = $this->requireLoggedInUser();

    $this->setIsAjax();
    $response = new Response();

    $url = $this->params['url'];
    $year = idx($url, 'year', 0);
    $month = idx($url, 'month', 0);

    if (!$year || !$month) {
      return $response
        ->setMessage('Please enter a valid date.')
        ->send();
    }

    $workouts = $this->Workout->find('all', array(
      'conditions' => array(
        'Workout.user_id' => $user,
        // Only get workouts for the selected month, + or - a week
        'Workout.date >=' => mktime(0, 0, 0, $month, -7, $year),
        'Workout.date <=' => mktime(0, 0, 0, $month+1, 7, $year),
      ),
      'order'  => 'Workout.date ASC'
    ));

    return $response
      ->setSuccess(true)
      ->setPayload($this->Workout->flattenWorkouts($workouts))
      ->send();
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

    $workout = $this->populateWorkoutForView($workout);
		$viewer = $this->Auth->User('id');

    $this->set(compact('workout', 'viewer'));
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
        $workout = $this->populateWorkoutForView($workout);
        $response
          ->setSuccess(true)
          ->setPayload($workout['Workout'])
          ->setField(
            'isOwner',
            $workout['User']['id'] === $this->Auth->User('id')
          );
      }
		}
    return $response->send();
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

			$this->Workout->create();
			if ($this->Workout->save($this->data)) {
				$this->Session->setFlash(__('Your workout was added', 1));

        // Display the newly-added workout
				$this->redirect(array(
          'controller' => 'workouts',
          'action' => 'view',
          $this->Workout->id
        ));
			} else {
				$this->Session->setFlash(
          __('Your workout could not be added. Please try again.', 1)
        );
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
			  $workout = $this->Workout->read(null, $this->Workout->id);
			  $response
				  ->setSuccess(true)
			    ->setPayload($workout['Workout'])
				  ->setMessage('Your workout was added');
			} else {
				$response->setMessage('Your workout could not be added. Please try again.');
			}
		}
    return $response->send();
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

    $json_shoes = $this->getShoesForWorkoutJSON();

		$this->set(compact('json_shoes'));
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
        ->send();
		}

    // On submit, update the workout
		if (!empty($this->data)) {
      // Make sure users only edit their own workouts!
      if ($this->data['Workout']['user_id'] !== $user) {
        return $response
          ->setMessage('You are not allowed to edit this workout.')
          ->send();
      }

      $this->formatWorkoutDataForWrite();

			if ($this->Workout->save($this->data)) {
        $response
          ->setSuccess(true)
				  ->setMessage('Your workout was successfully updated.')
				  ->setPayload($this->data['Workout']);

			} else {
        $response->setMessage(
          'The workout could not be saved. Please try again.'
        );
			}
		}

		return $response->send();
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

    return $response->send();
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

  protected function populateWorkoutForView($workout) {
    // Shoe info
    $shoes = $this->Workout->Shoe->read(
      null,
      $workout['Workout']['shoes']['id']
    );
    $workout['Workout']['shoes'] = array(
      'id' => $shoes['id'],
      'name' => $shoes['name']
    );

    return $workout;
  }

  /**
   * Formats workout data when adding or editing to properly write to the DB.
   */
  private function formatWorkoutDataForWrite() {
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
	  $this->data['Workout']['notes'] = htmlspecialchars(
      idx($this->data['Workout'],'notes'),
      ENT_QUOTES,
      'UTF-8'
    );
  }
}
