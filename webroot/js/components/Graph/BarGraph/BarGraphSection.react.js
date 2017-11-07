var PropTypes = require('prop-types');
var React = require('react');

/**
 * GraphSection.react
 *
 * A section within a bar graph that denotes a grouping of data. For example,
 * it could represent one month, with sets of data for that month displayed
 * within (multiple bars), or simply high-level data for that month (one bar).
 */
class GraphSection extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    metadata: PropTypes.string,
  };

  render() {
    return (
      <li className="graphSection">
        <div className="graphSectionData">
          {this.props.children}
        </div>
        <div className="graphSectionLabel">
          {this._renderGraphSectionLabel(this.props.label)}
          {this._renderGraphSectionMetadata(this.props.metadata)}
        </div>
      </li>
    );
  }

  _renderGraphSectionLabel = (label) => {
    if (label) {
      return <h4>{label}</h4>;
    }
  };

  _renderGraphSectionMetadata = (metadata) => {
    if (metadata) {
      return (
        <div className="graphSectionMetadata">
          {metadata}
        </div>
      );
    }
  };
}

module.exports = GraphSection;
