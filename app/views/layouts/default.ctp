<?php
App::import('Helper', 'Page');

if (!isset($page_classes)) {
  $page_classes = '';
}

$Page = id(new PageHelper($scripts_for_layout, $page_classes))
  ->setPageTitle($title_for_layout)
  ->setView($content_for_layout);

$Page->render();
