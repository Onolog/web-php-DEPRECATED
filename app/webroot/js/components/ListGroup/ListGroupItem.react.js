/**
 * ListGroupItem.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Link/Link.react',
  'utils/cx',
  'utils/joinClasses'

], function(

  React,
  Link,
  cx,
  joinClasses

) {

  return React.createClass({
    displayName: 'ListGroup',

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
      var props = this.props;
      var type = props.type;
      props.className = joinClasses(props.className, cx({
        'list-group-item': true,
        'active': props.active,
        'disabled': props.disabled,
        'list-group-item-success': type === 'success',
        'list-group-item-info': type === 'info',
        'list-group-item-warning': type === 'warning',
        'list-group-item-danger': type === 'danger'
      }));

      if (props.href) {
        return <Link {...props}>{props.children}</Link>;
      }

      if (props.onClick) {
        return <button {...props}>{props.children}</button>;
      }

      return <div {...props}>{props.children}</div>;
    }

  });

});
