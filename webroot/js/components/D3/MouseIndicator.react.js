import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';
import {findDOMNode} from 'react-dom';

import {transform} from 'utils/d3Utils';

import './css/d3-mouse-indicator.css';

function getBisectedData(data, mouseX) {
  const bisect = d3.bisector(d => d.x).left;
  const i = bisect(data, mouseX, 1);
  const d0 = data[i - 1];
  const d1 = data[i];
  return mouseX - d0.x > d1.x - mouseX ? d1 : d0;
}

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

    const d = getBisectedData(data, mouseX);
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
