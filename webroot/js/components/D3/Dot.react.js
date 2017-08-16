import React from 'react';

import './css/d3-dot.css';

export const Dots = ({children}) => (
  <g className="dots">
    {children}
  </g>
);

export class Dot extends React.Component {
  render() {
    const {x, y, radius} = this.props;

    return (
      <circle
        className="dot"
        cx={x}
        cy={y}
        r={radius}
      />
    );
  }
}
