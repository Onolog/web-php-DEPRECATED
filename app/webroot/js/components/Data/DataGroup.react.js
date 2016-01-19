/**
 * DataGroup.react
 *
 * Renders a group of DataRows
 */
define([

  'lib/react/react',
  'utils/cx'

], function(React, cx) {

  return React.createClass({

    propTypes: {
      display: React.PropTypes.oneOf([
        'default',
        'inline',
        'horizontal'
      ])
    },
  
    render: function() {
      // TODO: Validate that these are instances of DataRow
      React.Children.forEach(this.props.children, function(child) {
        if (!child) {
          throw new Error('Children must instances of DataRow');
        }
      });

      var className = cx({
        'clearfix': true,
        'form-horizontal': this.props.display === 'horizontal',
        'form-inline': this.props.display === 'inline',
      });

      return (
        <div {...this.props} className={className}>
          {this.props.children}
        </div>
      );
    }
  });

});
