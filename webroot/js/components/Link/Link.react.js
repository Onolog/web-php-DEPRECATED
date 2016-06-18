import React from 'react';

/**
 * Link.react
 *
 * React wrapper around standard HTML <a> tag
 */
const Link = React.createClass({
  displayName: 'Link',

  getDefaultProps() {
    return {
      href: '#',
    };
  },

  render() {
    return (
      <a {...this.props} onClick={this._handleClick}>
        {this.props.children}
      </a>
    );
  },

  _handleClick(e) {
    if (this.props.href === '#') {
      e.preventDefault();
    }
    this.props.onClick && this.props.onClick(e);
  },
});

module.exports = Link;
