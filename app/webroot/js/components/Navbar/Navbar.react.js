var React = require('react');

var Nav = require('components/Nav/Nav.react');

var cx = require('classnames');

/**
 * Navbar.react
 */
var Navbar = React.createClass({
  displayName: 'Navbar',

  propTypes: {
    brand: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.string
    ]),
    fixed: React.PropTypes.oneOf([
      'bottom',
      'none',
      'top',
    ]),
    fluid: React.PropTypes.bool,
    inverse: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      fixed: 'none',
      fluid: false,
      inverse: false
    };
  },

  getInitialState: function() {
    return {
      collapsed: true
    };
  },

  render: function() {
    return (
      <nav
        className={cx({
          'navbar': true,
          'navbar-default': !this.props.inverse,
          'navbar-inverse': this.props.inverse,
          'navbar-fixed-bottom': this.props.fixed === 'bottom',
          'navbar-fixed-top': this.props.fixed === 'top'
        }, this.props.className)}>
        <div
          className={cx({
            'clearfix': true,
            'container': !this.props.fluid,
            'container-fluid': this.props.fluid
          })}>
          <div className="navbar-header">
            <button
              className="navbar-toggle"
              onClick={this._onNavbarToggleClick}
              type="button">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            {this._renderBrand()}
          </div>
          <div
            className={cx({
              'navbar-collapse': true,
              'collapse': true,
              'in': !this.state.collapsed
            })}
            style={this._getStyle()}>
            {React.Children.map(this.props.children, this._renderChild)}
          </div>
        </div>
      </nav>
    );
  },

  _renderBrand: function() {
    var brand = this.props.brand;
    if (!brand) {
      return;
    }

    var props = {className: 'navbar-brand'};
    if (typeof brand === 'object') {
      return React.cloneElement(this.props.brand, props);
    }

    return <span {...props}>{brand}</span>;
  },

  /**
   * Special handling of children depending on the type of component.
   */
  _renderChild: function(child) {
    if (!child) {
      return;
    }

    if (child.type === Nav) {
      return React.cloneElement(child, {type: 'navbar'});
    }

    return child;
  },

  _getStyle: function() {
    if (this.state.collapsed) {
      return {
        height: '1px'
      }
    }
  },

  _onNavbarToggleClick: function() {
    this.setState({collapsed: !this.state.collapsed})
  }
});

module.exports = Navbar;
