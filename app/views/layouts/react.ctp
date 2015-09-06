<?php
App::import('Helper', 'pages/ReactPage');

if (!isset($page_classes)) {
  $page_classes = '';
}

$ReactPage = id(new ReactPageHelper($scripts_for_layout, $page_classes))
  ->setPageTitle($title_for_layout)
  ->setView($content_for_layout);

$ReactPage->render();
