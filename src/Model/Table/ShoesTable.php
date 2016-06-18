<?php
namespace App\Model\Table;

use App\Model\Entity\Shoe;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Shoes Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Brands
 * @property \Cake\ORM\Association\BelongsTo $Users
 * @property \Cake\ORM\Association\HasMany $Activities
 * @property \Cake\ORM\Association\HasMany $Workouts
 */
class ShoesTable extends Table {

  /**
   * Initialize method
   *
   * @param array $config The configuration for the Table.
   * @return void
   */
  public function initialize(array $config) {
    parent::initialize($config);

    $this->table('shoes');
    $this->displayField('id');
    $this->primaryKey('id');

    $this->belongsTo('Brands', [
      'foreignKey' => 'brand_id'
    ]);
    $this->belongsTo('Users', [
      'foreignKey' => 'user_id',
      'joinType' => 'INNER'
    ]);
    $this->hasMany('Activities', [
      'foreignKey' => 'shoe_id'
    ]);
    $this->hasMany('Workouts', [
      'foreignKey' => 'shoe_id'
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
      ->naturalNumber('brand_id', 'Please select a brand.')
      ->requirePresence('brand_id', 'create');

    $validator
      ->requirePresence('model', 'create')
      ->notEmpty('model', 'Please enter a model name.');

    $validator
      ->boolean('inactive')
      ->requirePresence('inactive', 'create')
      ->notEmpty('inactive');

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
    $rules->add($rules->existsIn(['brand_id'], 'Brands'));
    $rules->add($rules->existsIn(['user_id'], 'Users'));
    return $rules;
  }
}
