const PropTypes = require('prop-types');
var React = require('react');
var {OverlayTrigger, Tooltip} = require('react-bootstrap/lib');

var Link = require('components/Link/Link.react');

var cx = require('classnames');

/**
 * GraphBar.react
 *
 * Represent a single piece of data in a bar graph
 */
class GraphBar extends React.Component {
  static propTypes = {
    /**
     * If supplied, renders a link
     */
    href: PropTypes.string,
    label: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    /**
     * Adjusts the scale of the graph so that it doesn't just render at
     * 1px/unit.
     *
     * This is pretty much a huge hack to manually adjust the height of the
     * graph to make it fit correctly in the space. Need to come up with a
     * better system.
     */
    scale: PropTypes.number,
    value: PropTypes.number.isRequired,
  };

  static defaultProps = {
    scale: 1,
  };

  componentDidMount() {
    // Position/hide the label depending on the size of the bar
    // need to recalculate on windo resize
  }

  render() {
    const {label, scale, value} = this.props;

    return (
      <OverlayTrigger
        overlay={<Tooltip id={label}>{label}</Tooltip>}
        placement="top">
        <Link
          className={cx('graphBar', {'noData': !value})}
          href={this.props.href || '#'}
          style={{height: `${Math.floor(value * scale)}px`}}>
          <span className="graphBarLabel">
            {label}
          </span>
        </Link>
      </OverlayTrigger>
    );
  }
}

module.exports = GraphBar;
