/**
 * Activity.react
 * @jsx React.DOM
 *
 * Renders a full activity view, depending on what data is passed in, like maps,
 * graphs, stats and any user-created details.
 */
define([

  'lib/react/react',
  'lib/react/jsx!app/Activities/ActivityDeviceInfo.react',
  'lib/react/jsx!app/Activities/ActivityHeader.react',
  'lib/react/jsx!app/Activities/ActivityMap.react',
  'lib/react/jsx!app/Activities/ActivitySection.react',
  'lib/react/jsx!app/Activities/ActivitySplitsTable.react',
  'lib/react/jsx!app/Activities/ActivityStats.react',
  'lib/react/jsx!app/Shoes/ShoeViewLink.react',
  'lib/react/jsx!components/Facepile/Facepile.react',
  'lib/react/jsx!components/Image/FBImage.react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Navigation/TabbedSection.react',
  'lib/Autolinker.min',
  'utils/cx',
  'lib/jquery/jquery.min',

], function(

  React,
  ActivityDeviceInfo,
  ActivityHeader,
  ActivityMap,
  ActivitySection,
  ActivitySplitsTable,
  ActivityStats,
  ShoeViewLink,
  Facepile,
  FBImage,
  Link,
  TabbedSection,
  Autolinker,
  cx

) {

  return React.createClass({
    displayName: 'Activity',

    propTypes: {
      activity: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
      return {
        isHorizontal: true
      };
    },

    componentDidMount: function() {
      this._setOrientation();
      jQuery(this.getDOMNode()).resize(function() {
        // Update the component if it's resized for some reason
        this._setOrientation();
      }.bind(this));
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
              activityDate={activity.date}
              activityID={activity.id}
              activityType={activity.activity_type}
              athlete={activity.athlete}
            />
            <TabbedSection className="activityPanes">
              <div className="activityNavPane" label="Detail">
                <ActivitySection>
                  <ActivityStats activity={activity} />
                </ActivitySection>
                {this._renderActivityNotes(activity.notes)}
                {this._renderActivityShoes(activity.shoes)}
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

    _renderActivityShoes: function(shoes) {
      if (shoes.name) {
        return (
          <ActivitySection title="Shoes" border={true}>
            {shoes.name}
          </ActivitySection>
        );
      }
    },

    _renderActivityFriends: function(friends) {
      if (friends && friends.length) {
        return (
          <ActivitySection border={true} title="Friends">
            <Facepile friends={friends} />
          </ActivitySection>
        );
      }
    },

    _renderDeviceInfo: function(device) {
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

    _renderSplitsPane: function(laps) {
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

});
