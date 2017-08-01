import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './Topline.scss';

/**
 * Topline.react
 */
const Topline = props => {
  return (
    <ul className={cx('topline', props.className)}>
      {props.children}
    </ul>
  );
};

const ToplineItem = React.createClass({
  displayName: 'ToplineItem',

  propTypes: {
    annotation: PropTypes.string,
    label: PropTypes.string.isRequired,
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
