<?php
use Migrations\AbstractMigration;

class Initial extends AbstractMigration
{

    public $autoId = false;

    public function up()
    {

        $this->table('activities')
            ->addColumn('id', 'integer', [
                'autoIncrement' => true,
                'default' => null,
                'limit' => 10,
                'null' => false,
                'signed' => false,
            ])
            ->addPrimaryKey(['id'])
            ->addColumn('user_id', 'integer', [
                'default' => 0,
                'limit' => 10,
                'null' => false,
                'signed' => false,
            ])
            ->addColumn('activity_type', 'string', [
                'default' => null,
                'limit' => 50,
                'null' => true,
            ])
            ->addColumn('start_date', 'string', [
                'default' => 0,
                'limit' => 30,
                'null' => false,
            ])
            ->addColumn('timezone', 'string', [
                'default' => null,
                'limit' => 40,
                'null' => true,
            ])
            ->addColumn('distance', 'decimal', [
                'default' => 0,
                'null' => false,
                'precision' => 10,
                'scale' => 2,
            ])
            ->addColumn('duration', 'integer', [
                'default' => 0,
                'limit' => 8,
                'null' => true,
                'signed' => false,
            ])
            ->addColumn('avg_hr', 'integer', [
                'default' => null,
                'limit' => 3,
                'null' => true,
                'signed' => false,
            ])
            ->addColumn('max_hr', 'integer', [
                'default' => null,
                'limit' => 3,
                'null' => true,
                'signed' => false,
            ])
            ->addColumn('calories', 'integer', [
                'default' => null,
                'limit' => 5,
                'null' => true,
            ])
            ->addColumn('shoe_id', 'integer', [
                'default' => null,
                'limit' => 10,
                'null' => true,
                'signed' => false,
            ])
            ->addColumn('notes', 'text', [
                'default' => null,
                'limit' => null,
                'null' => true,
            ])
            ->addColumn('friends', 'string', [
                'default' => null,
                'limit' => 255,
                'null' => true,
            ])
            ->addIndex(
                [
                    'user_id',
                ]
            )
            ->create();

        $this->table('brands')
            ->addColumn('id', 'integer', [
                'autoIncrement' => true,
                'default' => null,
                'limit' => 11,
                'null' => false,
                'signed' => false,
            ])
            ->addPrimaryKey(['id'])
            ->addColumn('name', 'string', [
                'default' => null,
                'limit' => 20,
                'null' => true,
            ])
            ->create();

        $this->table('run_details')
            ->addColumn('id', 'integer', [
                'autoIncrement' => true,
                'default' => null,
                'limit' => 10,
                'null' => false,
                'signed' => false,
            ])
            ->addPrimaryKey(['id'])
            ->addColumn('user_id', 'integer', [
                'default' => 0,
                'limit' => 10,
                'null' => false,
                'signed' => false,
            ])
            ->addColumn('run_id', 'integer', [
                'default' => 0,
                'limit' => 10,
                'null' => false,
            ])
            ->addColumn('distance', 'decimal', [
                'default' => null,
                'null' => true,
                'precision' => 10,
                'scale' => 2,
            ])
            ->addColumn('shoe_id', 'integer', [
                'default' => null,
                'limit' => 10,
                'null' => true,
                'signed' => false,
            ])
            ->addColumn('notes', 'text', [
                'default' => null,
                'limit' => null,
                'null' => true,
            ])
            ->addColumn('time', 'integer', [
                'default' => null,
                'limit' => 8,
                'null' => true,
                'signed' => false,
            ])
            ->addIndex(
                [
                    'user_id',
                ]
            )
            ->addIndex(
                [
                    'run_id',
                ]
            )
            ->addIndex(
                [
                    'shoe_id',
                ]
            )
            ->create();

        $this->table('runs')
            ->addColumn('id', 'integer', [
                'autoIncrement' => true,
                'default' => null,
                'limit' => 10,
                'null' => false,
                'signed' => false,
            ])
            ->addPrimaryKey(['id'])
            ->addColumn('date', 'integer', [
                'default' => 0,
                'limit' => 11,
                'null' => false,
            ])
            ->create();

        $this->table('shoes')
            ->addColumn('id', 'integer', [
                'autoIncrement' => true,
                'default' => null,
                'limit' => 10,
                'null' => false,
                'signed' => false,
            ])
            ->addPrimaryKey(['id'])
            ->addColumn('model', 'string', [
                'default' => '',
                'limit' => 60,
                'null' => false,
            ])
            ->addColumn('brand_id', 'integer', [
                'default' => null,
                'limit' => 10,
                'null' => false,
            ])
            ->addColumn('user_id', 'integer', [
                'default' => 0,
                'limit' => 10,
                'null' => false,
                'signed' => false,
            ])
            ->addColumn('inactive', 'boolean', [
                'default' => null,
                'limit' => null,
                'null' => true,
            ])
            ->addColumn('size_type', 'integer', [
                'default' => null,
                'limit' => 1,
                'null' => true,
            ])
            ->addColumn('size', 'decimal', [
                'default' => null,
                'null' => true,
                'precision' => 3,
                'scale' => 1,
            ])
            ->addColumn('notes', 'text', [
                'default' => null,
                'limit' => null,
                'null' => true,
            ])
            ->addIndex(
                [
                    'inactive',
                ]
            )
            ->addIndex(
                [
                    'user_id',
                ]
            )
            ->addIndex(
                [
                    'brand_id',
                ]
            )
            ->create();

        $this->table('splits')
            ->addColumn('id', 'integer', [
                'autoIncrement' => true,
                'default' => null,
                'limit' => 11,
                'null' => false,
                'signed' => false,
            ])
            ->addPrimaryKey(['id'])
            ->addColumn('activity_id', 'integer', [
                'default' => null,
                'limit' => 11,
                'null' => true,
                'signed' => false,
            ])
            ->addColumn('split', 'integer', [
                'default' => null,
                'limit' => 4,
                'null' => true,
                'signed' => false,
            ])
            ->addColumn('distance', 'decimal', [
                'default' => null,
                'null' => true,
                'precision' => 10,
                'scale' => 2,
                'signed' => false,
            ])
            ->addColumn('duration', 'integer', [
                'default' => null,
                'limit' => 8,
                'null' => true,
                'signed' => false,
            ])
            ->addColumn('avg_hr', 'integer', [
                'default' => null,
                'limit' => 3,
                'null' => true,
                'signed' => false,
            ])
            ->addColumn('max_hr', 'integer', [
                'default' => null,
                'limit' => 3,
                'null' => true,
                'signed' => false,
            ])
            ->addColumn('calories', 'integer', [
                'default' => null,
                'limit' => 5,
                'null' => true,
                'signed' => false,
            ])
            ->addColumn('elevation_change', 'decimal', [
                'default' => null,
                'null' => true,
                'precision' => 10,
                'scale' => 5,
            ])
            ->addColumn('elevation_gain', 'decimal', [
                'default' => null,
                'null' => true,
                'precision' => 10,
                'scale' => 5,
            ])
            ->addColumn('elevation_loss', 'decimal', [
                'default' => null,
                'null' => true,
                'precision' => 10,
                'scale' => 5,
            ])
            ->addColumn('max_speed', 'decimal', [
                'default' => null,
                'null' => true,
                'precision' => 10,
                'scale' => 5,
            ])
            ->addIndex(
                [
                    'activity_id',
                ]
            )
            ->create();

        $this->table('trackpoints')
            ->addColumn('id', 'integer', [
                'autoIncrement' => true,
                'default' => null,
                'limit' => 11,
                'null' => false,
                'signed' => false,
            ])
            ->addPrimaryKey(['id'])
            ->addColumn('activity_id', 'integer', [
                'default' => null,
                'limit' => 11,
                'null' => false,
                'signed' => false,
            ])
            ->addColumn('time', 'string', [
                'default' => null,
                'limit' => 30,
                'null' => true,
            ])
            ->addColumn('latitude_deg', 'decimal', [
                'default' => null,
                'null' => false,
                'precision' => 10,
                'scale' => 8,
            ])
            ->addColumn('longitude_deg', 'decimal', [
                'default' => null,
                'null' => false,
                'precision' => 11,
                'scale' => 8,
            ])
            ->addColumn('altitude_meters', 'decimal', [
                'default' => null,
                'null' => true,
                'precision' => 10,
                'scale' => 5,
            ])
            ->addColumn('distance_meters', 'decimal', [
                'default' => null,
                'null' => true,
                'precision' => 10,
                'scale' => 5,
            ])
            ->addColumn('heart_rate_bpm', 'integer', [
                'default' => null,
                'limit' => 3,
                'null' => true,
                'signed' => false,
            ])
            ->addColumn('speed', 'decimal', [
                'default' => null,
                'null' => true,
                'precision' => 10,
                'scale' => 5,
            ])
            ->addIndex(
                [
                    'activity_id',
                ]
            )
            ->create();

        $this->table('users')
            ->addColumn('id', 'biginteger', [
                'default' => 0,
                'limit' => 20,
                'null' => false,
                'signed' => false,
            ])
            ->addPrimaryKey(['id'])
            ->addColumn('first_name', 'string', [
                'default' => '',
                'limit' => 20,
                'null' => false,
            ])
            ->addColumn('last_name', 'string', [
                'default' => '',
                'limit' => 40,
                'null' => false,
            ])
            ->addColumn('email', 'string', [
                'default' => '',
                'limit' => 80,
                'null' => false,
            ])
            ->addColumn('password', 'string', [
                'default' => '',
                'limit' => 40,
                'null' => true,
            ])
            ->addColumn('created', 'datetime', [
                'default' => '0000-00-00 00:00:00',
                'limit' => null,
                'null' => false,
            ])
            ->addColumn('last_login', 'datetime', [
                'default' => null,
                'limit' => null,
                'null' => true,
            ])
            ->addColumn('location', 'string', [
                'default' => null,
                'limit' => 100,
                'null' => true,
            ])
            ->addColumn('timezone', 'string', [
                'default' => null,
                'limit' => 40,
                'null' => true,
            ])
            ->addColumn('distance_units', 'integer', [
                'default' => 0,
                'limit' => 1,
                'null' => false,
            ])
            ->addIndex(
                [
                    'email',
                ],
                ['unique' => true]
            )
            ->addIndex(
                [
                    'email',
                    'password',
                ]
            )
            ->create();
    }

    public function down()
    {
        $this->dropTable('activities');
        $this->dropTable('brands');
        $this->dropTable('run_details');
        $this->dropTable('runs');
        $this->dropTable('shoes');
        $this->dropTable('splits');
        $this->dropTable('trackpoints');
        $this->dropTable('users');
    }
}
