var React = require('react');

/**
 * GraphSectionUnit.react
 *
 * An abstract container for displaying one or more bars inside.
 */
var GraphSectionUnit = React.createClass({
  render: function() {
    return (
      <div className="graphSectionUnit">
        {this.props.children}
      </div>
    );
  },
});

module.exports = GraphSectionUnit;
