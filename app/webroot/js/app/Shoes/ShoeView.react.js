/**
 * ShoeView.react
 * @jsx React.DOM
 *
 * Data (mileage, total activities, and activity summary) for a single shoe.
 */

define([

  'lib/react/react',
  'lib/react/jsx!app/Activities/ActivitySection.react',
  'lib/react/jsx!components/Data/Topline.react',
  'lib/react/jsx!components/Data/LabeledStat.react',
  'lib/react/jsx!components/EmptyState.react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Panel/Panel.react',

  'utils/DateTimeUtils',
  'utils/formatDistance'

], function(

  React,
  ActivitySection,
  Topline,
  LabeledStat,
  EmptyState,
  Link,
  Panel,

  DateTimeUtils,
  formatDistance

) {

  // 01/01/05
  var DATE_FORMAT = 'MM/DD/YY';

  return React.createClass({
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

      return (
        <table className="item_list shoeList">
          {activities.map(this._renderRows.bind(this))}
        </table>
      );
    },

    _renderRows: function(activity, idx) {
      var date = DateTimeUtils.formatDate(
        activity.date * 1000,
        DATE_FORMAT
      );

      return (
        <tr key={idx}>
          <td>
            {date}
          </td>
          <td className="mileage">
            {formatDistance(activity.distance) + ' mi'}
          </td>
          <td className="time">
            {DateTimeUtils.secondsToTime(activity.time)}
          </td>
        </tr>
      );
    }

  });

});
