<?php

/**
 * Renders an HTML page with some basic pieces.
 */
class PageHelper extends AppHelper {

  var $helpers = array('Html');

  private
    $pageTitle = '',
    $pageClasses = array(),
    $view,
    $pageCSS,
    $pageJS,
    $pageMeta;

  // Helpers/Components
  // These are protected so subclasses can access them
  protected $View;

  public function __construct($scripts='', $classes=null) {
    parent::__construct();

    $this->generateScripts($scripts);
    $this->addClass($classes);

    // Set Helpers & Components
    $this->Html = new HtmlHelper();

    // TODO: Is there a better way to reference the View than this?
    $this->View =& ClassRegistry::getObject('view');
  }

  /**
   * Prints all the page markup to the browser
   *
   * @return  str   The page markup
   */
  public function render() {
    echo
      $this->Html->doctype('xhtml-strict') .
        '<head>' .
          // $this->Html->meta('icon') .
          '<link href="/favicon.ico" type="image/x-icon" rel="shortcut icon">' .
          $this->Html->meta('keywords') .
          $this->Html->meta('description') .
          $this->Html->meta(array(
            'name' => 'viewport',
            'content' => 'width=device-width, initial-scale=1.0, user-scalable=no'
          )) .
          $this->getPageMeta() .
          $this->Html->charset() .
          '<title>' . $this->renderPageTitle() . '</title>' .
          $this->getBaseCSS() .
          $this->getPageCSS() .
        '</head>' .
        '<body class="' . implode(' ', $this->getClasses()) . '">' .
          $this->view .
          $this->renderDevConsole() .
          // Always put JS at the bottom so it doesn't stop the page from loading!
          $this->renderPageJS() .
        '</body>' .
      '</html>';
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
  public function addClass($class) {
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

  private function generateScripts($scripts) {
    // Split up CSS and JS to render them separately
    $js   = array();
    $css  = array();
    $meta = array();
    $scripts = explode("\t", $scripts);
    
    if (!empty($scripts)) {
      foreach ($scripts as $script) {
        // JS
        if (preg_match('/type="text\/javascript"/', $script)) {
          $js[] = $script;
        }
        // CSS
        if (preg_match('/href="\/css\/(.*?)\.css"/', $script)) {
          $css[] = $script;
        }
        // Meta Tags
        if (preg_match('/meta/', $script)) {
          $meta[] = $script;
        }
      }
    }
    
    $this->pageJS = !empty($js) ? implode($js, "\n") : '';
    $this->pageCSS = !empty($css) ? implode($css, "\n") : '';
    $this->pageMeta = !empty($meta) ? implode($meta, "\n") : '';
  }

  protected function getPageJS() {
    return $this->pageJS;
  }

  protected function getPageCSS() {
    return $this->pageCSS;
  }

  protected function getPageMeta() {
    return $this->pageMeta;
  }

  protected function getBaseCSS() {
    $debugCSS = '';
    if (Configure::read('debug') > 0) {
      $debugCSS = $this->Html->css('/css/base/debug');
    }

    return
      $this->Html->css('/css/base/bootstrap') .
      $this->Html->css('/css/base/bs-override') .
      $this->Html->css('/css/base/app') .
      $this->Html->css('/css/base/fonts') .
      $this->Html->css('/css/base/util') .
      $debugCSS;
  }
  
  /**
   * Renders the <title> portion of an HTML page. Simply returns the page title
   * here, but can be extended to add other things, like the site name.
   */
  protected function renderPageTitle() {
    return __('Onolog &middot; ', true) . $this->pageTitle;
  }

  protected function renderPageJS() {
    return
      $this->getPageJS() .
      $this->renderGoogleAnalyticsJS();
  }

  /**
   * Renders the JS needed for Google analytics. This is pretty much global
   * code, except for the individual site id. This id is stored as a constant
   * in init.php and can be changed on a per-site basis.
   */
  protected function renderGoogleAnalyticsJS() {
    if (!GOOGLE_ANALYTICS_CODE) {
      return '';
    }

    $google =
      '<script type="text/javascript">' . "\n" .
        'var _gaq = _gaq || [];' . "\n" .
        '_gaq.push(["_setAccount", "' . GOOGLE_ANALYTICS_CODE . '"]);' . "\n" .
        '_gaq.push(["_trackPageview"]);' . "\n" .
        '(function() {' . "\n" .
          'var ga = document.createElement("script"); ga.type = "text/javascript"; ga.async = true;' . "\n" .
          'ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";' . "\n" .
          'var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s);' . "\n" .
        '})();' . "\n" .
      '</script>' . "\n";

    return $google;
  }

  /**
   * SQL info for debugging
   */
  private function renderDevConsole() {
    $html = '';
    if (Configure::read('debug') == 2) {
      $html.=
        '<div id="dev_console_container">' .
          '<div id="dev_console">' .
            $this->View->element('sql_dump') .
          '</div>' .
        '</div>';
    }
    return $html;
  }

}