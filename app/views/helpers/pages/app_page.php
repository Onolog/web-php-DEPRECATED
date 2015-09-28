<?php
App::import('Helper', 'pages/Page');

/**
 * Renders a blank page, with all the app JS & CSS. Especially useful for
 * rendering the page client-side.
 */
class AppPageHelper extends PageHelper {

  protected function getBaseCSS() {
    // TODO: It shouldn't be necessary to prepend "/css/" to all of these...
    return
      parent::getBaseCSS() .
      $this->Html->css('/css/base/bootstrap') .
      $this->Html->css('/css/base/bs-override') .
      $this->Html->css('/css/base/app') .
      $this->Html->css('/css/base/fonts') .
      $this->Html->css('/css/base/util');
  }

  /**
   * Renders the <title> portion of an HTML page
   */
  protected function renderPageTitle() {
    return __('Onolog &middot; ', true) . $this->getPageTitle();
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
}
