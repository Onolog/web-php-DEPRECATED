<?php
class RunsController extends AppController {

	var $name = 'Runs';

	function beforeFilter() {
    parent::beforeFilter();

    $this->Auth->allowedActions = array('*');
  }

  /**
   * Read-only view of a single run with the given id
   *
   * @param int   $id   Run ID
   */
	public function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid run', 1));
			$this->redirect(array('action' => 'index'));
		}

    // Retrieve the Run and RunDetail data
    $run = $this->Run->RunDetail->find('all', array(
      'conditions' => array('RunDetail.id' => $id)
    ));
    $run = idx($run, 0, array());

    if (empty($run)) {
      // The run doesn't exist. Redirect.
      $this->Session->setFlash(__('That run doesn\'t exist', 1));
			$this->redirect(array('action' => 'index'));
    }

    // Friend info
    // TODO: This throws a lot of errors when a logged out
    // user is viewing the page
    $friends = $this->getRunFriends($run['Run']['id'], $id);

    // Does the run belong to the person viewing it?
		$is_owner = ($run['User']['id'] == $this->Auth->User('id'));

    $brand = $this->Run->Shoe->Brand->read(null, $run['Shoe']['brand_id']);
    $this->set(compact('run', 'brand', 'is_owner', 'friends'));
	}

  /**
   * Allows the user to add a run. This creates a new Run entry, with associated
   * RunDetail entries for the user and any friends they add.
   */
	public function add($date=null) {
    $user = $this->requireLoggedInUser();

    // If there's no date selected, default to today.
    if (!$date) {
      $date = time();
    }

    // On form submission
		if (!empty($this->data)) {

      // First create the Run
      $this->data['Run']['date'] = $date;

      // Create the basic details array
      $details = $this->data['RunDetail'];

      // Format the time back to seconds
		  $time = array(
		    $this->data['RunDetail']['hh'],
		    $this->data['RunDetail']['mm'],
		    $this->data['RunDetail']['ss']
		  );
		  $details['time'] = time_to_sec($time);
      unset($this->data['RunDetail']); // Unset the original array

      // Create the run details for each associated user
      // Start with the user creating the run
      $users = array($user);
      if (idx($this->data['Run'], 'friends')) {
        // Add any associated friends
        $friends = explode(',', $this->data['Run']['friends']);
        $users = array_merge($users, $friends);
      }

      foreach ($users as $key => $run_user) {
        $details['user_id'] = $run_user;

        if ($run_user != $user) {
          // If it's not the logged-in user, don't save the notes or shoe info
          unset($details['notes']);
          unset($details['shoe_id']);
        }
        $this->data['RunDetail'][$key] = $details;
      }

			if ($this->Run->saveAll($this->data, array('validate' => false))) {
				$this->Session->setFlash(__('Your run was added', 1));
				$this->redirect(array(
				  'action' => 'view',
				  $this->Run->id
				));
			} else {
        debug($this->Run->invalidFields());
				$this->Session->setFlash(__('Your run could not be added. Please try again.', 1));
			}
		}

    $title = __('Run for ', 1) . date('F jS, Y', $date);
    $this->set('title_for_layout', $title);

    // Get all the user's shoes and split into active and inactive
    $shoes = $this->Run->Shoe->find('all', array(
		  'conditions' => array(
        'Shoe.user_id' => $user,
      ),
    ));
    $shoes = $this->Run->Shoe->sortActiveShoes($shoes);

		$this->set(compact('shoes', 'date', 'title'));
	}


  /**
   * Lets the user edit run details for a given Run entry and User
   *
   * Note: This only updates the RunDetails entry and does not affect the Run
   * entry or create a new one.
   *
   * @param   int   $wid   Run id
   */
	public function edit($rid = null) {
    $user = $this->requireLoggedInUser();

		if (!$wid && empty($this->data)) {
			$this->Session->setFlash(__('Invalid run', true));
			$this->redirect(array(
        'controller' => 'users',
        'action' => 'index'
      ));
		}

    // On update
		if (!empty($this->data)) {

		  // Format the time back to seconds
		  $time = array(
		    $this->data['Run']['hh'],
		    $this->data['Run']['mm'],
		    $this->data['Run']['ss']
		  );
		  $this->data['Run']['time'] = time_to_sec($time);

			if ($this->Run->save($this->data)) {
				$this->Session->setFlash(__('Run saved', true));
				$this->redirect(array('action' => 'view', $rid));
			} else {
				$this->Session->setFlash(__('The run could not be saved. Please, try again.', true));
			}
		}

		if (empty($this->data)) {
			$this->data = $this->Run->read(null, $rid);

      // Make sure users only edit their own runs!
      if ($this->data['User']['id'] != $user) {
        $this->Session->setFlash(__('You are not allowed to edit this run', true));
        $this->redirect(array(
          'controller' => 'users',
          'action' => 'index'
        ));
      }

      // Format time for display
      $time = sec_to_time($this->data['Run']['time']);
		  $this->data['Run']['hh'] = $time['hh'];
		  $this->data['Run']['mm'] = $time['mm'];
      $this->data['Run']['ss'] = $time['ss'];
		}

    // Display friends associated with the run
    $run_friends = $this->getRunFriends($this->data['Run']['friends']);
        
    $friends = '';
    if (!empty($run_friends)) {
      // Change the array to JSON format so it can be passed to the tokenizer
      $friends = json_encode($run_friends);
    }

    // Get all the user's shoes and split into active and inactive
    $shoes = $this->Run->Shoe->find('all', array(
		  'conditions' => array(
        'Shoe.user_id' => $this->Auth->User('id'),
      ),
    ));
    $shoes = $this->Run->Shoe->sortActiveShoes($shoes);

		$this->set(compact('shoes', 'friends'));
	}

  /**
   * Lets the user delete a given run
   * 
   * @param   int   $id   Run details id
   */
	public function delete($id = null) {
    $user = $this->requireLoggedInUser();

		if (!$id) {
			$this->goHome(__('That run doesn\'t exist', 1));
		}

    $data =
      $this->Run->RunDetail->find('first', array(
        'conditions' => array('RunDetail.id' => $id),
      ));

    // Make sure users only delete their own runs!
    if ($data['User']['id'] != $user) {
      $this->goHome(__('You are not allowed to delete that run', true));
    }

    // The run was successfully deleted
		if ($this->Run->RunDetail->delete($id)) {
			$this->goHome(__('Your run was deleted', true));
		}

    // Something went wrong
		$this->goHome(__('Your run was not deleted', true));
	}

  /**
   * Get info about friends associated with a particular run
   *
   * @param   int   $run_id
   * @param   int   $details_id
   * @returns arr
   */
  public function getRunFriends($run_id=0, $details_id) {
    if (!$run_id || !isset($run_id)) {
      return array();
    }

    // First retrieve the uids for all details associated with this Run
    $details = $this->Run->RunDetail->find('list', array(
      'fields'     => array('RunDetail.user_id'),
      'conditions' => array('RunDetail.run_id' => $run_id)
    ));

    // Remove the owner of the displayed run details from the array
    unset($details[$details_id]);

    // Try and see if the users are already in the system, and get their info
    $users = $this->Run->User->find('all', array(
      'conditions' => array('User.id' => $details),
    ));

    // Put any matching users in the new array
    $run_friends = array();
    if (!empty($users)) {
      foreach ($users as $user) {
        $run_friends[$user['User']['id']] = array(
          'id' => $user['User']['id'],
          'name' => $user['User']['name']
        );
      }
    }

    // If not all the friends are in the system, we need to get their info from FB
    if (count($run_friends) != count($details)) {

      // Populate a new friends array
      $friends = array();
      foreach ($details as $fbid) {
        $friends[$fbid] = $fbid;
      }

      // Unset any friends we already have
      foreach ($run_friends as $fbid => $friend) {
        unset($friends[$fbid]);
      }

      // Match the remaining run friends with the corresponding FB friend
      // Get the user's FB friends
      $fb_friends = $this->getFriends();
      foreach ($fb_friends->data as $friend) {
        foreach ($friends as $fbid) {
          if ($friend->id == $fbid) {
            // Convert the FB friend object to an array
            $run_friends[] = (array)$friend;
            break; // Once we have the info, break out of the loop
          }
        }
      }
    }

    // Reset the array keys since the typeahead doesn't like them
    // and will break otherwise
    return array_values($run_friends);
  }


  /**
   * REMOVE THIS
   *
  public function migrate() {
    $runs = $this->Run->find('all');
    foreach ($runs as $key => $run) {
      $runs[$key]['Run']['user_id'] = $run['User']['fbid'];
      $runs[$key]['Shoe']['user_id'] = $run['User']['fbid'];
      $runs[$key]['User']['id'] = $run['User']['fbid'];
    }

    if ($this->Run->saveAll($runs, array('validate' => false))) {
		  $this->Session->setFlash(__('Migration completed', 1));
		} else {
      debug($this->Run->invalidFields());
		  $this->Session->setFlash(__('Migration Failed.', 1));
		}
    $this->set('runs', $runs);
  }
  */
}
