import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';
import {findDOMNode} from 'react-dom';

import {bisect, transform} from 'utils/d3Utils';

import './css/d3-mouse-indicator.css';

class MouseIndicator extends React.Component {

  render() {
    const {height, onMouseOut, width} = this.props;

    return (
      <g
        className="mouse-position"
        onMouseMove={this._handleMouseMove}
        onMouseOut={onMouseOut}>
        {this._renderIndicator()}
        <rect
          fill="none"
          height={height}
          pointerEvents="all"
          width={width}
        />
      </g>
    );
  }

  _renderIndicator = () => {
    const {data, height, mouseX, xScale, yFormat, yScale} = this.props;

    if (!mouseX) {
      return null;
    }

    const d = bisect(data, mouseX, 'x');
    const x = xScale(d.x);
    const y = yScale(d.y);

    return (
      <g>
        <path
          className="x-line"
          d={`M${x},${height} ${x},0`}
        />
        <g className="y-indicator" transform={transform(x, y)}>
          <circle r={4} />
          <text transform={transform(5, -5)}>
            {yFormat(d.y)}
          </text>
        </g>
      </g>
    );
  }

  _handleMouseMove = e => {
    // Force the event to persist so D3 can use it.
    e.persist();

    // Hack: Temporarily set the event for the mouse.
    let mouse;
    d3.customEvent(e, () => {
      mouse = d3.mouse(findDOMNode(this));
    });

    const {onMouseMove, xScale} = this.props;

    // Normalize for different scales by converting the mouse position to an
    // x-coordinate in the data.
    onMouseMove(xScale.invert(mouse[0]));
  }
}

MouseIndicator.propTypes = {
  height: PropTypes.number.isRequired,
  mouseX: PropTypes.number,
  onMouseMove: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  xScale: PropTypes.func.isRequired,
  yFormat: PropTypes.func,
  yScale: PropTypes.func.isRequired,
};

MouseIndicator.defaultProps = {
  yFormat: y => y,
};

export default MouseIndicator;
