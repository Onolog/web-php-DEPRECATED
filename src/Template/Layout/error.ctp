<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @since         0.10.0
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

use View\Helper\PageHelper;

if (!isset($page_classes)) {
  $page_classes = '';
}

$content =
  '<div class="app narrow-page error-page">' .
    '<nav class="app-header navbar navbar-inverse navbar-fixed-top">' .
      '<div class="container-fluid">' .
        '<div class="navbar-header">' .
          $this->Html->link('Onolog', date(CALENDAR_URI_FORMAT), [
            'class' => 'navbar-brand',
          ]) .
        '</div>'.
      '</div>' .
    '</nav>' .
    '<div class="main">' .
      '<div class="clearfix container-fluid">' .
        '<div id="mainCol">' .
          $this->Flash->render() .
          //$this->fetch('content') .
          '<h2>Sorry, this page isn\'t available</h2>' .
          '<p>' .
            'The link you followed may be broken, or the page may have been removed.' .
          '</p>' .
        '</div>' .
      '</div>' .
    '</div>' .
    '<footer class="app-footer">' .
      '<div class="container-fluid clearfix">' .
        '<div class="pull-left">' .
          '<div>' .
            '<span>Copyright &copy; ' . date('Y') . ' Onolog</span>' .
          '</div>' .
        '</div>' .
        '<div class="pull-right">' .
          '<div>' .
            $this->Html->link('Privacy', [
              'controller' => 'pages',
              'action' => 'privacy',
            ]) .
            '<span class="middot">&middot;</span>' .
            $this->Html->link('Terms', [
              'controller' => 'pages',
              'action' => 'terms',
            ]) .
          '</div>' .
        '</div>' .
      '</div>' .
    '</footer>' .
  '</div>';

$this->Html->css([
  'base/error',
  '/js/components/Page/css/AppFooter.css',
  '/js/components/Page/css/AppHeader.css',
], ['block' => true]);

$this->Page
  ->setPageClasses($page_classes)
  ->setPageTitle($this->fetch('title'))
  ->setCss($this->fetch('css'))
  ->setJs($this->fetch('script'))
  ->setMeta($this->fetch('meta'))
  ->setView($content)
  ->render();
