var React = require('react');

/**
 * Link.react
 *
 * React wrapper around standard HTML <a> tag
 */
var Link = React.createClass({
  displayName: 'Link',

  render: function() {
    return (
      <a {...this.props} onClick={this._onClick}>
        {this.props.children}
      </a>
    );
  },

  _onClick: function(e) {
    if (this.props.href === '#') {
      e.preventDefault();
    }
    this.props.onClick && this.props.onClick(e);
  }
});

module.exports = Link;
