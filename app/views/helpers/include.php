<?php

/**
 * Helper class for including css files and setting page classes
 *
 * File: /app/views/helpers/css.php
 */
class IncludeHelper extends AppHelper {

    var $helpers = array('Html');

    public function __construct() {
      $this->Html = new HtmlHelper();
    }

    /**
     * Wrapper around Html helper so we don't have
     * to specify inline = false all the time
     */
    public function css($name, $inline=false) {
      return $this->Html->css($name, null, array('inline' => $inline));
    }

    /**
     * Wrapper around Html helper so we don't have
     * to specify inline = false all the time
     */
    public function js($name, $inline=false) {
      return $this->Html->script($name, array('inline' => $inline));
    }

}
