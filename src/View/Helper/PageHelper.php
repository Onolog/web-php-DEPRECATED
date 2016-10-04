<?php
namespace App\View\Helper;

use Cake\Core\Configure;
use Cake\View\Helper;

/**
 * Renders an HTML page with some basic pieces.
 */
class PageHelper extends Helper {

  public $helpers = ['Html'];

  private
    $pageTitle = '',
    $pageClasses = array(),
    $view,
    $pageCSS,
    $pageJS,
    $pageMeta;

  /**
   * Prints all the page markup to the browser
   *
   * @return  str   The page markup
   */
  public function render() {
    echo
      '<!DOCTYPE html>' .
        '<html>' .
        '<head>' .
          $this->Html->charset() .
          '<link href="/favicon.ico" type="image/x-icon" rel="shortcut icon">' .
          $this->Html->meta('keywords') .
          $this->Html->meta('description') .
          $this->Html->meta(array(
            'name' => 'viewport',
            'content' => 'width=device-width, initial-scale=1.0, user-scalable=no'
          )) .
          $this->getPageMeta() .
          '<title>' . $this->renderPageTitle() . '</title>' .
          $this->getBaseCSS() .
          $this->pageCSS .
        '</head>' .
        '<body class="' . implode(' ', $this->getClasses()) . '">' .
          $this->view .
          $this->renderPageJS() .
        '</body>' .
      '</html>';
  }

  public function setPageClasses($classes) {
    $this->addClassname($classes);
    return $this;
  }

  /**
   * Set the <title> of the page
   *
   * @param   raw-str   $title
   * @return  $this
   */
  public function setPageTitle($title) {
    $this->pageTitle = $title;
    return $this;
  }

  public function setCss($css) {
    $this->pageCSS = $css;
    return $this;
  }

  public function setJs($js) {
    $this->pageJS = $js;
    return $this;
  }

  public function setMeta($meta) {
    $this->pageMeta = $meta;
    return $this;
  }

  /**
   * Sets the view to be rendered
   * @param str
   */
  public function setView($view) {
    $this->view = $view;
    return $this;
  }

  /**
   * Add a class or multiple classes to the <body> of the page.
   *
   * @param   mixed   $class (raw-str or array of raw-str)
   * @return  $this
   */
  public function addClassname($class) {
    if (!empty($class)) {
      if (is_array($class)) {
        $this->pageClasses = array_merge($this->pageClasses, $class);
      } else {
        $this->pageClasses[] = $class;
      }
    }
    return $this;
  }

  protected function getClasses() {
    return $this->pageClasses;
  }

  protected function getPageMeta() {
    return $this->pageMeta;
  }

  protected function getBaseCSS() {
    $debugCSS = Configure::read('debug') > 0 ?
      $this->Html->css('/css/base/debug') : '';

    return
      $this->Html->css('/css/base/bootstrap') .
      $this->Html->css('/css/base/app') .
      $this->Html->css('/css/base/bs-override') .
      $this->Html->css('/css/base/fonts') .
      $this->Html->css('/css/base/util');
      $debugCSS;
  }
  
  /**
   * Renders the <title> portion of an HTML page. Simply returns the page title
   * here, but can be extended to add other things, like the site name.
   */
  protected function renderPageTitle() {
    return __('Onolog &middot; ') . $this->pageTitle;
  }

  protected function renderPageJS() {
    return
      $this->Html->script('/js/build/Common') .
      $this->pageJS .
      $this->renderGoogleAnalyticsJS();
  }

  /**
   * Renders the JS needed for Google analytics. This is pretty much global
   * code, except for the individual site id. This id is stored as a constant
   * in init.php and can be changed on a per-site basis.
   */
  protected function renderGoogleAnalyticsJS() {
    $code = Configure::read('Google.analyticsCode');

    if (!$code) {
      return '';
    }

    $google =
      '<script type="text/javascript">' . "\n" .
        'var _gaq = _gaq || [];' . "\n" .
        '_gaq.push(["_setAccount", "' . $code . '"]);' . "\n" .
        '_gaq.push(["_trackPageview"]);' . "\n" .
        '(function() {' . "\n" .
          'var ga = document.createElement("script"); ga.type = "text/javascript"; ga.async = true;' . "\n" .
          'ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";' . "\n" .
          'var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s);' . "\n" .
        '})();' . "\n" .
      '</script>' . "\n";

    return $google;
  }
}
