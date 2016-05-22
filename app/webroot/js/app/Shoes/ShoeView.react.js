var moment = require('moment-timezone');
var React = require('react');
var {Table} = require('react-bootstrap/lib');

var ActivitySection = require('app/Activities/ActivitySection.react');
var EmptyState = require('components/EmptyState.react');
var Topline = require('components/Topline/Topline.react');

var formatDistance = require('utils/formatDistance');
var secondsToTime = require('utils/secondsToTime');

/**
 * ShoeView.react
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
    mileage: React.PropTypes.number.isRequired,
  },

  render: function() {
    return (
      <div className="shoeView">
        <ActivitySection>
          <Topline>
            <Topline.Item label="Miles">
              {this.props.mileage}
            </Topline.Item>
            <Topline.Item label="Activities">
              {this.props.activityCount}
            </Topline.Item>
          </Topline>
        </ActivitySection>
        {this._renderActivities()}
      </div>
    );
  },

  _renderActivities: function() {
    var activities = this.props.activities;
    if (!activities || !activities.length) {
      return <EmptyState>No activities to display.</EmptyState>;
    }

    return (
      <Table fill hover>
        <thead>
          <tr>
            <th>Activity Date</th>
            <th className="mileage">Distance</th>
            <th className="time">Duration</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(this._renderRows)}
        </tbody>
      </Table>
    );
  },

  _renderRows: function(activity, idx) {
    var date = moment.tz(
      activity.start_date,
      activity.timezone
    ).format('MM/DD/YY');

    return (
      <tr key={idx}>
        <td>
          {date}
        </td>
        <td className="mileage">
          {`${formatDistance(activity.distance)} mi`}
        </td>
        <td className="time">
          {secondsToTime(activity.duration)}
        </td>
      </tr>
    );
  },
});

module.exports = ShoeView;
