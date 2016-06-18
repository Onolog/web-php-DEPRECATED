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
        ->allowEmpty('timezone');

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
