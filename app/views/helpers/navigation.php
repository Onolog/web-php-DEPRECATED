<?php

/**
 * /app/views/helpers/navigation.php
 *
 * Class for rendering the main site nav
 */
class NavigationHelper extends AppHelper {

  var $helpers = array(
    'Facebook',
    'Html',
    'Include',
    'Session'
  );

  protected
    $Facebook,
    $Html,
    $Include,
    $Session;

  private $userID;

  public function __construct() {
    parent::__construct();

    // Set Helpers & Components
    $view =& ClassRegistry::getObject('view');
    // $this->Facebook = $view->Facebook;

    $this->Html = new HtmlHelper();
    $this->Include = new IncludeHelper();
    $this->Session = new SessionHelper();

    if ($this->Session->read('Auth.User')) {
      $this->userID = $this->Session->read('Auth.User.id');
    }
  }

  public function render() {
    return
      '<header ' .
        'id="headerWrapper" ' .
        'class="navbar navbar-inverse navbar-fixed-top">' .
        '<div id="header" class="container clearfix">' .

          '<div class="navbar-header">' .
            '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">' .
              '<span class="sr-only">Toggle navigation</span>' .
              '<span class="icon-bar"></span>' .
              '<span class="icon-bar"></span>' .
              '<span class="icon-bar"></span>' .
            '</button>' .

            // Logo
            $this->Html->link(
              __('Onolog', 1),
              date('/Y/m/'),
              array('class' => 'logo')
            ) .
          '</div>' .

          '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' .
            $this->renderMainMenu() .
            $this->renderAccountMenu() .
          '</div>' .
        '</div>' .
      '</header>';
  }

  /**
   * This should probably be an element or something...
   */
  protected function renderMainMenu() {
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
          'action' => 'shoes'
        )
      ),
    );

    // Condensed dropdown menu for tablets and narrower screens
    $dropdown_items = array(
      array(
        'content' => __('Training', 1) . '<i class="caret"></i>',
        'href' => '#',
        'params' => array(
          'class' => 'dropdown-toggle',
          'escape' => false,
          'id' => 'condensed-nav'
        ),
        'submenu'=> array(
          'labelledby' => 'condensed-nav',
          'items' => $nav_items
        )
      )
    );

    return
      $this->renderMenu($nav_items, array('nav navbar-nav navbar-left expanded-nav')) .
      $this->renderMenu($dropdown_items, array('nav navbar-nav navbar-left condensed-nav'));
  }

  protected function renderAccountMenu() {
    if (!$this->userID) {
      return '';
    }

    $user_link_content =
      $this->Html->image(
        'https://graph.facebook.com/'. $this->userID .'/picture',
        array('class' => 'accountImg')
      ) .
      '<span class="accountName ellipses hidden-phone">' .
        $this->Session->read('Auth.User.name') .
      '</span>' .
      '<i class="caret"></i>';

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
          'class' => 'userInfo dropdown-toggle',
          'escape' => false,
          'id' => $id
        ),
        'submenu'=> array(
          'labelledby' => $id,
          'items' => array(
            // Profile Link
            array(
              'content' => __('Profile', 1),
              'href' => $profile_url
            ),
            // Settings Link
            array(
              'content' => __('Settings', 1),
              'href' => array(
                'controller' => 'users',
                'action' => 'settings',
              )
            ),
            /*
            array(
              'content' => __('Friends', 1),
              'href' => array(
                'controller' => 'users',
                'action' => 'friends',
              )
            ),
            */
            array('divider' => true),
            // Logout Link
            array(
              'content' => __('Sign Out', 1),
              'href' => array(
                'controller' => 'users',
                'action' => 'logout',
              )
            )
            /*
            array(
              'link' => $this->Facebook->logout(array(
                'label' => 'Sign Out',
                'redirect' => array(
                  'controller' => 'users',
                  'action' => 'logout'
                )
              ))
            )
            */
          )
        )
      )
    );

    return $this->renderMenu($account_items, array('nav navbar-nav navbar-right account'));
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
        $subitem['content'],
        $subitem['href'],
        idx($subitem, 'params')
      );

    return '<li class="subMenuItem">' . $link . '</li>';
  }
}
