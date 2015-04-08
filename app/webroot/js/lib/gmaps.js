var GOOGLE_API_KEY = 'AIzaSyBI2oBuFbYuvwmHpNrQGjvmg7r-eIFKtEM';

// Load Google Maps API asynchronously
define([
  'async!https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_API_KEY + '&sensor=false'
], function() {
  window.google.maps;
});