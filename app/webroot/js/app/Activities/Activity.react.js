var Autolinker = require('autolinker');
var React = require('react');
var ReactDOM = require('react-dom');
var {Tab, Tabs} = require('react-bootstrap/lib');

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
    ReactDOM.findDOMNode(this).addEventListener('resize', this._setOrientation);

    ShoeStore.bind(ActionTypes.CHANGE, this._setShoes);
  },

  componentWillUnmount: function() {
    ReactDOM.findDOMNode(this).removeEventListener(
      'resize',
      this._setOrientation
    );

    ShoeStore.unbind(ActionTypes.CHANGE, this._setShoes);
  },

  _setShoes: function() {
    this.setState({shoes: ShoeStore.getCollection()});
  },

  render: function() {
    var {activity} = this.props;
    var {athlete, series} = activity;

    return (
      <div className={cx({
        'activityContainer': true,
        'clearfix': true,
        'noMap': !(series && series.length),
        'horizontal': this.state.isHorizontal,
      })}>
        {this._renderMap(series)}
        <div className="activityInfo">
          <ActivityHeader
            {...this.props}
            athlete={athlete}
          />
          <Tabs className="activityPanes" defaultActiveKey={1}>
            <Tab className="activityNavPane" eventKey={1} title="Detail">
              <ActivitySection>
                <ActivityStats activity={activity} />
              </ActivitySection>
              {this._renderActivityNotes(activity)}
              {this._renderActivityShoes(activity)}
              {this._renderActivityFriends(activity)}
              {this._renderDeviceInfo(activity)}
            </Tab>
            <Tab className="activityNavPane" eventKey={2} title="Splits">
              {this._renderSplitsPane(activity)}
            </Tab>
          </Tabs>
        </div>
      </div>
    );
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

  _renderActivityNotes: function({notes}) {
    if (notes) {
      return (
        <ActivitySection title="Notes" border>
          <div
            className="activityNotes"
            dangerouslySetInnerHTML={{__html: Autolinker.link(notes)}}
          />
        </ActivitySection>
      );
    }
  },

  _renderActivityShoes: function(/*number*/ {shoe_id}) {
    var shoe = ShoeStore.getItem(shoe_id);
    if (shoe) {
      return (
        <ActivitySection title="Shoes" border>
          {shoe.name}
        </ActivitySection>
      );
    }
  },

  _renderActivityFriends: function(/*string*/ {friends}) {
    if (friends) {
      return (
        <ActivitySection border={true} title="Friends">
          <FBFacepile friends={friends} />
        </ActivitySection>
      );
    }
  },

  _renderDeviceInfo: function(/*object*/ {device}) {
    if (device && Object.keys(device).length) {
      return (
        <ActivitySection border={true} title="Device">
          <ActivityDeviceInfo
            deviceName={device.name}
            softwareVersion={device.version}
          />
        </ActivitySection>
      );
    }
  },

  _renderSplitsPane: function(/*array*/ {laps}) {
    if (laps && laps.length) {
      return (
        <ActivitySection>
          <ActivitySplitsTable laps={laps} />
        </ActivitySection>
      );
    }
  },

  _setOrientation: function() {
    this.setState({
      isHorizontal: ReactDOM.findDOMNode(this).scrollWidth > 750
    });
  }
});

module.exports = Activity;
