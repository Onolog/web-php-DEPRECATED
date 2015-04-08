/**
 * FBImage.react
 * @jsx React.DOM
 *
 * Given an fbid, retrieves and renders an FB graph image.
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Image/Image.react',
  'lib/jquery/jquery.min',

], function(React, Image) {

  return React.createClass({
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
        height: 100,
        width: 100
      };
    },

    render: function() {
      var src =
        'https://graph.facebook.com/' + this.props.fbid + '/picture?' +
          $.param({
            height: this.props.height,
            width: this.props.width
          });

      // Image height & width are half the actual resolution for retina displays
      return (
        <Image
          className={this.props.className}
          height={Math.floor(this.props.height / 2)}
          width={Math.floor(this.props.width / 2)}
          src={src}
        />
      );
    }

  });

});
