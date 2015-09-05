/**
 * Label.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'constants/Bootstrap',
  'utils/cx',
  'utils/joinClasses',
  'lib/underscore/underscore'

], function(

  React,
  BOOTSTRAP,
  cx,
  joinClasses

) {

  var USE = BOOTSTRAP.USE;

  return React.createClass({
    displayName: 'Label',

    propTypes: {
      use: React.PropTypes.oneOf(_.values(USE))
    },

    render: function() {
      var use = this.props.use || USE.DEFAULT;

      return (
        <span
          className={joinClasses(cx({
            'label': true,
            'label-default': use === USE.DEFAULT,
            'label-primary': use === USE.PRIMARY,
            'label-success': use === USE.SUCCESS,
            'label-info': use === USE.INFO,
            'label-warning': use === USE.WARNING,
            'label-danger': use === USE.DANGER
          }), this.props.className)}>
          {this.props.children}
        </span>
      );
    }
  });

});
