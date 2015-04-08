<?php
App::import('Helper', 'pages/WebPage');

/**
 * Default layout for a site page, including all standard chrome
 */

if (!isset($page_classes)) {
  $page_classes = '';
}

$WebPage = id(new WebPageHelper($scripts_for_layout, $page_classes))
  ->setPageTitle($title_for_layout)
  ->setView($content_for_layout);

if (isset($page_header)) {
  $WebPage->setPageHeader($page_header);
}

if (isset($sidebar)) {
  $WebPage->setSideCol($sidebar);
}

$WebPage->render();
