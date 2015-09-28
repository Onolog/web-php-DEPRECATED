var React = require('react');
var cx = require('classnames');

/**
 * FormGroup.react
 * @jsx React.DOM
 */
var FormGroup = React.createClass({
  displayName: 'FormGroup',

  propTypes: {
    label: React.PropTypes.string,
    type: React.PropTypes.string,
    hideLabel: React.PropTypes.bool
  },

  render: function() {
    return (
      <div className="form-group">
        <label for={this.props.name} className={cx({
          'control-label': true,
          'col-sm-3': true,
          'sr-only': this.props.hideLabel
        })}>
          {this.props.label}
        </label>
        <div className="col-sm-9">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = FormGroup;
