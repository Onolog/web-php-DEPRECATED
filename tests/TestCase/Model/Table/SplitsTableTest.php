<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\SplitsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\SplitsTable Test Case
 */
class SplitsTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\SplitsTable
     */
    public $Splits;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.splits',
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
        $config = TableRegistry::exists('Splits') ? [] : ['className' => 'App\Model\Table\SplitsTable'];
        $this->Splits = TableRegistry::get('Splits', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Splits);

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
