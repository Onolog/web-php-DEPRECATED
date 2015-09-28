var $ = require('jquery');
var React = require('react');

var Image = require('../../components/Image/Image.react');

/**
 * FBImage.react
 * @jsx React.DOM
 *
 * Given an fbid, retrieves and renders an FB graph image.
 */
var FBImage = React.createClass({
  displayName: 'FBImage',

  propTypes: {
    fbid: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]).isRequired,
    height: React.PropTypes.number,
    width: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      height: 50,
      width: 50
    };
  },

  render: function() {
    var src =
      'https://graph.facebook.com/' + this.props.fbid + '/picture?' +
        // Double the height and width for retina displays
        $.param({
          height: this.props.height * 2,
          width: this.props.width * 2
        });

    return (
      <Image
        className={this.props.className}
        height={Math.floor(this.props.height)}
        width={Math.floor(this.props.width)}
        src={src}
      />
    );
  }

});

module.exports = FBImage;
