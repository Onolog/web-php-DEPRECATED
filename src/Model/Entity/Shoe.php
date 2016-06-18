<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Shoe Entity.
 *
 * @property int $id
 * @property string $model
 * @property int $brand_id
 * @property \App\Model\Entity\Brand $brand
 * @property int $user_id
 * @property \App\Model\Entity\User $user
 * @property bool $inactive
 * @property \App\Model\Entity\Activity[] $activities
 * @property \App\Model\Entity\Workout[] $workouts
 */
class Shoe extends Entity {
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

  protected $_hidden = [
    'brand',
  ];

  protected $_virtual = [
    'activities',
    'activity_count',
    'mileage',
    'name',
  ];

  protected function _getActivities() {
    $activities = idx($this->_properties, 'activities', []);

    return array_map(function($activity) {
      return $activity['id'];
    }, $activities);
  }

  protected function _getActivityCount() {
    $activities = idx($this->_properties, 'activities', []);
    return count($activities);
  }

  protected function _getMileage() {
    $activities = idx($this->_properties, 'activities', []);
    $mileage = array_reduce($activities, function($total, $activity) {
      return $total += $activity->distance;
    });
    return $mileage ?: 0;
  }

  protected function _getName() {
    $brand = idx($this->_properties, 'brand', []);
    return $brand['name'] . ' ' . $this->_properties['model'];
  }
}
