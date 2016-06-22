<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Trackpoint Entity.
 *
 * @property int $id
 * @property int $activity_id
 * @property \App\Model\Entity\Activity $activity
 * @property string $time
 * @property float $latitude_deg
 * @property float $longitude_deg
 * @property float $altitude_meters
 * @property float $distance_meters
 * @property int $heart_rate_bpm
 * @property float $speed
 */
class Trackpoint extends Entity
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
