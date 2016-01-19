var _ = require('underscore');
var React = require('react');

var Link = require('components/Link/Link.react');

var cx = require('classnames');

/**
 * ListGroupItem.react
 */
var ListGroupItem = React.createClass({
  displayName: 'ListGroupItem',

  propTypes: {
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    type: React.PropTypes.oneOf([
      'success',
      'info',
      'warning',
      'danger'
    ])
  },

  render: function() {
    var props = _.extend({}, this.props);
    var type = props.type;
    props.className = cx({
      'list-group-item': true,
      'active': props.active,
      'disabled': props.disabled,
      'list-group-item-success': type === 'success',
      'list-group-item-info': type === 'info',
      'list-group-item-warning': type === 'warning',
      'list-group-item-danger': type === 'danger'
    }, props.className);

    if (props.href) {
      return <Link {...props}>{props.children}</Link>;
    }

    if (props.onClick) {
      return <button {...props}>{props.children}</button>;
    }

    return <div {...props}>{props.children}</div>;
  }
});

module.exports = ListGroupItem;
