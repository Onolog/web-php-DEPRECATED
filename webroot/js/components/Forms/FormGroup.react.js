import React from 'react';
import cx from 'classnames';

/**
 * FormGroup.react
 */
const FormGroup = React.createClass({
  displayName: 'FormGroup',

  propTypes: {
    label: React.PropTypes.string,
    type: React.PropTypes.string,
    hideLabel: React.PropTypes.bool,
  },

  render: function() {
    return (
      <div className="form-group">
        <label
          className={cx('control-label', 'col-sm-3', {
            'sr-only': this.props.hideLabel,
          })}
          for={this.props.name}>
          {this.props.label}
        </label>
        <div className="col-sm-9">
          {this.props.children}
        </div>
      </div>
    );
  },
});

module.exports = FormGroup;
