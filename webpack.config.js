'use strict';

var path = require('path');
var webpack = require('webpack');

var WEBROOT = path.join(__dirname, 'app/webroot');
var WEBPACK = require(WEBROOT + '/js/constants/WebpackConstants');

var entryPages = {};
WEBPACK.ENTRY_PAGES.forEach(function(page) {
  // /app/webroot/js/__entry__/filename.js
  entryPages[page] = path.join(WEBROOT, 'js', '__entry__', page + '.js');
});

var config = {
  entry: entryPages,
  output: {
    path: WEBROOT + '/__dev__',
    filename: '[name].js',
    publicPath: 'http://www.onolog.com/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.json$/, loaders: ['json-loader'] },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      // Fonts
      { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader'},
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    // Don't include every single moment locale
    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/, /en|no|hu/
    ),
  ],
  resolve: {
    // Allows you to require('file') instead of require('file.js')
    extensions: ['', '.js', '.json', 'jsx']
  }
};

module.exports = config;
