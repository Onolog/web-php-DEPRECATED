/**
 * GraphSectionUnit.react
 * @jsx React.DOM
 *
 * An abstract container for displaying one or more bars inside.
 */
define(['lib/react/react'], function(React) {
  return React.createClass({
    render: function() {
      return (
        <div className="graphSectionUnit">
          {this.props.children}
        </div>
      );
    }
  });
});
