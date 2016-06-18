<?php
use View\Helper\PageHelper;

if (!isset($page_classes)) {
  $page_classes = '';
}

$this->Page
  ->setPageClasses($page_classes)
  ->setPageTitle($this->fetch('title'))
  ->setCss($this->fetch('css'))
  ->setJs($this->fetch('script'))
  ->setMeta($this->fetch('meta'))
  ->setView($this->fetch('content'))
  ->render();
