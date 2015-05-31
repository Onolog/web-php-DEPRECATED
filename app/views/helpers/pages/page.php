<?php
App::import('Lib', 'Useragent');

/**
 * Renders a basic HTML page.
 *
 * This class should generally not be modified. Instead, extend it and
 * customize as needed.
 */
class PageHelper extends AppHelper {

  var $helpers = array('Html', 'Session', 'Include');

  private
    $pageTitle = '',
    $pageClasses = array(),
    $view,
    $pageCSS,
    $pageJS,
    $pageMeta;

  // Helpers/Components
  // These are protected so subclasses can access them
  protected
    $View;

  public function __construct($scripts='', $classes=null) {
    parent::__construct();

    $this->generateScripts($scripts);
    $this->addClass($classes);
    $this->setUserAgentClass();

    // Set Helpers & Components
    $this->Html = new HtmlHelper();
    $this->Session = new SessionHelper();

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
          $this->renderPageContent() .
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

  protected function getPageTitle() {
    return $this->pageTitle;
  }

  /**
   * Sets the view to be rendered
   * @param str
   */
  public function setView($view) {
    $this->view = $view;
    return $this;
  }

  protected function getView() {
    return $this->view;
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

  // Removes a single classname, if it exists
  public function removeClass($class) {
    $key = array_search($class, $this->pageClasses);
    if ($key === false) {
      return;
    }
    unset($this->pageClasses[$key]);
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
    return Configure::read('debug') > 0 ? $this->Html->css('/css/debug') : '';
  }

  /**
   * Adds a corresponding class to the HTML <body> based on the useragent
   *
   * Supported Browsers:
   *    - ie6
   *    - ie7
   *    - Firefox 2
   *    - Firefox 3
   *    - Safari 2
   *    - Safari 3
   *    - Opera
   *
   * TODO: Add support for Chrome and Safari 4
   */
  protected function setUserAgentClass() {
    $useragent = Net_UserAgent_Detect::singleton();
    // debug($_SERVER['HTTP_USER_AGENT'], 1);

    if ($useragent->isBrowser('belowie7')) {
      $this->addClass('ie6');
    } else if ($useragent->isBrowser('ie7')) {
      $this->addClass('ie7');
    } else if ($useragent->isBrowser('firefox2.x')) {
      $this->addClass('ff2');
    } else if ($useragent->isBrowser('firefox3.x')) {
      $this->addClass('ff3');
    } else if ($useragent->isBrowser('safari2')) {
      $this->addClass('safari2');
    } else if ($useragent->isBrowser('safari3')) {
      $this->addClass('safari3');
    } else if ($useragent->isBrowser('opera')) {
      $this->addClass('opera');
    }
    return $this;
  }
  
  /**
   * Renders the <title> portion of an HTML page. Simply returns the page title
   * here, but can be extended to add other things, like the site name.
   */
  protected function renderPageTitle() {
    return $this->getPageTitle();
  }

  /**
   * Renders the visible portion of the page, including all header, content and
   * footer elements. This is a basic version of the method; more complex or
   * customized version can be added in child classes.
   */
  protected function renderPageContent() {
    return $this->getView();
  }

  protected function renderPageJS() {
    return $this->getPageJS();
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

} // End Page Class
