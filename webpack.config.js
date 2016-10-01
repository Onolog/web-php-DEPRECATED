'use strict';

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var JS_ROOT = path.join(__dirname, 'webroot', 'js');
var ENTRY_DIR = '__entry__';

// Generate entry page map
var entry = {};
fs.readdirSync(path.join(JS_ROOT, ENTRY_DIR)).forEach(function(filename) {
  var name = filename.split('.')[0]; // Remove `.js`
  entry[name] = path.join(ENTRY_DIR, filename);
});

// Plugins used across dev and prod
var commonPlugins = [
  // Generate a single chunk for common code
  new webpack.optimize.CommonsChunkPlugin({
    name: 'Common',
  }),
  new webpack.optimize.OccurenceOrderPlugin(),

  // Don't pull in all of Moment's locales
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
];

var config = {
  context: JS_ROOT,
  entry: entry,
  output: {
    path: path.join(JS_ROOT, 'build'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        // https://github.com/babel/babel-loader#options
        cacheDirectory: true,
      },
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader'
    }, {
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }]
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
    extensions: ['', '.js', '.json', '.jsx']
  }
};

module.exports = config;
