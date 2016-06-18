<?php
namespace App\Model\Table;

use App\Model\Entity\User;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Users Model
 *
 * @property \Cake\ORM\Association\HasMany $Activities
 * @property \Cake\ORM\Association\HasMany $Shoes
 * @property \Cake\ORM\Association\HasMany $Workouts
 */
class UsersTable extends Table {

  /**
   * Initialize method
   *
   * @param array $config The configuration for the Table.
   * @return void
   */
  public function initialize(array $config) {
    parent::initialize($config);

    $this->table('users');
    $this->displayField('id');
    $this->primaryKey('id');

    $this->addBehavior('Timestamp');

    $this->hasMany('Activities', [
        'foreignKey' => 'user_id'
    ]);
    $this->hasMany('Shoes', [
        'foreignKey' => 'user_id'
    ]);
    $this->hasMany('Workouts', [
        'foreignKey' => 'user_id'
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
          ->allowEmpty('id', 'create');

      $validator
          ->requirePresence('first_name', 'create')
          ->notEmpty('first_name');

      $validator
          ->requirePresence('last_name', 'create')
          ->notEmpty('last_name');

      $validator
          ->email('email')
          ->requirePresence('email', 'create')
          ->notEmpty('email')
          ->add('email', 'unique', ['rule' => 'validateUnique', 'provider' => 'table']);

      $validator
          ->allowEmpty('password');

      $validator
          ->dateTime('last_login')
          ->allowEmpty('last_login');

      $validator
          ->allowEmpty('default_timezone');

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
      $rules->add($rules->isUnique(['email']));
      return $rules;
  }
}
