<?php
App::import('Helper', 'pages/MobilePage');

/**
 * Mobile layout
 */

if (!isset($page_classes)) {
  $page_classes = '';
}

$MobilePage = id(new MobilePageHelper($scripts_for_layout, $page_classes))
  ->setPageTitle($title_for_layout)
  ->setContent($content_for_layout);

if (isset($sidebar)) {
  $MobilePage->setSideCol($sidebar);
}

$MobilePage->render();
