<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * User Entity.
 *
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string $password
 * @property \Cake\I18n\Time $created
 * @property \Cake\I18n\Time $last_login
 * @property string $default_timezone
 * @property \App\Model\Entity\Activity[] $activities
 * @property \App\Model\Entity\Shoe[] $shoes
 * @property \App\Model\Entity\Workout[] $workouts
 */
class User extends Entity {

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

  /**
   * Fields that are excluded from JSON an array versions of the entity.
   *
   * @var array
   */
  protected $_hidden = [
    'password'
  ];

  protected $_virtual = [
    'name',
  ];

  protected function _getName() {
    return $this->_properties['first_name'] . ' ' . $this->_properties['last_name'];
  }  
}
