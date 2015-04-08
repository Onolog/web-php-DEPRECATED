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
      var classNames = joinClasses(
        'topline clearfix',
        this.props.className
      );

      return (
        <ul className={classNames}>
          {React.Children.map(this.props.children, this._renderChild)}
        </ul>
      );
    },

    _renderChild: function(child, idx) {
      return <li key={idx}>{child}</li>;
    }
  });

});
