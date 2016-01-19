var React = require('react');

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
      React.PropTypes.string
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
    value: React.PropTypes.number.isRequired
  },

  componentDidMount: function() {
    // Position/hide the label depending on the size of the bar
    // need to recalculate on windo resize
  },

  getDefaultProps: function() {
    return {
      scale: 1
    };
  },

  render: function() {
    return (
      <Link
        href={this.props.href || '#'}
        className={cx({
          'graphBar': true,
          'noData': !this.props.value
        })}
        style={{
          height: Math.floor(this.props.value * this.props.scale) + 'px'
        }}
        tooltip={{
          title: this.props.label,
          position: 'top'
        }}>
        <span className="graphBarLabel">
          {this.props.label}
        </span>
      </Link>
    );
  }
});

module.exports = GraphBar;
