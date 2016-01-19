/**
 * DataRow.react
 *
 * Renders a label/content pairing. Used within a DataGroup, which
 * specifies alignment.
 */
define([

  'lib/react/react'

], function(React) {

  return React.createClass({

    propTypes: {
      label: React.PropTypes.string
    },
  
    render: function() {
      return (
        <div className="form-group">
          <label className="col-sm-3 control-label">
            {this.props.label}
          </label>
          <div className="col-sm-8">
            {this.props.children}
          </div>
        </div>
      );
    }
  });

});
