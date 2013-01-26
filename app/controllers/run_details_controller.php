<?php
class RunDetailsController extends AppController {

	var $name = 'RunDetails';

	function beforeFilter() {
    parent::beforeFilter();

    $this->Auth->allowedActions = array('*');
  }

  /**
   * Lets the user add a run
   *
   * TODO: Don't let the user submit an empty run
   * TODO: Can this somehow be combined with edit()?
   * 
   * @param   int   $date   unix timestamp of the run date
   *
	public function add($date=null) {
    $user = $this->requireLoggedInUser();

    // If there's no date selected, default to today.
    if (!$date) {
      $date = time();
    }

    // On form submission
		if (!empty($this->data)) {

      // First create and save the run
      $this->data['Run']['date'] = $date;
      $this->Run->create();
      $this->Run->save($this->data);

      $this->data['RunDetail']['run_id'] = $this->Run->id;

      // Format the time back to seconds
		  $time = array(
		    $this->data['RunDetail']['hh'],
		    $this->data['RunDetail']['mm'],
		    $this->data['RunDetail']['ss']
		  );
		  $this->data['RunDetail']['time'] = $this->Run->timeToSec($time);
		  debug($this->data);

      // Create the run details for each associated user
      $users = array();
      $users[] = $user; // Start with the user who is creating the run

      // Get any associated friends
      $friends = array();
      if (idx($this->data['Run'], 'friends')) {
        $friends = explode(',', $this->data['Run']['friends']);
      }
      unset($this->data['Run']['friends']);

      debug($friends);
      if (!empty($friends)) {
        $users = array_merge($users, $friends);
      }
      debug($users);

      foreach ($users as $run_user) {
        if ($run_user != $user) {
          // If it's not the logged-in user, don't save the notes or shoe info
          unset($this->data['RunDetail']['notes']);
          unset($this->data['RunDetail']['shoe_id']);
        }
        $this->data['RunDetail']['user_id'] = $run_user;
        if (!$this->Run->RunDetail->save($this->data)) {
          $errors[] = $run_user;
        }
      }
      debug($errors);

      /*
			if ($this->Run->save($this->data)) {
				$this->Session->setFlash(__('Your run was added', 1));
				$this->redirect(array(
				  'action' => 'view',
				  $this->Run->id
				));
			} else {
				$this->Session->setFlash(__('Your run could not be added. Please try again.', 1));
			}
		}

    $title = __('Run for ', 1) . date('F jS, Y', $date);
    $this->set('title_for_layout', $title);

    // Get all the user's shoes and split into active and inactive
    /*
    $shoes = $this->Run->Shoe->find('all', array(
		  'conditions' => array(
        'Shoe.user_id' => $this->Auth->User('id'),
      ),
    ));
    $shoes = $this->Run->Shoe->sortActiveShoes($shoes);

		$this->set(compact('shoes', 'date', 'title'));
	}
	*/





}
