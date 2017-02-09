import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Col, Row} from 'react-bootstrap';

import './FlexContainer.css';

const FlexContainer = props => {
  const {className, column} = props;
  const Component = column ? Col : Row;

  return (
    <Component
      {...props}
      className={cx('flex-container', {
        'flex-col': column,
        'flex-row': !column,
      }, className)}
    />
  );
};

FlexContainer.propTypes = {
  column: PropTypes.bool,
};

FlexContainer.defaultProps = {
  column: false,
};

export default FlexContainer;
