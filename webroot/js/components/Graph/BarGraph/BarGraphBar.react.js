var React = require('react');
var {OverlayTrigger, Tooltip} = require('react-bootstrap/lib');

var Link = require('components/Link/Link.react');

var cx = require('classnames');

/**
 * GraphBar.react
 *
 * Represent a single piece of data in a bar graph
 */
var GraphBar = React.createClass({
  propTypes: {
    /**
     * If supplied, renders a link
     */
    href: React.PropTypes.string,
    label: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    /**
     * Adjusts the scale of the graph so that it doesn't just render at
     * 1px/unit.
     *
     * This is pretty much a huge hack to manually adjust the height of the
     * graph to make it fit correctly in the space. Need to come up with a
     * better system.
     */
    scale: React.PropTypes.number,
    value: React.PropTypes.number.isRequired,
  },

  componentDidMount: function() {
    // Position/hide the label depending on the size of the bar
    // need to recalculate on windo resize
  },

  getDefaultProps: function() {
    return {
      scale: 1,
    };
  },

  render: function() {
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
  },
});

module.exports = GraphBar;
