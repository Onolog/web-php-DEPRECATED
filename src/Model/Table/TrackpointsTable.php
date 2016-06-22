<?php
namespace App\Model\Table;

use App\Model\Entity\Trackpoint;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Trackpoints Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Activities
 */
class TrackpointsTable extends Table
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

        $this->table('trackpoints');
        $this->displayField('id');
        $this->primaryKey('id');

        $this->belongsTo('Activities', [
            'foreignKey' => 'activity_id',
            'joinType' => 'INNER'
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
            ->allowEmpty('time');

        $validator
            ->decimal('latitude_deg')
            ->requirePresence('latitude_deg', 'create')
            ->notEmpty('latitude_deg');

        $validator
            ->decimal('longitude_deg')
            ->requirePresence('longitude_deg', 'create')
            ->notEmpty('longitude_deg');

        $validator
            ->decimal('altitude_meters')
            ->allowEmpty('altitude_meters');

        $validator
            ->decimal('distance_meters')
            ->allowEmpty('distance_meters');

        $validator
            ->integer('heart_rate_bpm')
            ->allowEmpty('heart_rate_bpm');

        $validator
            ->decimal('speed')
            ->allowEmpty('speed');

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
