var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var Md5HashPlugin = require('webpack-md5-hash');
var webpack = require('webpack');

module.exports = [
  // Generate a single chunk for common code
  new webpack.optimize.CommonsChunkPlugin({
    name: ['vendor'],
    minChunks: Infinity,
  }),
  // Don't pull in all of Moment's locales
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new Md5HashPlugin(),
  new ManifestPlugin({
    fileName: 'webpack-manifest.json',
  }),
  new ChunkManifestPlugin({
    filename: 'chunk-manifest.json',
    manifestVariable: 'chunkManifest'
  }),
  new ExtractTextPlugin({
    allChunks: true,
    filename: 'app-[contenthash:16].css',
  }),
];
