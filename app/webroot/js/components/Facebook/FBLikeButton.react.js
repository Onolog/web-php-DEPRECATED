var $ = require('jquery');
var React = require('react');

var FACEBOOK = require('constants/Facebook');
var ONOLOG = require('constants/Onolog');
var FB_URL = '//www.facebook.com/plugins/like.php';

/**
 * FBLikeButton.react
 *
 * Renders the Like button plugin for the specified URL.
 *
 * Documentation: https://developers.facebook.com/docs/plugins/like-button/
 *
 * TODO: Although we're including the FB SDK globally, it really should be
 * included individually by each module that needs it.
 */
var FBLikeButton = React.createClass({
  displayName: 'FBLikeButton',
  propTypes: { 
    href: React.PropTypes.string.isRequired,
    /**
     * Specify the label to be displayed in the button
     */
    action: React.PropTypes.oneOf([
      'like',
      'recommend'
    ]),
    /**
     * standard: Horizontally aligned button(s) with a string indicating how
     *    many people like the given URL, and/or a prompt to like it.
     *
     * box_count: Vertically stacked buttons with a large count above.
     *
     * button_count: Horizontally aligned button(s) with small count to
     *    the right.
     *
     * button: Horizontally aligned button(s), no count.
     */
    layout: React.PropTypes.oneOf([
      'standard',
      'box_count',
      'button_count',
      'button'
    ]),
    /**
     * Show profile photos when 2 or more friends like the URL.
     */
    showFaces: React.PropTypes.bool,
    /**
     * Includes a Share button beside the Like button.
     */
    useShare: React.PropTypes.bool
  },

  /**
   * Use the FB defaults
   */
  getDefaultProps: function() {
    return {
      action: 'like',
      layout: 'standard',
      showFaces: true,
      useShare: true,
      width: 165
    };
  },

  render: function() {
    var params = $.param({
      href: ONOLOG.URL + this.props.href,
      width: this.props.width,
      layout: this.props.layout,
      action: this.props.action,
      show_faces: this.props.showFaces,
      share: this.props.useShare,
      height: this._getHeight(),
      appId: FACEBOOK.APP_ID
    });

    return (
      <iframe
        src={FB_URL + '?' + params}
        scrolling="no"
        frameBorder="0"
        style={{
          border: 'none',
          overflow: 'hidden',
          height: this._getHeight() + 'px',
          width: this.props.width + 'px'
        }}
        allowTransparency="true">
      </iframe>
    );
  },

  _getHeight: function() {
    var heights = {
      'standard': this.props.showFaces ? 80 : 35,
      'box_count': 65,
      'button_count': 21,
      'button': 35
    };
    return heights[this.props.layout];
  }
});

module.exports = FBLikeButton;
