import d3 from 'd3';
import d3tip from 'd3-tip';
import React from 'react';
import {findDOMNode} from 'react-dom';

const Bar = React.createClass({

  componentDidMount() {
    this._setTooltip(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this._setTooltip(nextProps);
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

  _setTooltip({tooltip}) {
    if (!tooltip) {
      return;
    }

    const tip = d3tip()
      .attr('class', 'tooltip top')
      .html(`
        <div class="tooltip-arrow"></div>
        <div class="tooltip-inner">${tooltip}</div>
      `);

    d3.select(findDOMNode(this))
      .call(tip)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
  },
});

export default Bar;
