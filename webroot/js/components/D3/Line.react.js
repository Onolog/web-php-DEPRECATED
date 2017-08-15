import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';
import {findDOMNode} from 'react-dom';

import './css/d3-line.css';

class Line extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this._drawLine();
  }

  componentDidUpdate() {
    this._drawLine();
  }

  render() {
    return <path className="line" />;
  }

  _drawLine = () => {
    const {data, xScale, yScale} = this.props;

    const line = d3.line()
      .x(d => xScale(d.xVal))
      .y(d => yScale(d.yVal));

    d3.select(findDOMNode(this))
      .datum(data)
      .attr('d', line);
  }
}

export default Line;
