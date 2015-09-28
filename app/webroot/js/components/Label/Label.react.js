var _ = require('underscore');
var React = require('react');

var cx = require('classnames');

var USE = require('../../constants/Bootstrap').USE;

/**
 * Label.react
 * @jsx React.DOM
 */
var Label = React.createClass({
  displayName: 'Label',

  propTypes: {
    use: React.PropTypes.oneOf(_.values(USE))
  },

  render: function() {
    var use = this.props.use || USE.DEFAULT;

    return (
      <span
        className={cx({
          'label': true,
          'label-default': use === USE.DEFAULT,
          'label-primary': use === USE.PRIMARY,
          'label-success': use === USE.SUCCESS,
          'label-info': use === USE.INFO,
          'label-warning': use === USE.WARNING,
          'label-danger': use === USE.DANGER
        }, this.props.className)}>
        {this.props.children}
      </span>
    );
  }
});

module.exports = Label;
