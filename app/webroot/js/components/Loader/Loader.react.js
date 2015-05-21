/**
 * Loader.react
 *
 * Displays a loading indicator.
 *
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
    displayName: 'Loader',

    propTypes: {
      background: React.PropTypes.bool,
      full: React.PropTypes.bool,
      size: React.PropTypes.oneOf([
        'large',
        'small'
      ])
    },

    getDefaultProps: function() {
      return {
        background: false,
        full: false,
        size: 'large'
      };
    },

    render: function() {
      var classes = cx({
        'loader': true,
        'loader-bg': this.props.background,
        'loader-lg': this.props.size === 'large',
        'loader-full': this.props.full,
      });

      return (
        <div
          className={joinClasses(
            this.props.className,
            classes
          )}
        />
      );
    }
  });

});
