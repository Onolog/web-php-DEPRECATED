var React = require('react');

var cx = require('classnames');
var {values} = require('lodash');

const {USE} = require('constants/Bootstrap');
const {DANGER, DEFAULT, INFO, PRIMARY, SUCCESS, WARNING} = USE;


/**
 * Label.react
 */
var Label = React.createClass({
  displayName: 'Label',

  propTypes: {
    use: React.PropTypes.oneOf(values(USE))
  },

  render: function() {
    var use = this.props.use || DEFAULT;

    return (
      <span
        className={cx({
          'label': true,
          'label-default': use === DEFAULT,
          'label-primary': use === PRIMARY,
          'label-success': use === SUCCESS,
          'label-info': use === INFO,
          'label-warning': use === WARNING,
          'label-danger': use === DANGER
        }, this.props.className)}>
        {this.props.children}
      </span>
    );
  }
});

module.exports = Label;
