import Autolinker from 'autolinker';
import {find} from 'lodash';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Tab, Tabs} from 'react-bootstrap';
import {connect} from 'react-redux';

var ActivityDeviceInfo = require('./ActivityDeviceInfo.react');
var ActivityHeader = require('./ActivityHeader.react');
var ActivityMap = require('./ActivityMap.react');
var ActivitySection = require('./ActivitySection.react');
var ActivitySplitsTable = require('./ActivitySplitsTable.react');
var ActivityStats = require('./ActivityStats.react');

var FBFacepile = require('components/Facebook/FBFacepile.react');

var cx = require('classnames');

require('./Activity.css');

const mapStateToProps = ({shoes}) => {
  return {
    shoes,
  };
};

/**
 * Activity.react
 *
 * Renders a full activity view, depending on what data is passed in, like maps,
 * graphs, stats and any user-created details.
 */
const Activity = React.createClass({
  displayName: 'Activity',

  propTypes: {
    activity: PropTypes.object.isRequired,
    shoes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  },

  getInitialState() {
    return {
      isHorizontal: true,
    };
  },

  componentDidMount() {
    this._setOrientation();
    window.addEventListener('resize', this._setOrientation);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this._setOrientation);
  },

  render() {
    const {activity} = this.props;
    const {athlete, series} = activity;

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
        'noMap': !(series && series.length),
        'horizontal': this.state.isHorizontal,
      })}>
        {this._renderMap(series)}
        <div className="activityInfo">
          <ActivityHeader
            {...this.props}
            athlete={athlete}
          />
          {content}
        </div>
      </div>
    );
  },

  _renderDetailsContent(activity) {
    const {device, friends, notes, shoe_id} = activity;

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

    let shoe = find(this.props.shoes, {id: shoe_id});
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
  },

  _renderMap: function(series) {
    if (series) {
      return (
        <div className="activityMapContainer">
          <ActivityMap className="activityMap" series={series} />
        </div>
      );
    }
  },

  _renderSplitsTab: function(/*array*/ {laps}) {
    if (laps && laps.length) {
      return (
        <Tab className="activityNavPane" eventKey={2} title="Splits">
          <ActivitySection>
            <ActivitySplitsTable laps={laps} />
          </ActivitySection>
        </Tab>
      );
    }
  },

  _setOrientation: function() {
    this.setState({
      isHorizontal: findDOMNode(this).offsetWidth > 750,
    });
  },
});

module.exports = connect(mapStateToProps)(Activity);
