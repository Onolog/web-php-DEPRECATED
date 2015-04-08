<?php
App::import('Helper', 'pages/WebPage');

/**
 * Layout for the main marketing page
 */
if (!isset($page_classes)) {
  $page_classes = '';
}

$WebPage = id(new WebPageHelper($scripts_for_layout, $page_classes))
  ->setPageTitle($title_for_layout)
  ->setView($content_for_layout)
  ->setIsFullWidth(true)
  ->hideHeader();

$WebPage->render();
