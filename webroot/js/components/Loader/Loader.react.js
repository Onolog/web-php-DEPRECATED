var React = require('react');
var cx = require('classnames');

require('./Loader.css');

/**
 * Loader.react
 *
 * Displays a loading indicator.
 */
var Loader = React.createClass({
  displayName: 'Loader',

  propTypes: {
    background: React.PropTypes.bool,
    full: React.PropTypes.bool,
    size: React.PropTypes.oneOf([
      'large',
      'small',
    ]),
  },

  getDefaultProps: function() {
    return {
      background: false,
      full: false,
      size: 'large',
    };
  },

  render: function() {
    var {background, size, full, className} = this.props;

    return (
      <div
        className={cx('loader', {
          'loader-bg': background,
          'loader-lg': size === 'large',
          'loader-full': full,
        }, className)}
      />
    );
  },
});

module.exports = Loader;
