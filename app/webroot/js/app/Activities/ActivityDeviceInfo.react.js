var React = require('react');

var Image = require('components/Image/Image.react');
var ImageBlock = require('components/ImageBlock/ImageBlock.react');
var Link = require('components/Link/Link.react');

var GarminDeviceUtils = require('utils/GarminDeviceUtils');

/**
 * ActivityDeviceInfo.react
 *
 * Displays the the name and software version for a given device.
 */
var ActivityDeviceInfo = React.createClass({
  displayName: 'ActivityDeviceInfo',

  propTypes: {
    deviceName: React.PropTypes.string.isRequired,
    softwareVersion: React.PropTypes.string.isRequired
  },

  render: function() {
    var deviceName = this.props.deviceName;
    var src = GarminDeviceUtils.getDeviceImageSrc(deviceName);

    return(
      <ImageBlock
        align="middle"
        image={<Image className="activityDeviceImage" src={src} />}>
        <h5 className="activityDeviceName">
          <Link href={GarminDeviceUtils.getDeviceProductPageURL()}>
            {deviceName}
          </Link>
        </h5>
        <div className="activityDeviceVersion">
          {'Software Version: ' + this.props.softwareVersion}
        </div>
      </ImageBlock>
    );
  }
});

module.exports = ActivityDeviceInfo;
