import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Col, Row} from 'react-bootstrap';

require('./FlexContainer.css');

const FlexContainer = React.createClass({
  displayName: 'FlexContainer',

  propTypes: {
    type: PropTypes.oneOf(['col', 'row']).isRequired,
  },

  render() {
    const {className, type} = this.props;
    const Component = type === 'row' ? Row : Col;

    return (
      <Component
        {...this.props}
        className={cx('flex-container', {
          'flex-col': type === 'col',
          'flex-row': type === 'row',
        }, className)}>
        {this.props.children}
      </Component>
    );
  },
});

module.exports = FlexContainer;
