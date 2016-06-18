<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ShoesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ShoesTable Test Case
 */
class ShoesTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\ShoesTable
     */
    public $Shoes;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.shoes',
        'app.brands',
        'app.users',
        'app.activities',
        'app.workouts'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('Shoes') ? [] : ['className' => 'App\Model\Table\ShoesTable'];
        $this->Shoes = TableRegistry::get('Shoes', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Shoes);

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
