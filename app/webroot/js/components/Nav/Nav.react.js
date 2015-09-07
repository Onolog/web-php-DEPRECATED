define([

  'lib/react/react',
  'utils/cx',
  'utils/joinClasses'

], function(

  React,
  cx,
  joinClasses

) {

  /**
   * Nav.react
   * @jsx React.DOM
   */
  return React.createClass({
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
      var props = this.props;
      var type = props.type;
      var classNames = cx({
        'nav': true,
        'nav-justified': props.justified,
        'nav-pills': type === 'pills',
        'nav-stacked': type === 'pills' && props.stacked,
        'nav-tabs': type === 'tabs',
        'navbar-nav': type === 'navbar',
        'navbar-right': type === 'navbar' && props.right
      });

      return (
        <ul className={joinClasses(classNames, props.className)}>
          {props.children}
        </ul>
      );
    }
  });

});
