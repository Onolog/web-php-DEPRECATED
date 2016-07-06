import cx from 'classnames';
import d3 from 'd3';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

const Axis = React.createClass({
  propTypes: {
    orient: PropTypes.oneOf(['bottom', 'left', 'right', 'top']).isRequired,
    scale: PropTypes.func.isRequired,
    ticks: PropTypes.number,
    tickFormat: PropTypes.func,
    tickSize: PropTypes.number,
  },

  getDefaultProps() {
    return {
      ticks: 5,
      tickSize: 6,
    };
  },

  componentDidMount() {
    this._renderAxis();
  },

  componentDidUpdate() {
    this._renderAxis();
  },

  render() {
    const {className, transform} = this.props;
    return (
      <g
        className={cx('axis', className)}
        transform={transform}
      />
    );
  },

  _renderAxis() {
    const {orient, scale, ticks, tickFormat, tickSize} = this.props;
    const axis = d3.svg.axis()
      .orient(orient)
      .scale(scale)
      .ticks(ticks)
      .tickFormat(tickFormat)
      .tickSize(tickSize);

    d3.select(findDOMNode(this)).call(axis);
  },
});

export default Axis;
