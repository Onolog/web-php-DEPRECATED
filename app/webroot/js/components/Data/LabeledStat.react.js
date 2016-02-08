import React from 'react';

/**
 * LabeledStat.react
 *
 * Renders a single label/statistic pair, with an optional annotation below
 */
const LabeledStat = React.createClass({
  displayName: 'LabeledStat',

  propTypes: {
    annotation: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    stat: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]).isRequired,
  },

  render: function() {
    return (
      <div className="labeledStat">
        <div className="labeledStatLabel">
          {this.props.label}
        </div>
        <div className="labeledStatData">
          {this.props.stat}
        </div>
        {this._renderAnnotation()}
      </div>
    );
  },

  _renderAnnotation: function() {
    if (this.props.annotation) {
      return (
        <div className="labeledStatAnnotation">
          {this.props.annotation}
        </div>      
      );
    }
  },
});

module.exports = LabeledStat;
