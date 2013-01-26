<?php

/**
 * Helper class for rendering css tooltips
 *
 * File: /app/views/helpers/tooltip.php
 */
class TooltipHelper extends AppHelper {

  var $helpers = array('Html', 'Include');

  private
    $markup,
    $classes = array(),
    $styles = array();

  public function setMarkup($markup) {
    $this->markup = $markup;
    return $this;
  }

  /**
   * @param   arr
   */
  public function addClass($classes) {
    $this->classes = array_merge($this->getDefaultClasses(), $classes);
    return $this;
  }

  protected function getDefaultClasses() {
    return array(
      'uiTooltip'
    );
  }

  /**
   * @param   arr
   */
  public function setStyles($styles) {
    $this->styles = $styles;
    return $this;
  }

  public function render() {
    if (!isset($this->markup)) {
      return;
    }

    $this->Include->css('tooltip');
  
    // Set inline styles, if any
    $styles = '';
    if (!empty($this->styles)) {
      $styles = $this->Html->style($this->styles);
    }

    $html =
      '<span class="uiTooltipStage">' .
        $this->markup .
      '</span>' .
      '<span class="uiTooltipNub"></span>';

    $tooltip = $this->Html->tag(
      'span',
      $html,
      array(
        'class' => implode(' ', $this->classes),
        'style' => $styles
      )
    );

    return $tooltip;
  }

}
