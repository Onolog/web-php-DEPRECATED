/**
 * Middot.react
 * @jsx React.DOM
 *
 * Renders a styled middot character within a span
 */
define(['lib/react/react'], function(React) {
  return React.createClass({
    displayName: 'Middot',
    render: function() {
      return <span className="middot">&middot;</span>;
    }
  });
});
