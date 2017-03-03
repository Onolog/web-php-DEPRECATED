<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
use Cake\Network\Exception\BadRequestException;
use Cake\Network\Exception\InternalErrorException;
use Cake\Network\Exception\NotFoundException;
use Cake\Network\Exception\UnauthorizedException;
use Cake\ORM\TableRegistry;
use Cake\Utility\Xml;

/**
 * Activities Controller
 *
 * @property \App\Model\Table\ActivitiesTable $Activities
 */
class ActivitiesController extends AppController {

  public function beforeFilter(Event $event) {
    parent::beforeFilter($event);
    $this->Auth->allow('*');
  }

  /**
   * Default "Home" view. User must be logged in to see this page.
   */
  public function index() {
    $user_id = $this->requireLoggedInUser();

    // In a normal GET request, the year and month are passed as params in the
    // URL, (eg: '/2016/06') and are contained in the `params` object. In an
    // ajax request, they're passed as data in a query string and are therefore
    // in the `query` object eg: '/index.json?month=6&year=2016'.
    $isAjax = $this->request->is('ajax');
    $params = $isAjax ? $this->request->query : $this->request->params;

    $year = idx($params, 'year', 0);
    $month = idx($params, 'month', 0);

    if (!$year || !$month) {
      $this->redirect(date('/Y/m'));
    }

    $start = mktime(0, 0, 0, $month, -7, $year);
    $end = mktime(0, 0, 0, $month+1, 7, $year);

    $activities = $this->Activities->find()
      ->where([
        'user_id' => $user_id,
        'start_date >=' => date('c', $start),
        'start_date <=' => date('c', $end),
      ])
      ->order(['start_date' => 'ASC'])
      ->contain(['Users']);

    // TODO: Fetch only the shoe data we actually need.
    $shoeQuery = id(TableRegistry::get('Shoes'))->find();
    $shoes = $shoeQuery
      ->where(['user_id' => $user_id])
      ->contain(['Activities', 'Brands']);

    $user = id(TableRegistry::get('Users'))->get($user_id);

    $this->set([
      'activities' => $activities,
      'shoes' => $shoes,
      'users' => [$user],
    ]);
  }

  /**
   * @param int   $id   Activity id
   */
  public function view($id=null) {
    // Override the common view template to allow custom tags and data.
    $this->viewBuilder()->templatePath('Activities');
    $this->viewBuilder()->template('view');

    if (!$id) {
      throw new NotFoundException(__('Invalid id.'));
    }

    // Get the activity data.
    $activity = $this->Activities->get($id);

    if (empty($activity)) {
      throw new NotFoundException(__('Sorry, that activity does not exist.'));
    }

    $user_id = $activity->user_id;
    $shoesTable = id(TableRegistry::get('Shoes'));

    if ((int) $this->Auth->User('id') === $user_id) {
      // If the viewer is looking at their own activity, it is editable and we
      // send down all their shoes in case they edit the activity.
      $shoes = $shoesTable
        ->find()
        ->where(['user_id' => $user_id])
        ->contain(['Activities', 'Brands']);
    } else {
      // Just send down the shoe associated with the activity.
      $shoes = [$shoesTable->get($activity->shoe_id, [
        'contain' => ['Brands']
      ])];
    }

    $user = id(TableRegistry::get('Users'))->get($user_id);

    $this->set([
      'activities' => [$activity],
      'shoes' => $shoes,
      'users' => [$user],
    ]);
  }

  /**
   * @param   int   $id   Activity id
   */
  public function add() {
    $user_id = $this->requireLoggedInUser();
    $data = $this->request->data;

    unset($data['id']); // Unset the placeholder ID
    $data['user_id'] = $user_id; // Add the logged-in user's ID

    $activity = $this->Activities->newEntity(
      $this->formatActivityDataForWrite($data)
    );

    if ($activity->errors()) {
      throw new BadRequestException(
        'There was an error with your entry. Please make sure all the ' .
        'fields are correctly filled out.'
      );
    }

    if (!$this->Activities->save($activity)) {
      throw new InternalErrorException(
        'Sorry, something went wrong and the item could not be saved. Please ' .
        'refresh the page and try again.'
      );
    }

    $this->set([
      'activity' => $this->Activities->get($activity->id, [
        'contain' => ['Users'],
      ]),
      'message' => 'Your activity was successfully added.',
      'shoe' => $this->getUpdatedShoe($activity->shoe_id),
    ]);
  }

