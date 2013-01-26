<?php
App::import('Helper', 'pages/Page');

/**
 * Renders a web page with site chrome
 */
class MobilePageHelper extends PageHelper {

  private $sideCol = '';

  public function setSideCol($sideCol) {
    if (!$sideCol) {
      return $this;
    }
    // If there's a side column, add the appropriate body class
    $this->addClass('hasSideCol');
    $this->sideCol = $sideCol;
    return $this;
  }

  protected function getSideCol() {
    return $this->sideCol;
  }

  /**
   * Renders the main content portion of the page. This is a basic version of
   * the method; more complex or customized version can be added in the
   * SitePage class
   */
  protected function renderPageContent() {
    return
      // Header
      '<div id="header_wrapper">' .
        '<div id="header" class="clearfix">' .
          $this->renderMainNav() .
          '<h1>' .
            $this->Html->link(
              __('Onolog', 1),
              date('/Y/m/'),
              array('class' => 'logo')
            ) .
          '</h1>' .
        '</div>' .
      '</div>' .
  
      // Main Content
      '<div id="content_wrapper">' .
        '<div id="content" class="clearfix">' .
  
          $this->Session->flash() .
          $this->Session->flash('auth') .
          // TODO: Create a PageHeader Helper class
          // $this->renderPageHeader() .
          '<div class="clearfix">' .
            '<div id="mainCol" class="clearfix">' .
              $this->getContent() .
            '</div>' .
            $this->renderSideCol() .
          '</div>' .
        '</div>' .
      '</div>' .
  
      // Footer
      '<div id="footer_wrapper">' .
        '<div id="footer" class="clearfix">' .
          '<div class="copyright">' .
            'Copyright &copy; ' . date('Y') . ' Onolog' .
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
   * This should probably be an element or something...
   */
  protected function renderMainNav() {
    if (!$this->Session->read('Auth.User')) {
      return '';
    }

    $nav_items = array(
      array(
        'content' => __('Home', 1),
        'href' => date('/Y/m/')
      )
    );

    $account_items = array(
      // Logout Link
      array(
        'link' => $this->Facebook->logout(array(
          'label' => 'Sign Out',
          'redirect' => array(
            'controller' => 'users',
            'action' => 'logout'
          )
        )),
      )
    );

    return 
      $this->renderMenu($nav_items, array('nav')) .
      $this->renderMenu($account_items, array('account'));
  }

  /**
   * Helper method to render a generic navigation menu
   * This should probably be a helper or element
   *
   * @param  arr  $items    Menu items 
   * @param  arr  $classes
   */
  protected function renderMenu($items, $classes=array()) {
    $classes[] = 'clearfix';

    $html = '<ul class="' . implode(' ', $classes) . '">';
    foreach ($items as $item) {
      // A bit of a hack to account for the logout link,
      // which doesn't need to be linkified
      $link = idx($item, 'link') ? $item['link'] :
        $this->Html->link(
          $item['content'],
          $item['href'],
          idx($item, 'params')
        );

      $html .= '<li>' . $link . '</li>';
    }
    $html .= '</ul>';

    return $html;
  }

  /**
   * TODO: make a legit PageHeader component
   */
  protected function renderPageHeader() {
    $html =
      '<div id="pageHeader">' .
        '<h2>' . $this->getPageHeader() . '</h2>' .
      '</div>';
  }

  protected function renderSideCol() {
    if (!$this->getSideCol()) {
      return '';
    }

    return
      '<div id="sideCol">' .
        // $this->element('user_info') .
        $this->getSideCol() .
      '</div>';
  }

  protected function getBaseCSS() {
    return
      $this->Html->css('/css/mobile/base') .
      $this->Html->css('/css/user_entity');
  }


}
