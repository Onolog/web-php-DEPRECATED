/**
 * ActivitySection.react
 * @jsx React.DOM
 */

define([

  'lib/react/react',
  'utils/cx',
  'utils/joinClasses'

], function(

  React,
  cx,
  joinClasses

) {

  return React.createClass({
    displayName: 'ActivitySection',

    propTypes: {
      border: React.PropTypes.bool,
      title: React.PropTypes.string
    },

    getDefaultProps: function() {
      return {
        border: false
      };
    },

    render: function() {
      var classNames = cx({
        'activitySection': true,
        'activitySectionBorder': this.props.border
      });

      return (
        <div className={joinClasses(classNames, this.props.className)}>
          {this._renderTitle()}
          {this.props.children}
        </div>
      );
    },

    _renderTitle: function() {
      if (this.props.title) {
        return (
          <h4 className="activitySectionTitle">
            {this.props.title}
          </h4>
        );
      }
    }
  });

});
