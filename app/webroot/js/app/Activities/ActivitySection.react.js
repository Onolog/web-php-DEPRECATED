import React from 'react';

import cx from 'classnames';

require('./ActivitySection.css');

/**
 * ActivitySection.react
 */
const ActivitySection = React.createClass({
  displayName: 'ActivitySection',

  propTypes: {
    border: React.PropTypes.bool,
    title: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      border: false,
    };
  },

  render: function() {
    return (
      <div
        className={cx('activitySection', {
          'activitySectionBorder': this.props.border,
        }, this.props.className)}>
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
  },
});

module.exports = ActivitySection;
