var React = require('react');

var cx = require('classnames');

/**
 * Glyph.react
 * @jsx React.DOM
 */
var Glyph = React.createClass({
  displayName: 'Glyph',

  propTypes: {
    /**
     * Must be one of the icon names found at:
     *
     * http://getbootstrap.com/components/#glyphicons-glyphs
     */
    icon: React.PropTypes.string.isRequired
  },

  render: function() {
    var {icon, className} = this.props;

    return (
      <span className={cx('glyphicon', 'glyphicon-' + icon, className)} />
    );
  }
});

module.exports = Glyph;
