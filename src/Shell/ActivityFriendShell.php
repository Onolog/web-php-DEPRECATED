<?php
namespace App\Shell;

use Cake\Console\Shell;

class ActivityFriendShell extends Shell {
  public function initialize() {
    parent::initialize();
    $this->loadModel('Activities');
    $this->loadModel('ActivitiesFriends');
  }

  public function main() {
    $activities = $this->Activities->find('all', [
      'fields' => ['friends', 'id'],
    ]);

    foreach ($activities as $activity) {
      $friends = $activity['friends'];
      if (!empty($friends)) {
        $friends_arr = explode(',', $friends);

        foreach ($friends_arr as $fbid) {
          $activityFriend = $this->ActivitiesFriends->newEntity([
            'activity_id' => $activity['id'],
            'user_id' => $fbid,
          ]);
          $this->ActivitiesFriends->save($activityFriend);
        }
      }
    }
  }
}
