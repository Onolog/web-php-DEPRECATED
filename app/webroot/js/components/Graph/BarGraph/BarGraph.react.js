/**
 * Graph.react
 * @jsx React.DOM
 *
 * Main container for bar graphs
 */
define(['lib/react/react'], function(React) {

  return React.createClass({
    render: function() {
      return (
        <ol className="graphContainer clearfix">
          {this.props.children}
        </ol>
      );
    }
  });

});
