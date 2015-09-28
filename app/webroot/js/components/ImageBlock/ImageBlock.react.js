var React = require('react');

var Image = require('../Image/Image.react');
var Link = require('../Link/Link.react');

var cx = require('classnames');

/**
 * ImageBlock.react
 * @jsx React.DOM
 */
var ImageBlock = React.createClass({
  displayName: 'ImageBlock',

  propTypes: {
    align: React.PropTypes.oneOf(['top', 'middle', 'bottom']),
    image: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      align: 'top'
    };
  },

  render: function() {
    var align = this.props.align;
    return (
      <div className="media">
        <div className="media-left">
          {this.props.image}
        </div>
        <div className={cx({
          'media-body': true,
          'media-top': align === 'top',
          'media-middle': align === 'middle',
          'media-bottom': align === 'bottom'
        })}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = ImageBlock;
