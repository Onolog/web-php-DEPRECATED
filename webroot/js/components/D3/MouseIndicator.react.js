import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';
import {findDOMNode} from 'react-dom';

import {transform} from 'utils/d3Utils';

import './css/d3-mouse-indicator.scss';

class MouseIndicator extends React.Component {

  render() {
    const {height, onMouseOut, width} = this.props;

    return (
      <g
        className="mouse-indicator"
        onMouseMove={this._handleMouseMove}
        onMouseOut={onMouseOut}>
        {this._renderIndicator()}
        <rect
          className="mouse-indicator-background"
          height={height}
          width={width}
        />
      </g>
    );
  }

  _renderIndicator = () => {
    const {d, height, x, yFormat, y} = this.props;

    if (!d) {
      return null;
    }

    return (
      <g>
        <path
          className="mouse-indicator-line"
          d={`M${x(d)},${height} ${x(d)},0`}
        />
        <g className="mouse-indicator-data" transform={transform(x(d), y(d))}>
          <circle r={4} />
          <text transform={transform(5, -5)}>
            {yFormat(d)}
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
  d: PropTypes.object,
  height: PropTypes.number.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  x: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired,
  yFormat: PropTypes.func.isRequired,
};

export default MouseIndicator;
