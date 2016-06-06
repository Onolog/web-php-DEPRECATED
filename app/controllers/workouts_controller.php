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

    $activities = $this->Workout->getWorkoutsForMonth($year, $month, $user);
    $shoes = $this->Workout->Shoe->getShoesForActivities($activities);

    return $response
      ->setSuccess(true)
      ->setPayload(array(
        'activities' => $activities,
        'shoes' => $shoes,
      ))
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
		$activity = $this->Workout->read(null, $id);
    if (empty($activity)) {
      // The workout doesn't exist. Redirect.
      $this->goHome(__('That workout doesn\'t exist', 1));
    }

    $this->set('activity', $this->populateWorkoutForView($activity));
	}

  /**
   * @param int   $id   Workout ID
   */
	public function ajax_view($id = null) {
    $this->setIsAjax();
    $response = new Response();

		if (!$id) {
			return $response
        ->setMessage('Invalid activity.')
        ->send();
		}

    // Get the workout data
		$workout = $this->Workout->read(null, $id);
    if (empty($workout)) {
      // The workout doesn't exist
      return $response
        ->setMessage('That activity doesn\'t exist.')
        ->send();
    }

    // Success
    $workout = $this->populateWorkoutForView($workout);
    return $response
      ->setSuccess(true)
      ->setPayload(array(
        'activity' => $workout['Workout']
      ))
      ->send();
	}

  /**
   * Allows the user add a workout via ajax.
   */
	public function ajax_add() {
    $this->setIsAjax();
    $response = new Response();

    $user = $this->requireLoggedInUser();

    // On form submission
		if (!empty($this->data)) {
      // Unset the placeholder ID
      unset($this->data['Workout']['id']);
      $this->formatWorkoutDataForWrite();

			$this->Workout->create();
      if ($this->Workout->save($this->data)) {
			  // Return the newly added workout in the response.
			  $workout = $this->Workout->read(null, $this->Workout->id);

        // If there was a shoe associated with the activity, re-fetch the shoe
        // data, since it will have changed.
        // TODO: Do this more efficiently than getting all the shoes.
        $shoes = array();
        if ($this->hasShoe($workout)) {
          $shoes = $this->Workout->Shoe->find('all', array(
            'conditions' => array('Shoe.user_id' => $user),
          ));
        }

			  $response
				  ->setSuccess(true)
			    ->setPayload(array(
            'activity' => $workout['Workout'],
            'shoes' => $shoes,
          ))
				  ->setMessage('Your workout was added');
			} else {
				$response->setMessage('Your workout could not be added. Please try again.');
			}
		}
    return $response->send();
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
		if (empty($this->data)) {
      return $response
        ->setMessage('No data sent.')
        ->send();
    }

    // Make sure users only edit their own workouts!
    if ($this->data['Workout']['user_id'] !== $user) {
      return $response
        ->setMessage('You are not allowed to edit this activity.')
        ->send();
    }

    $this->formatWorkoutDataForWrite();

		if ($this->Workout->save($this->data)) {

      // Update shoe data if the workout had a shoe associated with it.
      if ($this->hasShoe($this->data)) {
        $shoes = $this->Workout->Shoe->find('all', array(
          'conditions' => array('Shoe.user_id' => $user),
        ));
      }

      return $response
        ->setSuccess(true)
			  ->setMessage('Your activity was successfully updated.')
			  ->setPayload(array(
          'activity' => $this->data['Workout'],
          'shoes' => $shoes,
        ))
        ->send();
		}

    return $response
      ->setMessage('The activity could not be saved. Please try again.')
      ->send();
	}

	public function ajax_delete($wid) {
    $user = $this->requireLoggedInUser();
    $this->setIsAjax();
    $response = new Response();

		if (!$wid) {
			$this->goHome(__('Invalid id for workout', true));
		}

    $workout = $this->Workout->find('first', array(
      'conditions' => array('Workout.id' => $wid),
    ));

    // Make sure users only delete their own workouts!
    if ($workout['User']['id'] != $user) {
      return $response
        ->setMessage('You are not allowed to delete this activity')
        ->send();
    }

    // The workout was successfully deleted
		if ($this->Workout->delete($wid)) {

      // Update shoe data if the workout had a shoe associated with it.
      $shoes = array();
      if ($this->hasShoe($workout)) {
        $shoes = $this->Workout->Shoe->find('all', array(
          'conditions' => array('Shoe.user_id' => $user),
        ));
      }

		  return $response
		    ->setSuccess(true)
		    ->setPayload(array(
          'id' => $wid,
          'shoes' => $shoes,
        ))
		    ->setMessage(__('Your activity was deleted', 1))
        ->send();
		}

	  return $response
      ->setMessage(
        'Sorry, the activity could not be deleted. Please refresh the page ' .
        'and try again.'
  	  )
      ->send();
	}

  protected function populateWorkoutForView($workout) {
    $shoeId = $workout['Workout']['shoe_id'];

    if ($shoeId) {
      $shoe = $this->Workout->Shoe->find('first', array(
        'conditions' => array('Shoe.id' => $shoeId),
        'recursive' => 0,
      ));
      $shoeData = $this->Workout->getActivityDataForShoe($shoeId);
      $shoe = array_merge($shoe, $shoeData);

      $workout['Workout']['shoes'] = $shoe;
    }

    return $workout;
  }

  /**
   * Formats workout data when adding or editing to properly write to the DB.
   */
  private function formatWorkoutDataForWrite() {
    // Add the logged-in user's ID
    $this->data['Workout']['user_id'] = $this->getLoggedInUser();

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

  private function hasShoe($workout) {
    return isset($workout['Workout']['shoe_id']);
  }

  public function migrate_dates() {
    $user = $this->requireLoggedInUser();

    $workouts = $this->Workout->find('all');

    foreach ($workouts as $workout) {
      $date = $workout['Workout']['date'];

      // YYYY-MM-DDThh:mm:ss+zz:zz
      $workout['Workout']['start_date'] = date('Y-m-d\TH:i:sP', $date);
      $workout['Workout']['timezone'] = 'America/Los_Angeles';

      echo 'Saving workout ' . $workout['Workout']['id'] . '...<br/>';
      $this->Workout->save($workout);
    }
  }
}
