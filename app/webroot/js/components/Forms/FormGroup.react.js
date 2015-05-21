/**
 * FormGroup.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'utils/cx'

], function(React, cx) {

  return React.createClass({

    propTypes: {
      label: React.PropTypes.string.isRequired,
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

});
