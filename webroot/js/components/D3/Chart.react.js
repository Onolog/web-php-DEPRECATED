import React from 'react';

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

export default Chart;
