'use strict';

var path = require('path');
var webpack = require('webpack');

var JS_ROOT = path.join(__dirname, 'app/webroot/js');
var WEBPACK = require(JS_ROOT + '/constants/WebpackConstants');

var entryPages = {};
WEBPACK.ENTRY_PAGES.forEach(function(page) {
  entryPages[page] = path.join('__entry__', page + '.js');
});

// Plugins used across dev and prod
var commonPlugins = [
  // Generate a single chunk for common code
  new webpack.optimize.CommonsChunkPlugin('Common.js'),
  new webpack.optimize.OccurenceOrderPlugin(),

  // Don't pull in all of Moment's locales
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
];

var config = {
  context: JS_ROOT,
  entry: entryPages,
  output: {
    path: __dirname + '/app/webroot/__dev__',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader'},
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ]
  },
  // Just for prod config file. Not used by webpack.
  commonPlugins: commonPlugins,
  plugins: commonPlugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]),
  resolve: {
    root: [JS_ROOT],
    extensions: ['', '.js', '.json', 'jsx']
  }
};

module.exports = config;
