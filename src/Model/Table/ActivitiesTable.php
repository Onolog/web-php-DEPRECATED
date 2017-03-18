<?php
namespace App\Model\Table;

use App\Model\Entity\Activity;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Activities Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Users
 * @property \Cake\ORM\Association\BelongsTo $Shoes
 * @property \Cake\ORM\Association\HasMany $Laps
 */
class ActivitiesTable extends Table {

  /**
   * Initialize method
   *
   * @param array $config The configuration for the Table.
   * @return void
   */
  public function initialize(array $config) {
    parent::initialize($config);

    $this->table('activities');
    $this->displayField('id');
    $this->primaryKey('id');

    $this->belongsTo('Users', [
        'foreignKey' => 'user_id',
        'joinType' => 'INNER'
    ]);
    $this->belongsTo('Shoes', [
        'foreignKey' => 'shoe_id'
    ]);
    $this->hasMany('Laps', [
        'foreignKey' => 'activity_id'
    ]);
  }

  /**
   * Get recent activities for a user's Activity Feed.
   *
   * @param int $user_id  The user's id.
   * @param int $limit    The number of results to return.
   *
   * @return array        The array of activities.
   *
   * TODO: Modify this to make pagination easier, so we can load new results.
   */
  public function getActivityFeed($user_id, $limit=10) {
    return $this->find()
      ->where(['user_id' => $user_id])
      ->order(['start_date' => 'DESC'])
      ->limit($limit);
  }

  /**
   * For the given user, provides the activity count and total distance for:
   *
   *    - The current year to date.
   *    - The current month.
   *    - The current week.
   *
   * @param int $user_id  The user's id.
   * @return array        The array of summary data.
   */
  public function getActivitySummary($user_id) {
    $query = $this->find()->where([
      'user_id' => $user_id,
      'YEAR(Activities.start_date)' => date('Y'), // Current year
    ]);

    return [
      'year' => $this->processStats($query),
      'month' => $this->getMonthStats($query),
      'week' => $this->getWeekStats($query),
    ];
  }

  private function getMonthStats($query) {
    return $this->processStats($query->where([
      'MONTH(Activities.start_date)' => date('n'), // Current month
    ]));
  }

  private function getWeekStats($query) {
    return $this->processStats($query->where([
      'WEEK(Activities.start_date)' => date('W'), // Current week
    ]));
  }

  private function processStats($activities) {
    $stats = [];
    foreach ($activities as $activity) {
      $stats[] = $activity['distance'];
    }

    return [
      'activity_count' => count($stats),
      'distance' => array_sum($stats),
    ];
  }

  /**
   * Default validation rules.
   *
   * @param \Cake\Validation\Validator $validator Validator instance.
   * @return \Cake\Validation\Validator
   */
  public function validationDefault(Validator $validator) {
    $validator
        ->integer('id')
        ->allowEmpty('id', 'create');

    $validator
        ->allowEmpty('activity_type');

    $validator
        ->requirePresence('start_date', 'create')
        ->notEmpty('start_date');

    $validator
        ->requirePresence('timezone', 'create')
        ->notEmpty('timezone');

    $validator
        ->decimal('distance')
        ->requirePresence('distance', 'create')
        ->notEmpty('distance');

    $validator
        ->integer('duration')
        ->allowEmpty('duration');

    $validator
        ->integer('avg_hr')
        ->allowEmpty('avg_hr');

    $validator
        ->integer('max_hr')
        ->allowEmpty('max_hr');

    $validator
        ->integer('calories')
        ->allowEmpty('calories');

    $validator
        ->allowEmpty('notes');

    $validator
        ->allowEmpty('friends');

    $validator
        ->integer('garmin_activity_id')
        ->allowEmpty('garmin_activity_id');

    $validator
        ->integer('elevation_gain')
        ->allowEmpty('elevation_gain');

    $validator
        ->integer('elevation_loss')
        ->allowEmpty('elevation_loss');

    return $validator;
  }

  /**
   * Returns a rules checker object that will be used for validating
   * application integrity.
   *
   * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
   * @return \Cake\ORM\RulesChecker
   */
  public function buildRules(RulesChecker $rules) {
    $rules->add($rules->existsIn(['user_id'], 'Users'));
    $rules->add($rules->existsIn(['shoe_id'], 'Shoes'));
    return $rules;
  }
}
