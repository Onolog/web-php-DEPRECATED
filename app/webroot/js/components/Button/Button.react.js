var _ = require('underscore');
var React = require('react');

var AbstractButton = require('components/Button/AbstractButton.react');

var cx = require('classnames');

var {SIZE, USE} = require('constants/Bootstrap');

USE.LINK = 'link'; // Extra use type for buttons.

/**
 * Button.react
 * @jsx React.DOM
 */
var Button = React.createClass({
  displayName: 'Button',

  propTypes: {
    use: React.PropTypes.oneOf(_.values(USE)),
    size: React.PropTypes.oneOf(_.values(SIZE)),
    suppressed: React.PropTypes.bool
  },

  render: function() {
    var use = this.props.use || USE.DEFAULT;
    var size = this.props.size || SIZE.DEFAULT;
    var classNames = cx({
      'btn': true,

      // Use
      'btn-default': use === USE.DEFAULT,
      'btn-primary': use === USE.PRIMARY,
      'btn-success': use === USE.SUCCESS,
      'btn-info': use === USE.INFO,
      'btn-warning': use === USE.WARNING,
      'btn-danger': use === USE.DANGER,
      'btn-link': use === USE.LINK,

      // Size
      'btn-lg': size === SIZE.LARGE,
      'btn-sm': size === SIZE.SMALL,
      'btn-xs': size === SIZE.XSMALL
    }, this.props.className);

    return <AbstractButton {...this.props} className={classNames} />;
  }

});

module.exports = Button;
