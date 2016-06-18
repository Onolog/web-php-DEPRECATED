<?php
namespace App\View\Helper;

use Cake\View\Helper;

/**
 * Wrapper for $Html->meta() to add FB open graph tags
 *
 * File: /app/views/helpers/css.php
 */
class MetaHelper extends Helper {
  public $helpers = ['Html'];

  /**
   * Helper method for adding Facebook Open Graph tags.
   */
  public function og($property, $content) {
    return $this->Html->meta(
      array(
        'property' => $property,
        'content' => $content
      ),
      null,
      array('inline' => false)
    );
  }
}
