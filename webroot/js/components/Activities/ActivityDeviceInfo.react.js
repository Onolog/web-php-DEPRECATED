import PropTypes from 'prop-types';
import React from 'react';

import Image from 'components/Image/Image.react';
import ImageBlock from 'components/ImageBlock/ImageBlock.react';
import Link from 'components/Link/Link.react';

import GarminDeviceUtils from 'utils/GarminDeviceUtils';

/**
 * ActivityDeviceInfo.react
 *
 * Displays the the name and software version for a given device.
 */
const ActivityDeviceInfo = React.createClass({

  propTypes: {
    deviceName: PropTypes.string.isRequired,
    softwareVersion: PropTypes.string.isRequired,
  },

  render: function() {
    const {deviceName} = this.props;
    const src = GarminDeviceUtils.getDeviceImageSrc(deviceName);

    return (
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
  },
});

export default ActivityDeviceInfo;
