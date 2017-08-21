import cx from 'classnames';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';

import './css/d3-line.css';

class Line extends React.Component {
  render() {
    const {className, data, x, y, ...props} = this.props;

    const line = d3.line()
      .x(x)
      .y(y);

    return (
      <path
        {...props}
        className={cx('line', className)}
        d={line(data)}
      />
    );
  }
}

Line.propTypes = {
  data: PropTypes.array.isRequired,
  x: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired,
};

export default Line;
