<?php
use View\Helper\PageHelper;

$data = isset($data) ? $data : [];
$title = isset($title) ? $title : $this->fetch('title');

$this->Page
  ->setPageTitle($title)
  ->setData($data)
  ->setMeta($this->fetch('meta'))
  ->render();
