import cx from 'classnames';
import d3 from 'd3';
import PropTypes from 'prop-types';
import React from 'react';
import {findDOMNode} from 'react-dom';

class Axis extends React.Component {
  static propTypes = {
    orient: PropTypes.oneOf(['bottom', 'left', 'right', 'top']).isRequired,
    scale: PropTypes.func.isRequired,
    ticks: PropTypes.number,
    tickFormat: PropTypes.func,
    tickSize: PropTypes.number,
  };

  static defaultProps = {
    ticks: 5,
    tickSize: 6,
  };

  componentDidMount() {
    this._renderAxis();
  }

  componentDidUpdate() {
    this._renderAxis();
  }

  render() {
    const {className, transform} = this.props;
    return (
      <g
        className={cx('axis', className)}
        transform={transform}
      />
    );
  }

  _renderAxis = () => {
    const {orient, scale, ticks, tickFormat, tickSize} = this.props;
    const axis = d3.svg.axis()
      .orient(orient)
      .scale(scale)
      .ticks(ticks)
      .tickFormat(tickFormat)
      .tickSize(tickSize);

    d3.select(findDOMNode(this)).call(axis);
  };
}

export default Axis;
