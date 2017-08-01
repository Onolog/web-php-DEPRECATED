var React = require('react');

require('./BarGraph.css');

/**
 * Graph.react
 *
 * Main container for bar graphs
 */
class Graph extends React.Component {
  render() {
    return (
      <ol className="graphContainer clearfix">
        {this.props.children}
      </ol>
    );
  }
}

module.exports = Graph;
