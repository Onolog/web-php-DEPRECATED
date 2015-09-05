/**
 * Button.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Button/AbstractButton.react',
  'utils/cx',
  'utils/joinClasses',
  'constants/Bootstrap',
  'lib/underscore/underscore'

], function(

  React,
  AbstractButton,
  cx,
  joinClasses,
  BOOTSTRAP

) {

  var SIZE = BOOTSTRAP.SIZE;
  var USE = BOOTSTRAP.USE;

  USE.LINK = 'link'; // Extra use type for buttons.

  return React.createClass({
    displayName: 'Button',

    propTypes: {
      use: React.PropTypes.oneOf(_.values(USE)),
      size: React.PropTypes.oneOf(_.values(SIZE)),
      suppressed: React.PropTypes.bool
    },
  
    render: function() {
      var use = this.props.use || USE.DEFAULT;
      var size = this.props.size || SIZE.DEFAULT;
      var classNames = cx({
        'btn': true,

        // Use
        'btn-default': use === USE.DEFAULT,
        'btn-primary': use === USE.PRIMARY,
        'btn-success': use === USE.SUCCESS,
        'btn-info': use === USE.INFO,
        'btn-warning': use === USE.WARNING,
        'btn-danger': use === USE.DANGER,
        'btn-link': use === USE.LINK,

        // Size
        'btn-lg': size === SIZE.LARGE,
        'btn-sm': size === SIZE.SMALL,
        'btn-xs': size === SIZE.XSMALL
      });
  
      return (
        <AbstractButton
          {...this.props}
          className={joinClasses(classNames, this.props.className)}
        />
      );
    }

  });

});
