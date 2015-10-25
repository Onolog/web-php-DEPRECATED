var moment = require('moment-timezone');
var React = require('react');

var ActivitySection = require('app/Activities/ActivitySection.react');
var EmptyState = require('components/EmptyState.react');
var LabeledStat = require('components/Data/LabeledStat.react');
var Link = require('components/Link/Link.react');
var Panel = require('components/Panel/Panel.react');
var Table = require('components/Table/Table.react');
var Topline = require('components/Data/Topline.react');

var formatDistance = require('utils/formatDistance');
var secondsToTime = require('utils/secondsToTime');

/**
 * ShoeView.react
 * @jsx React.DOM
 *
 * Data (mileage, total activities, and activity summary) for a single shoe.
 */
var ShoeView = React.createClass({
  displayName: 'ShoeView',

  propTypes: {
    /**
     * Number of times the shoe has been used for an activity.
     */
    activityCount: React.PropTypes.number.isRequired,
    /**
     * Array of all the activities associated with the shoe
     */
    activities: React.PropTypes.array,
    /**
     * Number of miles the shoe has accumulated
     */
    mileage: React.PropTypes.number.isRequired
  },

  render: function() {
    return (
      <div className="shoeView">
        <ActivitySection>
          <Topline>
            <LabeledStat
              label="Miles"
              stat={this.props.mileage}
            />
            <LabeledStat
              label="Runs"
              stat={this.props.activityCount}
            />
          </Topline>
        </ActivitySection>
        <ActivitySection title="Activities">
          {this._renderActivities()}
        </ActivitySection>
      </div>
    );
  },

  _renderActivities: function() {
    var activities = this.props.activities;
    if (!activities || !activities.length) {
      return <EmptyState message="No activities to display." />;
    }

    var header =
      <thead>
        <tr>
          <th>Date</th>
          <th className="mileage">Distance</th>
          <th className="time">Duration</th>
        </tr>
      </thead>;

    return (
      <Table hover={true}>
        <tbody>
          {activities.map(this._renderRows)}
        </tbody>
      </Table>
    );
  },

  _renderRows: function(activity, idx) {
    var date = moment.tz(
      activity.date * 1000,
      activity.timezone
    ).format('MM/DD/YY');

    return (
      <tr key={idx}>
        <td>
          {date}
        </td>
        <td className="mileage">
          {formatDistance(activity.distance) + ' mi'}
        </td>
        <td className="time">
          {secondsToTime(activity.duration)}
        </td>
      </tr>
    );
  }
});

module.exports = ShoeView;
