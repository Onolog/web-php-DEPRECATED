<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Split Entity.
 *
 * @property int $id
 * @property int $activity_id
 * @property \App\Model\Entity\Activity $activity
 * @property int $split
 * @property float $distance
 * @property int $duration
 * @property int $avg_hr
 * @property int $max_hr
 * @property int $calories
 * @property float $elevation_change
 * @property float $elevation_gain
 * @property float $elevation_loss
 * @property float $max_speed
 */
class Split extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        '*' => true,
        'id' => false,
    ];
}
