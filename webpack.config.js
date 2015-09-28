var path = require('path');

var WEBROOT = path.join(__dirname, 'app/webroot');
var JS_PATH = path.join(WEBROOT, 'js');

var ENTRY_PAGES = [
  'Daniels',
  'Garmin',

  // Pages
  'Bootstrap',
  'Privacy',
  'React',
  'Terms',

  // Shoes
  'AllShoes',
  'Shoe',

  // Users
  'Friends',
  'Home',
  'Login',
  'Profile',
  'Report',
  'Settings',

  // Workouts
  'WorkoutAddEdit',
  'Workout'
];

var entryPages = {};
ENTRY_PAGES.forEach(function(page) {
  // /app/webroot/js/__entry__/filename.js
  entryPages[page] = path.join(WEBROOT, 'js', '__entry__', page + '.js');
});

module.exports = {
  entry: entryPages,
  output: {
    path: WEBROOT + '/build',
    filename: '[name].js',
    publicPath: 'http://www.onolog.com/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      // Fonts
      { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader'},
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ]
  },
  resolve: {
    // Allows you to require('file') instead of require('file.js')
    extensions: ['', '.js', '.json']
  }
};
