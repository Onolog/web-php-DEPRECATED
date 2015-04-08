<?php

/**
 * /app/views/helpers/button.php
 */
class ButtonHelper extends AppHelper {

  private $args = array();
  private $attributes = array();
  private $glyph = null;
  private $isActive = false;
  private $isDisabled = false;
  private $label = '';
  private $size = 'default';
  private $use = 'default';

  const CLASS_PREFIX = 'btn-';

  public function set($args) {
    // Clear values
    $this->attributes = array();
    $this->args = array();
    $map = $this->getVarMap();

    // First strip out the component-specific attributes
    foreach($args as $key => $val) {
      if (idx($map, $key)) {
        $this->attributes[$key] = $val;
        unset($args[$key]);
      }
    }

    $this->validateAttributes();

    $this->args = $args;
    if (idx($this->args, 'href', '#')) {
      $this->args['role'] = 'button';
      unset($this->args['type']);
    }

    return $this;
  }

  private function getVarMap() {
    return array(
      'glyph' => true,
      'active' => true,
      'label' => true,
      'size' => true,
      'use' => true,
    );
  }

  private function validateAttributes() {
    $attr = $this->attributes;

    $this->glyph = idx($attr, 'glyph', '');
    $this->isActive = !!idx($attr, 'active', false);
    $this->isDisabled = !!idx($attr, 'disabled', false);
    $this->label = idx($attr, 'label', '');
    $this->setSize(idx($attr, 'size', 'default'));
    $this->setUse(idx($attr, 'use', 'default'));
  }

  private function renderGlyph() {
    if (!$this->glyph) {
      return '';
    }
    return '<i class="glyphicon glyphicon-' . $this->glyph . '"></i> ';
  }

  private function setSize($size) {
    switch ($size) {
      case 'large':
      case 'default':
      case 'small':
      case 'xsmall':
        $this->size = $size;
        break;
      default:
        $this->size = 'default';
        break;
    }
    return $this;
  }

  private function getSizeClass() {
    $classes = array(
      'large' => 'lg',
      'small' => 'sm',
      'xsmall' => 'xs',

      // Default size has no classname
      'default' => null,
    );

    return $classes[$this->size] ?
      self::CLASS_PREFIX . $classes[$this->size] : '';
  }

  private function getTag() {
    $args = $this->args;
    if (idx($args, 'href')) {
      return 'a';
    } else if (idx($args, 'type') === 'button') {
      return 'input';
    } else {
      return 'button';
    }
  }

  private function setUse($use) {
    switch ($use) {
      case 'default':
      case 'primary':
      case 'success':
      case 'info':
      case 'warning':
      case 'danger':
      case 'link':
        $this->use = $use;
        break;
      default:
        $this->use = 'default';
        break;
    }
    return $this;
  }

  private function getUseClass() {
    return self::CLASS_PREFIX . $this->use;
  }

  public function render() {
    $classes = array(
      'btn',
      $this->getUseClass(),
      $this->getSizeClass(),
      idx($this->args, 'class'),
    );

    $tag = $this->getTag();

    $r = '<' . $tag . ' class="' . implode($classes, ' ') . '"';

    foreach($this->args as $key => $val) {
      $r .= ' ' . $key . '="' . $val . '"';
    }

    if ($tag === 'input') {
      $r .= ' value="' . $this->label . '" />';
    } else {
      // Button or link
      $r .=
        '>' .
          $this->renderGlyph() .
          $this->label .
        '</' . $tag . '>';
    }

    return $r;
  }
}