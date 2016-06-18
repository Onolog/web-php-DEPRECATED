<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Activity Entity.
 *
 * @property int $id
 * @property int $user_id
 * @property \App\Model\Entity\User $user
 * @property string $activity_type
 * @property string $start_date
 * @property string $timezone
 * @property float $distance
 * @property int $duration
 * @property int $avg_hr
 * @property int $max_hr
 * @property int $calories
 * @property int $shoe_id
 * @property \App\Model\Entity\Shoe $shoe
 * @property string $notes
 * @property string $friends
 * @property \App\Model\Entity\Lap[] $laps
 */
class Activity extends Entity {
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

  protected function _getNotes() {
    return html_entity_decode($this->_properties['notes'], ENT_QUOTES, 'UTF-8');
  }
}
