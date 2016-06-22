<?php
namespace App\Model\Table;

use App\Model\Entity\Split;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Splits Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Activities
 */
class SplitsTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->table('splits');
        $this->displayField('id');
        $this->primaryKey('id');

        $this->belongsTo('Activities', [
            'foreignKey' => 'activity_id'
        ]);
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('id')
            ->allowEmpty('id', 'create');

        $validator
            ->integer('split')
            ->allowEmpty('split');

        $validator
            ->decimal('distance')
            ->allowEmpty('distance');

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
            ->decimal('elevation_change')
            ->allowEmpty('elevation_change');

        $validator
            ->decimal('elevation_gain')
            ->allowEmpty('elevation_gain');

        $validator
            ->decimal('elevation_loss')
            ->allowEmpty('elevation_loss');

        $validator
            ->decimal('max_speed')
            ->allowEmpty('max_speed');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules)
    {
        $rules->add($rules->existsIn(['activity_id'], 'Activities'));
        return $rules;
    }
}
