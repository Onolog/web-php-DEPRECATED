var React = require('react');
var cx = require('classnames');

/**
 * ActivitySection.react
 * @jsx React.DOM
 */
var ActivitySection = React.createClass({
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
    }, this.props.className);

    return (
      <div className={classNames}>
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

module.exports = ActivitySection;
