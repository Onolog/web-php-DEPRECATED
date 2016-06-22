<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * TrackpointsFixture
 *
 */
class TrackpointsFixture extends TestFixture
{

    /**
     * Fields
     *
     * @var array
     */
    // @codingStandardsIgnoreStart
    public $fields = [
        'id' => ['type' => 'integer', 'length' => 11, 'unsigned' => true, 'null' => false, 'default' => null, 'comment' => '', 'autoIncrement' => true, 'precision' => null],
        'activity_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => true, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'time' => ['type' => 'string', 'length' => 30, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null, 'fixed' => null],
        'latitude_deg' => ['type' => 'decimal', 'length' => 10, 'precision' => 8, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => ''],
        'longitude_deg' => ['type' => 'decimal', 'length' => 11, 'precision' => 8, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => ''],
        'altitude_meters' => ['type' => 'decimal', 'length' => 10, 'precision' => 5, 'unsigned' => false, 'null' => true, 'default' => null, 'comment' => ''],
        'distance_meters' => ['type' => 'decimal', 'length' => 10, 'precision' => 5, 'unsigned' => false, 'null' => true, 'default' => null, 'comment' => ''],
        'heart_rate_bpm' => ['type' => 'integer', 'length' => 3, 'unsigned' => true, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'speed' => ['type' => 'decimal', 'length' => 10, 'precision' => 5, 'unsigned' => false, 'null' => true, 'default' => null, 'comment' => ''],
        '_indexes' => [
            'activity' => ['type' => 'index', 'columns' => ['activity_id'], 'length' => []],
        ],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
        ],
        '_options' => [
            'engine' => 'MyISAM',
            'collation' => 'utf8_general_ci'
        ],
    ];
    // @codingStandardsIgnoreEnd

    /**
     * Records
     *
     * @var array
     */
    public $records = [
        [
            'id' => 1,
            'activity_id' => 1,
            'time' => 'Lorem ipsum dolor sit amet',
            'latitude_deg' => 1.5,
            'longitude_deg' => 1.5,
            'altitude_meters' => 1.5,
            'distance_meters' => 1.5,
            'heart_rate_bpm' => 1,
            'speed' => 1.5
        ],
    ];
}
