/**
 * Menu.react
 * @jsx React.DOM
 *
 * Menu used in a dropdown.
 */
define([

  'lib/react/react',
  'utils/cx'

], function(

  React,
  cx

) {

  return React.createClass({
    displayName: 'Menu',

    propTypes: {
      /**
       * Horizontal alignment of the menu.
       */
      align: React.PropTypes.oneOf(['left', 'right'])
    },

    getDefaultProps: function() {
      return {
        align: 'left'
      };
    },

    render: function() {
      return (
        <ul
          className={cx({
            'dropdown-menu': true,
            'dropdown-menu-right': this.props.align === 'right'
          })}
          role="menu">
          {this.props.children}
        </ul>
      );
    }
  });

});