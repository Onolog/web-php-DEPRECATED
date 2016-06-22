<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Brands Controller
 *
 * @property \App\Model\Table\BrandsTable $Brands
 */
class BrandsController extends AppController {
  /**
   * Retrieve all brands
   */
  public function index() {
    $brands = $this->Brands->find()->order(['name' => 'asc']);
    $this->set([
      'brands' => $brands,
    ]);
  }
}
