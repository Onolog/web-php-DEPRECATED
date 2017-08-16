import React from 'react';

import './css/d3-bar.css';

export const Bars = ({children}) => (
  <g className="bars">
    {children}
  </g>
);

export class Bar extends React.Component {
  render() {
    const {height, onClick, width, x, y} = this.props;

    return (
      <rect
        className="bar"
        height={height}
        onClick={e => onClick && onClick(e)}
        width={width}
        x={x}
        y={y}
      />
    );
  }
}
