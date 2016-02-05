var Autolinker = require('autolinker');
var React = require('react');
var ReactDOM = require('react-dom');
var {ListGroup, Tab, Tabs} = require('react-bootstrap/lib');

var ActivityDeviceInfo = require('./ActivityDeviceInfo.react');
var ActivityHeader = require('./ActivityHeader.react');
var ActivityMap = require('./ActivityMap.react');
var ActivitySection = require('./ActivitySection.react');
var ActivitySplitsTable = require('./ActivitySplitsTable.react');
var ActivityStats = require('./ActivityStats.react');

var FBFacepile = require('components/Facebook/FBFacepile.react');
var Link = require('components/Link/Link.react');

var ActionTypes = require('flux/ActionTypes');
var ShoeStore = require('flux/stores/ShoeStore');

var cx = require('classnames');

require('./Activity.css');

/**
 * Activity.react
 *
 * Renders a full activity view, depending on what data is passed in, like maps,
 * graphs, stats and any user-created details.
 */
var Activity = React.createClass({
  displayName: 'Activity',

  propTypes: {
    activity: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isHorizontal: true,
      shoes: []
    };
  },

  componentWillMount: function() {
    // Load all shoes into the store.
    ShoeStore.getCollection();
  },

  componentDidMount: function() {
    this._setOrientation();
    window.addEventListener('resize', this._setOrientation);

    ShoeStore.bind(ActionTypes.CHANGE, this._setShoes);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this._setOrientation);

    ShoeStore.unbind(ActionTypes.CHANGE, this._setShoes);
  },

  _setShoes: function() {
    this.setState({shoes: ShoeStore.getCollection()});
  },

  render: function() {
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
        </Tabs>
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

  _renderDetailsContent: function(activity) {
    const {device, friends, notes, shoe_id} = activity;

    let content = [
      <ActivitySection key="stats">
        <ActivityStats activity={activity} />
      </ActivitySection>
    ];

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

    let shoe = ShoeStore.getItem(shoe_id);
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
          <ActivityMap series={series} className="activityMap" />
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
      isHorizontal: ReactDOM.findDOMNode(this).offsetWidth > 750
    });
  }
});

module.exports = Activity;
