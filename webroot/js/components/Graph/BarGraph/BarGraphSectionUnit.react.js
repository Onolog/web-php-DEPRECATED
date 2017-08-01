var React = require('react');

/**
 * GraphSectionUnit.react
 *
 * An abstract container for displaying one or more bars inside.
 */
class GraphSectionUnit extends React.Component {
  render() {
    return (
      <div className="graphSectionUnit">
        {this.props.children}
      </div>
    );
  }
}

module.exports = GraphSectionUnit;
