<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\ORM\TableRegistry;

use Cake\Network\Exception\BadRequestException;
use Cake\Network\Exception\InternalErrorException;
use Cake\Network\Exception\NotFoundException;
use Cake\Network\Exception\UnauthorizedException;

/**
 * Shoes Controller
 *
 * @property \App\Model\Table\ShoesTable $Shoes
 */
class ShoesController extends AppController {

  /**
   * Index method
   *
   * @return \Cake\Network\Response|null
   */
  public function index() {
    $user_id = $this->requireLoggedInUser();

    // Get all the user's shoes
    $shoes = $this->Shoes
      ->find()
      ->where(['user_id' => $user_id])
      ->contain(['Activities', 'Brands']);

    if ($this->request->is('ajax')) {
      $this->set(['shoes' => $shoes]);
      return;
    }

    $this->set('shoes', $shoes);
  }

  public function view($id=null) {
    if (!$id) {
      throw new NotFoundException(__('Invalid id.'));
      return;
    }

    $shoe = $this->Shoes->get($id, [
      'contain' => ['Activities', 'Brands'],
    ]);

    if (!$shoe) {
      throw new NotFoundException(__('Sorry, that shoe does not exist.'));
      return;
    }

    // Get all the activities for the shoe.
    $activities = id(TableRegistry::get('Activities'))
      ->find()
      ->where(['shoe_id' => $shoe->id]);

    if (!$this->request->is('ajax')) {
      $this->set(compact(
        'activities',
        'shoe'
      ));
      return;
    }

    $this->set([
      'activities' => $activities,
      'shoe' => $shoe
    ]);
  }

  public function add() {
    $userId = $this->requireLoggedInUser();
    $data = $this->request->data;

    // Add the user id and activity state to the data
    $data['user_id'] = $userId;
    $data['inactive'] = 0; // A newly created shoe is active

    $shoe = $this->Shoes->newEntity($data);
    if ($shoe->errors()) {
      // TODO: Pass more specific errors to the client.
      throw new BadRequestException(
        'There was an error with your submission. Please make sure all the ' .
        'fields are correctly filled out.'
      );
      return;
    }

    if (!$this->Shoes->save($shoe)) {
      throw new InternalErrorException(
        'Sorry, something went wrong and the item could not be saved. Please ' .
        'refresh the page and try again.'
      );
      return;
    }

    $this->set([
      'message' => 'Your shoe was added.',
      'shoe' => $this->Shoes->get($shoe->id, [
        'contain' => ['Brands'],
      ]),
    ]);
  }

  public function edit($id=null) {
    $user_id = $this->requireLoggedInUser();
    $shoe = $this->Shoes->get($id, [
      'contain' => ['Brands'],
    ]);
    $data = $this->request->data;

    if ($shoe->user_id !== $user_id) {
      throw new UnauthorizedException(
        'You are not allowed to modify this item.'
      );
      return;
    }

    // DB expects the `inactive` field to be `0` or `1`.
    // TODO: Super hacky. Handle this better.
    if (isset($data['inactive'])) {
      $inactive = $data['inactive'];

      if ($inactive === 'false' || $inactive === false) {
        $data['inactive'] = 0;
      }

      if ($inactive === 'true' || $inactive === true) {
        $data['inactive'] = 1;
      }
    }

    $this->Shoes->patchEntity($shoe, $data);
    if ($shoe->errors()) {
      // TODO: Pass more specific errors to the client.
      throw new BadRequestException(
        'There was an error with your submission. Please make sure all the ' .
        'fields are correctly filled out.'
      );
      return;
    }

    if (!$this->Shoes->save($shoe)) {
      throw new InternalErrorException(
        'Sorry, we could not update the item. Please refresh the page ' .
        'and try again.'
      );
      return;
    }

    $this->set([
      'message' => 'Your item was successfully updated.',
      'shoe' => $this->Shoes->get($shoe->id, [
        'contain' => ['Activities', 'Brands'],
      ]),
    ]);
  }

  public function delete($id=null) {
    $user_id = $this->requireLoggedInUser();

    if (!$id) {
      throw new NotFoundException(__('Invalid id.'));
      return;
    }

    $shoe = $this->Shoes->get($id);

    // Make sure users only delete their own workouts!
    if ($shoe->user_id !== $user_id) {
      throw new UnauthorizedException('You are not allowed to delete this item.');
      return;
    }

    // Couldn't delete the shoe for some reason.
    if (!$this->Shoes->delete($shoe)) {
      throw new InternalErrorException('Unable to delete.');
      return;
    }

    $this->set([
      'id' => $shoe->id,
      'message' => 'Your shoe was successfully deleted.',
    ]);
  }
}
