var React = require('react');

require('./BarGraph.css');

/**
 * Graph.react
 *
 * Main container for bar graphs
 */
var Graph = React.createClass({
  render: function() {
    return (
      <ol className="graphContainer clearfix">
        {this.props.children}
      </ol>
    );
  }
});

module.exports = Graph;
