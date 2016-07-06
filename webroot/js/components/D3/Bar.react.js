import d3tip from 'd3-tip';
import React from 'react';
import {findDOMNode} from 'react-dom';

const Bar = React.createClass({

  componentDidMount() {
    const {tooltip} = this.props;
    if (!tooltip) {
      return;
    }

    const tip = d3tip()
      .attr('class', 'tooltip top')
      .html(`
        <div class="tooltip-arrow"></div>
        <div class="tooltip-inner">${tooltip}</div>
      `);

    const bar = d3.select(findDOMNode(this))
      .call(tip)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
  },

  render() {
    const {height, onClick, width, x, y} = this.props;
    return (
      <rect
        className="bar"
        height={height}
        onClick={(e) => onClick && onClick(e)}
        width={width}
        x={x}
        y={y}
      />
    );
  },
});

export default Bar;
