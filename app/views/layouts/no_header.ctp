<?php
App::import('Helper', 'pages/WebPage');

if (!isset($page_classes)) {
  $page_classes = '';
}

$WebPage = id(new WebPageHelper($scripts_for_layout, $page_classes))
  ->setPageTitle($title_for_layout)
  ->setView($content_for_layout)
  ->hideHeader();

if (isset($page_header)) {
  $WebPage->setPageHeader($page_header);
}

$WebPage->render();
