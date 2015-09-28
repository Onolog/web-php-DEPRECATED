var React = require('react');

require('./BarGraph.css');

/**
 * Graph.react
 * @jsx React.DOM
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
