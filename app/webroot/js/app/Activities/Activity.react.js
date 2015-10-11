var $ = require('jquery');
var React = require('react');

var ActivityDeviceInfo = require('./ActivityDeviceInfo.react');
var ActivityHeader = require('./ActivityHeader.react');
var ActivityMap = require('./ActivityMap.react');
var ActivitySection = require('./ActivitySection.react');
var ActivitySplitsTable = require('./ActivitySplitsTable.react');
var ActivityStats = require('./ActivityStats.react');
var FBFacepile = require('../../components/Facebook/FBFacepile.react');
var Link = require('../../components/Link/Link.react');
var TabbedSection = require('../../components/Navigation/TabbedSection.react');

var ActionTypes = require('../../constants/ActionTypes');
var Autolinker = require('../../lib/Autolinker.min');
var ShoeStore = require('../../stores/ShoeStore');

var cx = require('classnames');

require('./Activity.css');

/**
 * Activity.react
 * @jsx React.DOM
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
    $(this.getDOMNode()).resize(function() {
      // Update the component if it's resized for some reason
      this._setOrientation();
    }.bind(this));

    ShoeStore.bind(ActionTypes.CHANGE, this._setShoes);
  },

  componentWillUnmount: function() {
    ShoeStore.unbind(ActionTypes.CHANGE, this._setShoes);
  },

  _setShoes: function() {
    this.setState({shoes: ShoeStore.getCollection()});
  },

  render: function() {
    var activity = this.props.activity;
    return (
      <div className={cx({
        'activityContainer': true,
        'clearfix': true,
        'noMap': !(activity.series && activity.series.length),
        'horizontal': this.state.isHorizontal,
      })}>
        {this._renderMap(activity.series)}
        <div className="activityInfo">
          <ActivityHeader
            {...this.props}
            athlete={activity.athlete}
          />
          <TabbedSection className="activityPanes">
            <div className="activityNavPane" label="Detail">
              <ActivitySection>
                <ActivityStats activity={activity} />
              </ActivitySection>
              {this._renderActivityNotes(activity.notes)}
              {this._renderActivityShoes(activity.shoe_id)}
              {this._renderActivityFriends(activity.friends)}
              {this._renderDeviceInfo(activity.device)}
            </div>
            {this._renderSplitsPane(activity.laps)}
          </TabbedSection>
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

  _renderActivityNotes: function(notes) {
    if (notes) {
      return (
        <ActivitySection title="Notes" border={true}>
          <div
            className="activityNotes"
            dangerouslySetInnerHTML={{__html: Autolinker.link(notes)}}
          />
        </ActivitySection>
      );
    }
  },

  _renderActivityShoes: function(/*number*/ shoeID) {
    var shoe = ShoeStore.getItem(shoeID);
    if (shoe) {
      return (
        <ActivitySection title="Shoes" border={true}>
          {shoe.name}
        </ActivitySection>
      );
    }
  },

  _renderActivityFriends: function(/*string*/ friends) {
    if (friends) {
      return (
        <ActivitySection border={true} title="Friends">
          <FBFacepile friends={friends} />
        </ActivitySection>
      );
    }
  },

  _renderDeviceInfo: function(/*object*/ device) {
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

  _renderSplitsPane: function(/*array*/ laps) {
    if (laps && laps.length) {
      return (
        <div className="activityNavPane" label="Splits">
          <ActivitySection>
            <ActivitySplitsTable laps={laps} />
          </ActivitySection>
        </div>
      );
    }
  },

  _setOrientation: function() {
    this.setState({
      isHorizontal: this.getDOMNode().scrollWidth > 750
    });
  }
});

module.exports = Activity;
