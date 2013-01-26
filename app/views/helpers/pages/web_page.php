<?php
App::import('Helper', 'pages/Page');

/**
 * Renders a web page with site chrome
 */
class WebPageHelper extends PageHelper {

  private
    $pageHeader = '',
    $sideCol = '',
    $userID = null;

  public function __construct($scripts='', $classes=null) {
    parent::__construct($scripts, $classes);

    if ($this->Session->read('Auth.User')) {
      $this->userID = $this->Session->read('Auth.User.id');
    }
  }

  protected function getBaseJS() {
    return
      $this->Html->script('http://code.jquery.com/jquery-latest.js') .
      $this->Html->script('/js/bootstrap');
  }

  protected function getBaseCSS() {
    // TODO: It shouldn't be necessary to prepend "/css/" to all of these...
    return
      parent::getBaseCSS() .
      $this->Html->css('/css/base/normalize') .
      $this->Html->css('/css/base/base') .
      $this->Html->css('/css/base/bootstrap') .
      $this->Html->css('/css/base/button') .
      $this->Html->css('/css/base/layout') .
      $this->Html->css('/css/base/modal') .
      $this->Html->css('/css/base/responsive') .
      $this->Html->css('/css/base/util') .
      $this->Html->css('/css/base/form') .
      $this->Html->css('/css/user_entity') .
      $this->Html->css('/css/friend_list');
  }

  public function setSideCol($side_col) {
    if (!$side_col) {
      return $this;
    }
    // If there's a side column, add the appropriate body class
    $this->addClass('hasSideCol');
    $this->sideCol = $side_col;
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
    return
      // Header
      '<div id="headerWrapper">' .
        '<div id="header" class="clearfix">' .
          $this->renderMainNav() .
          $this->renderMobileNav() .
          '<h1>' .
            $this->Html->link(
              __('Onolog', 1),
              date('/Y/m/'),
              array('class' => 'logo')
            ) .
          '</h1>' .
          $this->renderAccountNav() .
        '</div>' .
      '</div>' .
  
      // Main Content
      '<div id="mainWrapper">' .
        '<div id="main" class="clearfix">' .
          $this->renderPageHeader() .
          '<div id="content" class="clearfix">' .
            $this->Session->flash() .
            $this->Session->flash('auth') .
            '<div id="mainCol">' .
              $this->getView() .
            '</div>' .
            $this->renderSideCol() .
          '</div>' .
        '</div>' .
      '</div>' .
  
      // Footer
      '<div id="footerWrapper">' .
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
        // $this->element('user_info') .
        $this->getSideCol() .
      '</div>';
  }

  /**
   * This should probably be an element or something...
   */
  protected function renderMainNav() {
    if (!$this->userID) {
      return '';
    }

    $nav_items = array(
      array(
        'content' => __('Calendar', 1),
        'href' => get_home_uri()
      ),
      array(
        'content' => __('Profile', 1),
        'href' => array(
          'controller' => 'users',
          'action' => 'profile',
          $this->userID
        )
      ),
      array(
        'content' => __('Shoes', 1),
        'href' => array(
          'controller' => 'users',
          'action' => 'shoes',
          $this->userID
        )
      ),
      array(
        'content' => __('Friends', 1),
        'href' => array(
          'controller' => 'users',
          'action' => 'friends',
        )
      ),
    );

    return $this->renderMenu($nav_items, array('nav hidden-phone'));
  }

  protected function renderMobileNav() {
    if (!$this->userID) {
      return '';
    }

    $nav_items = array(
      array(
        'content' => '·',
        'href' => '#'
      )
    );

    return $this->renderMenu($nav_items, array('mobileNav visible-phone'));
  }

  protected function renderAccountNav() {
    if (!$this->userID) {
      return '';
    }

    $user_link_content =
      $this->Html->image(
        'https://graph.facebook.com/'. $this->userID .'/picture',
        array('class' => 'account_img')
      ) .
      '<span class="account_name ellipses hidden-phone">' .
        $this->Session->read('Auth.User.name') .
      '</span>' .
      '<span class="account_arrow"></span>';

    $profile_url = array(
      'ajax' => false, // Don't add ajax prefix
      'controller' => 'users',
      'action' => 'profile',
      $this->userID
    );

    $id = 'account-menu';

    $account_items = array(
      array(
        'content' => $user_link_content,
        'href' => '#',
        'params' => array(
          'class' => 'user_info',
          'escape' => false,
          'id' => $id
        ),
        'submenu'=> array(
          'labelledby' => $id,
          'items' => array(
            // Profile Link
            array(
              'label' => __('Profile', 1),
              'href' => $profile_url
            ),
            // Settings Link
            array(
              'label' => __('Settings', 1),
              'href' => '#'
            ),
            array('divider' => true),
            // Logout Link
            array(
              'link' => $this->Facebook->logout(array(
                'label' => 'Sign Out',
                'redirect' => array(
                  'controller' => 'users',
                  'action' => 'logout'
                )
              ))
            )
          )
        )
      )
    );

    return $this->renderMenu($account_items, array('account'));
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
      $html .= $this->renderMenuItem($item);
    }
    $html .= '</ul>';

    return $html;
  }

  protected function renderMenuItem($item) {
    // Add submenu markup
    $submenu = '';
    if (idx($item, 'submenu', false)) {
      $submenu = $this->renderSubmenu($item['submenu']);
      $item['params']['data-toggle'] = 'dropdown';
    }

    $link = $this->Html->link(
      $item['content'],
      $item['href'],
      idx($item, 'params')
    );

    return '<li class="menuItem">' . $link . $submenu . '</li>';
  }

  protected function renderSubMenu($submenu=null) {
    if (!$submenu) {
      return '';
    }
    $html =
      '<ul ' .
        'role="menu" ' .
        'aria-labelledby="' . $submenu['labelledby'] . '" ' .
        'class="dropdown-menu"' .
      '>';

    foreach ($submenu['items'] as $subitem) {
      $html .= $this->renderSubMenuItem($subitem);
    }
    $html .= '</ul>';
    return $html;
  }

  protected function renderSubMenuItem($subitem) {

    if (idx($subitem, 'divider', false)) {
      return '<li class="divider"></li>';
    }

    // A bit of a hack to account for the logout link,
    // which doesn't need to be linkified
    $link = idx($subitem, 'link') ? $subitem['link'] :
      $this->Html->link(
        $subitem['label'],
        $subitem['href'],
        idx($subitem, 'params')
      );

    return '<li class="subMenuItem">' . $link . '</li>';
  }

  protected function renderPageJS() {
    return
      $this->getBaseJS() .
      $this->getPageJS() .
      $this->Facebook->init() .
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

}
