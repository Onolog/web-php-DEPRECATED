import PropTypes from 'prop-types';
import React from 'react';

import {transform} from 'utils/d3Utils';
import {MARGIN} from 'constants/d3';

const Chart = ({children, height, transform, width}) => (
  <svg
    height={height}
    width={width}>
    <g
      className="chart"
      transform={transform}>
      {children}
    </g>
  </svg>
);

Chart.propTypes = {
  height: PropTypes.number.isRequired,
  transform: PropTypes.string,
  width: PropTypes.number.isRequired,
};

Chart.defaultProps = {
  transform: transform(MARGIN.left, MARGIN.top),
};

export default Chart;
