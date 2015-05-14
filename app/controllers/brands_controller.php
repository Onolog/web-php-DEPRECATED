<?php
class BrandsController extends AppController {

  var $name = 'Brands';

  function beforeFilter() {
    parent::beforeFilter(); 
    $this->Auth->allowedActions = array('*');
  }

  /**
   * Retrieve all brands
   */
  public function ajax_all() {
    $this->setIsAjax();
    $response = new Response();

    $brands = $this->Brand->find('all', array(
      'order' => array('Brand.name' => 'asc'),
    ));

    return $response
      ->setSuccess(true)
      ->setPayload($brands)
      ->send();
  }
}
