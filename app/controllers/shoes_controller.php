<?php
class ShoesController extends AppController {

	var $name = 'Shoes';

  function beforeFilter() {
    parent::beforeFilter(); 
    $this->Auth->allowedActions = array('*');
  }

  /**
   * Retrieve all the user's shoes
   */
  public function ajax_all() {
    $user = $this->requireLoggedInUser();
    $this->setIsAjax();
    $response = new Response();

    // Get all the user's shoes
    $shoes = $this->Shoe->find(
      'all', array(
        'conditions' => array('Shoe.user_id' => $user),
      )
    );

    // Unset all the activities
    // TODO: We don't *really* need to do this, but character encoding is
    // currently not UTF-8, so when we try to json_encode the shoe data, nothing
    // gets returned :/
    foreach ($shoes as $key => $shoe) {
      unset($shoe['activities']);
      $shoes[$key] = $shoe;
    }

    return $response
      ->setSuccess(true)
      ->setPayload($shoes)
      ->send();
  }

	public function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid shoe', true));
			$this->redirect(array('action' => 'index'));
		}
		$shoe = $this->Shoe->read(null, $id);

    // Does the shoe belong to the person viewing it?
		$can_edit = $shoe['user_id'] === $this->Auth->User('id');
    $shoe = json_encode($shoe);

		$this->set(compact(
      'can_edit',
      'shoe'
    ));
	}

  /**
   * Retrieve data for a single shoe
   */
  public function ajax_view($id = null) {
    $this->setIsAjax();
    $response = new Response();

    if (!$id) {
      return $response
        ->setMessage('That shoe doesn\'t exist.')
        ->send();
    }

    $shoe = $this->Shoe->read(null, $id);

    return $response
      ->setSuccess(true)
      ->setPayload($shoe)
      ->send();
  }

	public function add() {
    $user = $this->requireLoggedInUser();

		if (!empty($this->data)) {
		  // Add the user id and activity state to the data
      $this->data['Shoe']['user_id'] = $user;
      $this->data['Shoe']['inactive'] = 0; // A newly created shoe is active

			$this->Shoe->create();
			if ($this->Shoe->save($this->data)) {
				$this->Session->setFlash(__('Your new shoe has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The shoe could not be saved. Please, try again.', true));
			}
		}

		$brands = $this->Shoe->Brand->find('list');
		$this->set('brands', $brands);
	}

	public function edit($id = null) {
    $user = $this->requireLoggedInUser();

		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid shoe', true));
			$this->redirect(array('action' => 'index'));
		}

		if (!empty($this->data)) {
			if ($this->Shoe->save($this->data)) {
				$this->Session->setFlash(__('The shoe has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The shoe could not be saved. Please, try again.', true));
			}
		}

    // Get all the data for the shoe
		if (empty($this->data)) {
			$this->data['Shoe'] = $this->Shoe->read(null, $id);
		}

    // Validate that the person trying to edit actually owns the shoe
    if ($this->data['Shoe']['user_id'] !== $user) {
      $this->Session->setFlash(__('You are not allowed to edit this shoe', true));
      $this->redirect(array(
        'controller' => 'users',
        'action' => 'index'
      ));
    }

		$this->set('brands', $this->Shoe->Brand->find('list'));
    $this->set('shoe', $this->data['Shoe']);
	}

	public function delete($sid = null) {
    $user = $this->requireLoggedInUser();

		if (!$sid) {
			$this->Session->setFlash(__('Invalid id for shoe', true));
			$this->redirect(array('action'=>'index'));
		}

    $data =
      $this->Shoe->find('first', array(
        'conditions' => array('Shoe.id' => $sid),
      ));

    // Validate that the person trying to delete actually owns the shoe
    if ($data['user_id'] !== $user) {
      $this->Session->setFlash(__('You are not allowed to delete this shoe', true));
      $this->redirect(array(
        'controller' => 'users',
        'action' => 'index'
      ));
    }

		if ($this->Shoe->delete($sid)) {
			$this->Session->setFlash(__('Shoe deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Shoe was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}

  public function ajax_get() {
    $this->layout = 'ajax';
    $this->autoLayout = false;
    $this->autoRender = false;

    $user = $this->requireLoggedInUser();
    $this->set('title_for_layout', 'Shoes');

    // Get all the user's shoes
    $shoes = $this->Shoe->find(
      'all', array(
        'conditions' => array('Shoe.user_id' => $user),
      )
    );

    $shoes = $this->User->Shoe->groupByActivity($shoes);
    return json_encode($shoes);
  }

}
