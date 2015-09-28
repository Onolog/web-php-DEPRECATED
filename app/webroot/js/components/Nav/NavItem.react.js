var React = require('react');

var cx = require('classnames');

/**
 * NavItem.react
 * @jsx React.DOM
 */
var NavItem = React.createClass({
  displayName: 'NavItem',

  propTypes: {
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      href: '#'
    };
  },

  getInitialState: function() {
    return {
      menuOpen: false
    };
  },

  componentDidMount: function() {
    // Collapse the dropdown if the user clicks somewhere other than the
    // trigger button.
    window.addEventListener('click', this._onWindowClick);
  },

  componentWillUnmount: function() {
    window.removeEventListener('click', this._onWindowClick);
  },

  render: function() {
    return (
      <li
        className={cx({
          'nav-item': true,
          'active': this.props.active,
          'disabled': this.props.disabled,
          'open': this.state.menuOpen
        }, this.props.className)}
        role="presentation">
        {this._renderLink()}
        {this._renderMenu()}
      </li>
    );
  },

  _renderLink: function() {
    var caret;
    var props = {className: 'nav-item-link'};

    if (!this.props.disabled) {
      props.href = this.props.href;
      props.onClick = this.props.onClick;
    }

    if (this.props.menu) {
      caret = <span className="caret" />
      props.onClick = this._toggleMenu;
    }

    return (
      <a {...props}>
        {this.props.children}
        {caret}
      </a>
    );
  },

  _renderMenu: function() {
    if (this.state.menuOpen) {
      return this.props.menu;
    }
  },

  _toggleMenu: function(evt) {
    evt.preventDefault();
    this.setState({menuOpen: !this.state.menuOpen});
  },

  _onWindowClick: function(evt) {
    var target = evt.target;
    var triggerNode = this.getDOMNode();
    if (!(triggerNode.contains(target) || target === triggerNode)) {
      this.setState({menuOpen: false})
    }
  }
});

module.exports = NavItem;
