/**
 * Topline.react
 * @jsx React.DOM
 *
 * Renders a series of labeled stats
 */
define([

  'lib/react/react',
  'utils/joinClasses'

], function(React, joinClasses) {

  return React.createClass({
    displayName: 'Topline',

    render: function() {
      return (
        <ul className={joinClasses('topline', this.props.className)}>
          {React.Children.map(this.props.children, this._renderChild)}
        </ul>
      );
    },

    _renderChild: function(child, idx) {
      return <li className="toplineItem" key={idx}>{child}</li>;
    }
  });

});
