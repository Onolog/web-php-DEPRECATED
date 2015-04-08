/**
 * Button.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Button/AbstractButton.react'

], function(React, AbstractButton) {

  return React.createClass({
    displayName: 'Button',

    propTypes: {
      use: React.PropTypes.oneOf([
        'default',
        'primary',
        'success',
        'info',
        'warning',
        'danger',
        'link'
      ]),
      size: React.PropTypes.oneOf([
        'large',
        'default',
        'small',
        'xsmall'
      ]),
      suppressed: React.PropTypes.bool
    },
  
    render: function() {
      var use = this.props.use || 'default';
      var size = this.props.size || 'default';

      var cx = React.addons.classSet;
      var className = cx({
        'btn': true,

        // Use
        'btn-default': use === 'default',
        'btn-primary': use === 'primary',
        'btn-success': use === 'success',
        'btn-info': use === 'info',
        'btn-warning': use === 'warning',
        'btn-danger': use === 'danger',
        'btn-link': use === 'link',

        // Size
        'btn-lg': size === 'large',
        'btn-sm': size === 'small',
        'btn-xs': size === 'xsmall',

        //'btn-suppressed': this.props.suppressed,
        'selected': use !== 'default'
      });
  
      return this.transferPropsTo(
        <AbstractButton className={className} />
      );
    }

  });

});
