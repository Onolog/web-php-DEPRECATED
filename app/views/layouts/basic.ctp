<?php
App::import('Helper', 'pages/AppPage');

if (!isset($page_classes)) {
  $page_classes = '';
}

$AppPage = id(new AppPageHelper($scripts_for_layout, $page_classes))
  ->setPageTitle($title_for_layout)
  ->setView($content_for_layout);

$AppPage->render();
