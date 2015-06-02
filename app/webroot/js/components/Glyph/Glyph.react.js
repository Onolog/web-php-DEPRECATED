/**
 * Glyph.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'utils/cx',
  'utils/joinClasses'

], function(

  React,
  cx,
  joinClasses

) {

  return React.createClass({
    displayName: 'Glyph',

    propTypes: {
      /**
       * Must be one of the icon names found at:
       *
       * http://getbootstrap.com/components/#glyphicons-glyphs
       */
      icon: React.PropTypes.string.isRequired
    },

    render: function() {
      var glyphClasses = 'glyphicon glyphicon-' + this.props.icon;
      return (
        <span className={joinClasses(glyphClasses, this.props.className)} />
      );
    }
  });

});