  /**
   * @param   int   $id   Activity id
   */
  public function edit($id=null) {
    $user_id = $this->requireLoggedInUser();
    $activity = $this->Activities->get($id);

    // Make sure users only edit their own workouts!
    if ($activity->user_id !== $user_id) {
      throw new UnauthorizedException(
        'You are not allowed to modify this activity.'
      );
    }

    $data = $this->formatActivityDataForWrite($this->request->data);
    $this->Activities->patchEntity($activity, $data, [
     'associated' => ['Users' => ['validate' => false]]
    ]);

    if ($activity->errors()) {
      // TODO: Enumerate errors for the client.
      throw new BadRequestException(
        'There was an error with your entry. Please make sure all the ' .
        'fields are correctly filled out.'
      );
    }

    if (!$this->Activities->save($activity)) {
      throw new InternalErrorException(
        'Sorry, we could not update the activity. Please refresh the page ' .
        'and try again.'
      );
    }

    $this->set([
      'activity' => $activity,
      'message' => 'Your activity was successfully updated.',
      'shoe' => $this->getUpdatedShoe($activity->shoe_id),
    ]);
  }

  public function delete($id) {
    $user_id = $this->requireLoggedInUser();

    if (!$id) {
      throw new NotFoundException(__('Invalid id.'));
    }

    $activity = $this->Activities->get($id);
    $shoe_id = $activity->shoe_id;

    // Make sure users only delete their own workouts!
    if ($activity->user_id !== $user_id) {
      throw new UnauthorizedException(
        'You are not allowed to delete this activity.'
      );
    }

    if (!$this->Activities->delete($activity)) {
      throw new InternalErrorException(
        'Sorry, we could not delete the activity. Please refresh the page ' .
        'and try again.'
      );
    }

    $this->set([
      'id' => $activity->id,
      'message' => 'Your activity was successfully deleted.',
      'shoe' => $this->getUpdatedShoe($shoe_id),
    ]);
  }

  public function scrape($activityId=null) {
    $baseUrl = 'https://connect.garmin.com/proxy';

    if ($activityId) {
      $activity_url = "{$baseUrl}/activity-service/activity/{$activityId}";
      $weather_url = "{$baseUrl}/weather-service/weather/{$activityId}";

      $activity_json = file_get_contents($activity_url);
      $details_json = file_get_contents("{$activity_url}/details");
      $splits_json = file_get_contents("{$activity_url}/splits");
      $weather_json = file_get_contents($weather_url);

      $this->set([
        'activity' => json_decode($activity_json),
        'details' => json_decode($details_json),
        'splits' => json_decode($splits_json),
        'weather' => json_decode($weather_json),
      ]);
    }
  }

  /**
   * Update shoe data if the workout had a shoe associated with it.
   */
  private function getUpdatedShoe($shoeId) {
    $shoe = null;
    if ($shoeId) {
      $shoe = id(TableRegistry::get('Shoes'))->get($shoeId, [
        'contain' => ['Activities', 'Brands'],
      ]);
    }
    return $shoe;
  }

  /**
   * Formats workout data when adding or editing to properly write to the DB.
   */
  private function formatActivityDataForWrite($data) {
    // Remove the `user` object so it's not part of the `save` action.
    // TODO: Is there a better way to omit this?
    if (isset($data['user'])) {
      unset($data['user']);
    }

    // Convert friends to a string if they're in array form
    $friends = idx($data, 'friends', []);
    if (is_array($friends) && !empty($friends)) {
      $f = [];
      foreach ($friends as $friend) {
        $f[] = $friend['id'];
      }
      $data['friends'] = implode($f, ',');
    }

    // Escape notes entries.
    $data['notes'] = htmlspecialchars(idx($data,'notes'), ENT_QUOTES, 'UTF-8');

    return $data;
  }
}
