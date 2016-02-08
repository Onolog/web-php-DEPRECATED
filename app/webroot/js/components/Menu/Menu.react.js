import React from 'react';
import cx from 'classnames';

/**
 * Menu.react
 *
 * Menu used in a dropdown.
 */
const Menu = React.createClass({
  displayName: 'Menu',

  propTypes: {
    /**
     * Horizontal alignment of the menu.
     */
    align: React.PropTypes.oneOf(['left', 'right']),
  },

  getDefaultProps: function() {
    return {
      align: 'left',
    };
  },

  render: function() {
    return (
      <ul
        className={cx('dropdown-menu', {
          'dropdown-menu-right': this.props.align === 'right',
        })}
        role="menu">
        {this.props.children}
      </ul>
    );
  },
});

export default Menu;
