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
    $pageMeta;

  /**
   * Prints all the page markup to the browser
   *
   * @return  str   The page markup
   */
  public function render() {
    $manifest = json_decode(file_get_contents(
      'build/webpack-manifest.json'
    ), true);

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

          // Placeholder title. Replaced on client.
          '<title>Onolog</title>' .

          // CSS
          $this->Html->css('//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', [
            'rel' => 'stylesheet',
            'integrity' => 'sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u',
            'crossorigin' => 'anonymous',
          ]) .

          $this->Html->css('//cdn.materialdesignicons.com/1.8.36/css/materialdesignicons.min.css', [
            'rel' => 'stylesheet',
            'crossorigin' => 'anonymous',
          ]) .

          $this->Html->css('/css/base/base') .
          $this->Html->css('/css/base/bs-override') .
          $this->Html->css('/css/base/fonts') .
          $this->Html->css('/css/base/util') .
          $this->Html->css('/build/' . $manifest['app.css']) .
        '</head>' .
        '<body>' .
          '<div id="root">' .
            '<div class="react-loader"></div>' .
          '</div>' .

          // Javascript
          $this->renderChunkManifest() .
          $this->renderAppData() .
          $this->Html->script('/build/'. $manifest['vendor.js']) .
          $this->Html->script('/build/'. $manifest['app.js']) .
          $this->renderGoogleAnalyticsJS() .
        '</body>' .
      '</html>';
  }

  public function setData($data) {
    $this->data = $data;
    return $this;
  }

  public function setMeta($meta) {
    $this->pageMeta = $meta;
    return $this;
  }

  private function renderAppData() {
    // Prepare all the data for the client.
    $session = $this->request->session();
    $loggedInUser = $session->read('Auth.User') ?: [];
    $sessionConfig = $session->read('Config') ?: [];

    $app_data = ['session' => array_merge($loggedInUser, $sessionConfig)];

    if (isset($this->data)) {
      $app_data = array_merge($app_data, $this->data);
    }

    $encoded_data = json_encode($app_data, JSON_NUMERIC_CHECK);

    return "<script>window.APP_DATA=$encoded_data;</script>";
  }

  /**
   * Inline the manifest so webpack can map chunks to internal module ids.
   */
  private function renderChunkManifest() {
    $manifest = file_get_contents('build/chunk-manifest.json');

    return "<script>window.chunkManifest=$manifest;</script>";
  }

  /**
   * Renders the JS needed for Google analytics. This is pretty much global
   * code, except for the individual site id. This id is stored as a constant
   * in init.php and can be changed on a per-site basis.
   */
  private function renderGoogleAnalyticsJS() {
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
