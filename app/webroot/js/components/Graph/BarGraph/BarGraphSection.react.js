var React = require('react');

/**
 * GraphSection.react
 * @jsx React.DOM
 *
 * A section within a bar graph that denotes a grouping of data. For example,
 * it could represent one month, with sets of data for that month displayed
 * within (multiple bars), or simply high-level data for that month (one bar).
 */
var GraphSection = React.createClass({

  propTypes: {
    label: React.PropTypes.string,
    metadata: React.PropTypes.string
  },

  render: function() {
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
  },

  _renderGraphSectionLabel: function(label) {
    if (label) {
      return <h4>{label}</h4>;
    }
  },

  _renderGraphSectionMetadata: function(metadata) {
    if (metadata) {
      return (
        <div className="graphSectionMetadata">
          {metadata}
        </div>
      );
    }
  }

});

module.exports = GraphSection;
