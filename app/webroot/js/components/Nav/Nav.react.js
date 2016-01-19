var React = require('react');

var cx = require('classnames');

/**
 * Nav.react
 */
var Nav = React.createClass({
  displayName: 'Nav',

  propTypes: {
    justified: React.PropTypes.bool,
    /**
     * When used in a Navbar, positions the nav on the right side.
     */
    right: React.PropTypes.bool,
    stacked: React.PropTypes.bool,
    type: React.PropTypes.oneOf(['navbar', 'pills', 'tabs'])
  },

  getDefaultProps: function() {
    return {
      justified: false,
      right: false,
      type: 'tabs'
    };
  },

  render: function() {
    var {children, className, justified, right, stacked, type} = this.props;

    var classes = cx({
      'nav': true,
      'nav-justified': justified,
      'nav-pills': type === 'pills',
      'nav-stacked': type === 'pills' && stacked,
      'nav-tabs': type === 'tabs',
      'navbar-nav': type === 'navbar',
      'navbar-right': type === 'navbar' && right
    }, className);

    return (
      <ul className={classes}>
        {children}
      </ul>
    );
  }
});

module.exports = Nav;
