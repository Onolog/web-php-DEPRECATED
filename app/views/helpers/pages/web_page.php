<?php
App::import('Helper', 'pages/Page');
App::import('Helper', 'Navigation');

/**
 * Renders a web page with site chrome
 */
class WebPageHelper extends PageHelper {

  var $helpers = array(
    'Navigation'
  );

  private
    $hideHeader = false,
    $isFullWidth = false,
    $pageHeader = '',
    $sideCol = '',
    $userID = null;

  protected $Navigation;

  public function __construct($scripts='', $classes=null) {
    parent::__construct($scripts, $classes);

    // Set Helpers
    $this->Navigation = new NavigationHelper();

    if ($this->Session->read('Auth.User')) {
      $this->userID = $this->Session->read('Auth.User.id');
    }
  }

  protected function getBaseJS() {
    return
      $this->Html->script('/js/lib/require/require.js', array(
        'data-main' => '/js/main.js'
      ));
  }

  protected function getBaseCSS() {
    // TODO: It shouldn't be necessary to prepend "/css/" to all of these...
    return
      parent::getBaseCSS() .
      $this->Html->css('/css/base/bootstrap') .
      $this->Html->css('/css/base/base') .
      $this->Html->css('/css/base/util') .
      $this->Html->css('/css/base/bs-override') .
      $this->Html->css('/css/base/layout') .
      $this->Html->css('/css/base/fonts');
  }

  public function hideHeader() {
    $this->hideHeader = true;
    return $this;
  }

  public function setIsFullWidth($fullWidth) {
    $this->isFullWidth = $fullWidth;
    return $this;
  }

  public function setSideCol($side_col) {
    if ($side_col) {
      // If there's a side column, add the appropriate body class
      $this->addClass('hasSideCol');
      $this->sideCol = $side_col;
    }
    return $this;
  }

  protected function getSideCol() {
    return $this->sideCol;
  }

  public function setPageHeader($page_header) {
    $this->pageHeader = $page_header;
  }

  protected function getPageHeader() {
    return $this->pageHeader;
  }

  protected function renderPageContent() {
    // Pretty much a big hack to allow marketing pages to have full-width
    // elements and not be constrained by the mainCol
    $class = $this->isFullWidth ? '' : ' container';
    $header = $this->hideHeader ? '' : $this->Navigation->render();

    return
      // Navigation
      $header .
  
      // Main Content
      '<div id="mainWrapper">' .
        '<div id="main" class="clearfix' . $class . '">' .
          $this->renderPageHeader() .
          $this->Session->flash() .
          $this->Session->flash('auth') .
          '<div id="mainCol">' .
            ($this->sideCol ? '<div id="innerMainCol">' : '') .
            $this->getView() .
            ($this->sideCol ? '</div>' : '') .
          '</div>' .
          $this->renderSideCol() .
        '</div>' .
      '</div>' .

      // Footer
      '<div id="footerWrapper">' .
        '<div id="footer" class="container clearfix">' .
          '<div class="copyright pull-left">' .
            'Copyright &copy; ' . date('Y') . ' Onolog' .
          '</div>' .
          '<div class="pull-right">' .
            $this->Html->link(
              'Privacy',
              '/pages/privacy'
            ) .
            '<span class="middot">&middot;</span>' .
            $this->Html->link(
              'Terms',
              '/pages/terms'
            ) .
          '</div>' .
        '</div>' .
      '</div>';
  }

  /**
   * Renders the <title> portion of an HTML page
   */
  protected function renderPageTitle() {
    return __('Onolog &middot; ', true) . $this->getPageTitle();
  }

  /**
   * Simply takes the header contents and wraps them in a container.
   * TODO: make a legit PageHeader component with customizable
   * layout and content.
   */
  protected function renderPageHeader() {
    if (!$this->getPageHeader()) {
      return '';
    }
    return
      '<div id="pageHeader" class="clearfix">' .
        $this->getPageHeader() .
      '</div>';
  }

  protected function renderSideCol() {
    if (!$this->getSideCol()) {
      return '';
    }

    return
      '<div id="sideCol">' .
        $this->getSideCol() .
      '</div>';
  }

  protected function renderPageJS() {
    return
      $this->getBaseJS() .
      $this->getPageJS() .
      $this->renderFBRoot() .
      $this->renderGoogleAnalyticsJS();
  }

  protected function renderFBRoot() {
    return '<div id="fb-root" class=" fb_reset"></div>';
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
}
