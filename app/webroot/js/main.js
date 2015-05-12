/**
 * main.js
 *
 * Config file for require.js
 */

var GOOGLE_API_KEY = 'AIzaSyBI2oBuFbYuvwmHpNrQGjvmg7r-eIFKtEM';

/**
 * Config function for require.js
 */
requirejs.config({

  baseUrl: '/js',

  // Paths config is relative to the baseUrl, and never includes a ".js"
  // extension since the paths config could be for a directory.
  paths: {
    async: 'lib/require/async',
    bootstrap: 'lib/bootstrap.min',
    facebook: '//connect.facebook.net/en_US/all',
    'highcharts': [
      // CDN
      // 'https://code.highcharts.com/highcharts',
      // Local
      'lib/highcharts/highcharts'
    ],
    'jquery': [
      // CDN
      // '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
      // Local fallback
      'lib/jquery/jquery.min'
    ],
    'jsx': 'lib/react/jsx',
    JSXTransformer: 'lib/react/JSXTransformer',
    prototype: [
      // CDN
      // '//ajax.googleapis.com/ajax/libs/prototype/1.7.2.0/prototype',
      // Local fallback
      'lib/prototype'
    ],
    react: 'lib/react/react.min'
  },

  config: {
    moment: {
      noGlobal: true
    }
  },  

  shim: {
    'bootstrap': {
      deps: ['jquery'],
      exports: 'bootstrap'
    },
    'facebook': {
      exports: 'FB'
    },
    'highcharts': {
      deps: ['jquery'],
      exports: 'Highcharts'
    },
    'prototype': {
      // Don't actually need to use this object as 
      // Prototype affects native objects and creates global ones too
      // but it's the most sensible object to return
      exports: 'Prototype'
    }
  }
});

// Globally required files
require(['utils/LogoutDetect']);
// require(['lib/fb']);

// Load Google Maps API asynchronously
define('gmaps', [
  'async!https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_API_KEY + '&sensor=false'
], function() {
  window.google.maps;
});
