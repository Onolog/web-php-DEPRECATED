<?php
App::import('Helper', 'pages/AppPage');
App::import('Helper', 'Navigation');
App::import('Helper', 'Session');

/**
 * Renders a web page with site chrome
 */
class WebPageHelper extends AppPageHelper {

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
    $this->Session = new SessionHelper();

    if ($this->Session->read('Auth.User')) {
      $this->userID = $this->Session->read('Auth.User.id');
    }
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
      '<div class="main">' .
        '<div class="clearfix' . $class . '">' .
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
      '<footer class="footer">' .
        '<div class="container clearfix">' .
          '<div class="pull-left">' .
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
      '</footer>';
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
      '<div class="pageHeader clearfix">' .
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
}
