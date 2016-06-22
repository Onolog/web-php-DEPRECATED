<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\TrackpointsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\TrackpointsTable Test Case
 */
class TrackpointsTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\TrackpointsTable
     */
    public $Trackpoints;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.trackpoints',
        'app.activities',
        'app.users',
        'app.shoes',
        'app.brands',
        'app.workouts',
        'app.laps'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('Trackpoints') ? [] : ['className' => 'App\Model\Table\TrackpointsTable'];
        $this->Trackpoints = TableRegistry::get('Trackpoints', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Trackpoints);

        parent::tearDown();
    }

    /**
     * Test initialize method
     *
     * @return void
     */
    public function testInitialize()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test validationDefault method
     *
     * @return void
     */
    public function testValidationDefault()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test buildRules method
     *
     * @return void
     */
    public function testBuildRules()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
