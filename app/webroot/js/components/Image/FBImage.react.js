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
      fbid: React.PropTypes.number.isRequired,
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
          jQuery.param({
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

});
