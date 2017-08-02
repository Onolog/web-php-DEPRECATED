var baseConfig = require('./webpack.config.js');
var webpack = require('webpack');

module.exports = Object.assign({}, baseConfig, {

  output: Object.assign({}, baseConfig.output, {
    // Hash packages for long-term caching.
    chunkFilename: '[name]-[chunkhash:16].js',
    filename: '[name]-[chunkhash:16].js',
  }),

  plugins: baseConfig.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      // Omit comments in minimized output.
      comments: false,
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        except: ['$', 'exports', 'require']
      },
      sourceMap: true,
    }),
  ]),
});
