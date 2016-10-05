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
    $data = [],
    $pageTitle = '',
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
          $this->Html->meta([
            'name' => 'viewport',
            'content' => 'width=device-width, initial-scale=1.0, user-scalable=no'
          ]) .
          $this->pageMeta .
          '<title>' . $this->renderPageTitle() . '</title>' .
          $this->Html->css('/css/base/bootstrap') .
          $this->Html->css('/css/base/app') .
          $this->Html->css('/css/base/bs-override') .
          $this->Html->css('/css/base/fonts') .
          $this->Html->css('/css/base/util') .
          $this->getDebugCSS() .
        '</head>' .
        '<body>' .
          '<div id="root">' .
            '<div class="react-loader"></div>' .
          '</div>' .
          $this->renderChunkManifest() .
          $this->renderAppData() .
          $this->Html->script('/js/build/'. get_asset_name('Common')) .
          $this->Html->script('/js/build/'. get_asset_name('App')) .
          $this->renderGoogleAnalyticsJS() .
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

  public function setData($data) {
    $this->data = $data;
    return $this;
  }

  public function setMeta($meta) {
    $this->pageMeta = $meta;
    return $this;
  }

  protected function getDebugCSS() {
    return Configure::read('debug') > 0 ?
      $this->Html->css('/css/base/debug') :
      '';
  }

  /**
   * Renders the <title> portion of an HTML page. Simply returns the page title
   * here, but can be extended to add other things, like the site name.
   */
  protected function renderPageTitle() {
    return __('Onolog &middot; ') . $this->pageTitle;
  }

  protected function renderAppData() {
    // Prepare all the data for the client.
    $session = $this->request->session();
    $loggedInUser = $session->read('Auth.User');

    $app_data = [
      'activities' => [],
      'brands' => [],
      'session' => array_merge(
        $loggedInUser ?: [],
        $session->read('Config')
      ),
      'shoes' => [],
      'users' => [],
    ];

    if (isset($this->data)) {
      $app_data = array_merge($app_data, $this->data);
    }

    $encoded_data = json_encode($app_data, JSON_NUMERIC_CHECK);

    return
      '<script>' .
        "window.APP_DATA = $encoded_data;" .
      '</script>';
  }

  /**
   * Inline the manifest so webpack can map chunks to internal module ids.
   */
  protected function renderChunkManifest() {
    if (!__PROD__) {
      return '';
    }

    $manifest = file_get_contents('js/build/chunk-manifest.json');

    return
      '<script>' .
        'window.chunkManifest = ' . $manifest . ';' .
      '</script>';
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
