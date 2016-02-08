import React from 'react';
import cx from 'classnames';

require('./Topline.css');

/**
 * Topline.react
 *
 * Renders a series of labeled stats
 */
const Topline = React.createClass({
  displayName: 'Topline',

  render: function() {
    return (
      <ul className={cx('topline', this.props.className)}>
        {React.Children.map(this.props.children, this._renderChild)}
      </ul>
    );
  },

  _renderChild: function(child, idx) {
    return <li className="toplineItem" key={idx}>{child}</li>;
  },
});

module.exports = Topline;
