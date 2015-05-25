/**
 * ActivityDeviceInfo.react
 * @jsx React.DOM
 *
 * Displays the the name and software version for a given device.
 */

define([

  'lib/react/react',
  'lib/react/jsx!components/Image/Image.react',
  'lib/react/jsx!components/ImageBlock/ImageBlock.react',
  'lib/react/jsx!components/Link/Link.react',
  'utils/GarminDeviceUtils'

], function(

  React,
  Image,
  ImageBlock,
  Link,
  GarminDeviceUtils

) {

  return React.createClass({
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

});
