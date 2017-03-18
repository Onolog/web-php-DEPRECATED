<?php
use Migrations\AbstractMigration;

class AddElevationToActivities extends AbstractMigration {
  /**
   * Change Method.
   *
   * More information on this method is available here:
   * http://docs.phinx.org/en/latest/migrations.html#the-change-method
   * @return void
   */
  public function change() {
    $table = $this->table('activities');
    $table
      ->addColumn('elevation_gain', 'integer', [
        'default' => null,
        'limit' => 5,
        'null' => true,
        'signed' => false,
      ])
      ->addColumn('elevation_loss', 'integer', [
        'default' => null,
        'limit' => 5,
        'null' => true,
        'signed' => false,
      ])
      ->update();
  }
}
