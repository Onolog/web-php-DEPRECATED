/**
 * GarminDeviceInfo.react
 * @jsx React.DOM
 *
 * Displays the following info for a Garmin device:
 *
 *  - Device Name
 *  - Software Version
 *  - Part Number
 *  - Device ID
 */
var PLACEHOLDER = '--';

define([

  'lib/react/react',
  'lib/react/jsx!components/Data/DataGroup.react',
  'lib/react/jsx!components/Data/DataRow.react',
  'lib/react/jsx!components/Image/Image.react',
  'lib/react/jsx!components/Link/Link.react',
  'utils/GarminDeviceUtils'

], function(

  React,
  DataGroup,
  DataRow,
  Image,
  Link,
  GarminDeviceUtils

) {

  var PLACEHOLDER = '--';

  return React.createClass({
    displayName: 'GarminDeviceInfo',

    propTypes: {
      activity: React.PropTypes.object
    },
  
    render: function() {
      var activity = this.props.activity;

      return (
        <DataGroup display="horizontal">
          <DataRow label="Device Image">
            {this._renderDeviceImage(activity) || PLACEHOLDER}
          </DataRow>
          <DataRow label="Device Name">
            {this._renderDeviceName(activity) || PLACEHOLDER}
          </DataRow>
          <DataRow label="Software Version">
            {activity && activity.getSoftwareVersionString() || PLACEHOLDER}
          </DataRow>
          <DataRow label="Part Number">
            {(activity && activity.getDeviceProductID()) || PLACEHOLDER}
          </DataRow>
          <DataRow label="Device ID">
            {(activity && activity.getAttribute('creatorUnitId')) || PLACEHOLDER}
          </DataRow>
        </DataGroup>
      );
    },

    _renderDeviceImage: function(activity) {
      if (activity) {
        return (
          <Image
            className="deviceImage"
            height={100}
            src={GarminDeviceUtils.getDeviceImageSrc(activity.getDeviceName())}
          />
        );
      }
    },

    _renderDeviceName: function(activity) {
      if (activity) {
        return (
          <Link href={GarminDeviceUtils.getDeviceProductPageURL()}>
            {activity.getDeviceName()}
          </Link>
        );
      }
    }
  });

});
