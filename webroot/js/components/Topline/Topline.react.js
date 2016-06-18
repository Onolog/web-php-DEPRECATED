import cx from 'classnames';
import React from 'react';

require('./Topline.css');

/**
 * Topline.react
 */
const Topline = (props) => {
  return (
    <ul className={cx('topline', props.className)}>
      {props.children}
    </ul>
  );
};

const ToplineItem = React.createClass({
  displayName: 'ToplineItem',

  propTypes: {
    annotation: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
  },

  render() {
    return (
      <li className="topline-item">
        <div className="topline-item-label">
          {this.props.label}
        </div>
        <div className="topline-item-data">
          {this.props.children}
        </div>
        {this._renderAnnotation()}
      </li>
    );
  },

  _renderAnnotation() {
    if (this.props.annotation) {
      return (
        <div className="topline-item-annotation">
          {this.props.annotation}
        </div>      
      );
    }
  },
});

Topline.Item = ToplineItem;

module.exports = Topline;
