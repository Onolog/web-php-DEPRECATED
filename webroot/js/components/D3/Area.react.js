import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';
import {findDOMNode} from 'react-dom';

import {getInnerHeight} from 'utils/d3Utils';

import './css/d3-area.css';

class Area extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this._drawArea();
  }

  componentDidUpdate() {
    this._drawArea();
  }

  render() {
    return <path className="area" />;
  }

  _drawArea = () => {
    const {data, height, xScale, yScale} = this.props;

    const area = d3.area()
      .x(d => xScale(d.xVal))
      .y0(getInnerHeight(height))
      .y1(d => yScale(d.yVal));

    d3.select(findDOMNode(this))
      .datum(data)
      .attr('d', area);
  }
}

export default Area;
