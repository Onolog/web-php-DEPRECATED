import Autolinker from 'autolinker';
import PropTypes from 'prop-types';
import React from 'react';
import {findDOMNode} from 'react-dom';
import {Tab, Tabs} from 'react-bootstrap';

import ActivityDeviceInfo from 'components/Activities/ActivityDeviceInfo.react';
import ActivityHeader from 'components/Activities/ActivityHeader.react';
import ActivitySection from 'components/Activities/ActivitySection.react';
import ActivitySplitsTable from 'components/Activities/ActivitySplitsTable.react';
import ActivityStats from 'components/Activities/ActivityStats.react';
import GoogleMap from 'components/Google/GoogleMap.react';

import FBFacepile from 'components/Facebook/FBFacepile.react';

import cx from 'classnames';

import './css/Activity.css';

/**
 * Activity.react
 *
 * Renders a full activity view, depending on what data is passed in, like maps,
 * graphs, stats and any user-created details.
 */
class Activity extends React.Component {
  static displayName = 'Activity';

  static propTypes = {
    activity: PropTypes.object.isRequired,
    athlete: PropTypes.object.isRequired,
    shoe: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  };

  state = {
    isHorizontal: true,
  };

  componentDidMount() {
    this._setOrientation();
    window.addEventListener('resize', this._setOrientation);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._setOrientation);
  }

  render() {
    const {activity} = this.props;
    const {tracks} = activity;

    let content = this._renderDetailsContent(activity);
    let splitsTab = this._renderSplitsTab(activity);

    if (splitsTab) {
      content =
        <Tabs className="activityPanes" defaultActiveKey={1}>
          <Tab className="activityNavPane" eventKey={1} title="Detail">
            {content}
          </Tab>
          {splitsTab}
        </Tabs>;
    }

    return (
      <div className={cx('activityContainer', 'clearfix', {
        'noMap': !(tracks && tracks.length),
        'horizontal': this.state.isHorizontal,
      })}>
        {this._renderMap(tracks)}
        <div className="activityInfo">
          <ActivityHeader {...this.props} />
          {content}
        </div>
      </div>
    );
  }

  _renderDetailsContent = (activity) => {
    const {device, friends, notes} = activity;

    let content = [];
    content.push(
      <ActivitySection key="stats">
        <ActivityStats activity={activity} />
      </ActivitySection>
    );

    if (notes) {
      content.push(
        <ActivitySection key="notes" title="Notes">
          <div
            className="activityNotes"
            dangerouslySetInnerHTML={{__html: Autolinker.link(notes)}}
          />
        </ActivitySection>
      );
    }

    const {shoe} = this.props;
    if (shoe) {
      content.push(
        <ActivitySection key="shoe" title="Shoes">
          {shoe.name}
        </ActivitySection>
      );
    }

    if (friends) {
      content.push(
        <ActivitySection key="friends" title="Friends">
          <FBFacepile friends={friends} />
        </ActivitySection>
      );
    }

    if (device && Object.keys(device).length) {
      content.push(
        <ActivitySection key="device" title="Device">
          <ActivityDeviceInfo
            deviceName={device.name}
            softwareVersion={device.version}
          />
        </ActivitySection>
      );
    }

    return content;
  };

  _renderMap = (tracks) => {
    if (tracks && tracks.length) {
      return (
        <div className="activityMapContainer">
          <GoogleMap className="activityMap" path={tracks} />
        </div>
      );
    }
  };

  _renderSplitsTab = (/*array*/ {laps}) => {
    if (laps && laps.length) {
      return (
        <Tab className="activityNavPane" eventKey={2} title="Splits">
          <ActivitySection>
            <ActivitySplitsTable laps={laps} />
          </ActivitySection>
        </Tab>
      );
    }
  };

  _setOrientation = () => {
    this.setState({
      isHorizontal: findDOMNode(this).offsetWidth > 750,
    });
  };
}

export default Activity;
