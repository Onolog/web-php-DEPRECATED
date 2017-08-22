import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';
import {findDOMNode} from 'react-dom';

class MouseLine extends React.Component {
  componentDidMount() {
    this._drawLine(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._drawLine(nextProps);
  }

  render() {
    const {height, width} = this.props;

    return (
      <g className="mouse-effects">
        <path
          className="mouse-line"
          style={{
            stroke: 'black',
            strokeWidth: '1px',
          }}
        />
        <rect
          fill="none"
          height={height}
          pointerEvents="all"
          width={width}
        />
      </g>
    );
  }

  _drawLine = props => {
    const line = d3.select('.mouse-line');
    d3.select(findDOMNode(this))
      .on('mouseout', () => line.style('opacity', '0'))
      .on('mouseover', () => line.style('opacity', '0.5'))
      .on('mousemove', () => {
        const mouse = d3.mouse(findDOMNode(this));
        line.attr('d', () => `M${mouse[0]},${props.height} ${mouse[0]},0`);
      });
  }
}

MouseLine.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default MouseLine;
