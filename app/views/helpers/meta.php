<?php

/**
 * Wrapper for $Html->meta() to add FB open graph tags
 *
 * File: /app/views/helpers/css.php
 */
class MetaHelper extends AppHelper {

    var $helpers = array('Html');

    /**
     * Wrapper around Html helper so we don't have
     * to specify inline = false all the time
     */
    public function og($property, $content) {
      return
        $this->Html->meta(
          array(
            'property' => $property,
            'content' => $content
          ),
          null,
          array('inline' => false)
        );
    }

}
