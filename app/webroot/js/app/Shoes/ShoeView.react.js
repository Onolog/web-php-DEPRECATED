/**
 * ShoeView.react
 * @jsx React.DOM
 *
 * View for a single shoe
 */

define([

  'lib/react/react',
  'lib/react/jsx!components/Data/Topline.react',
  'lib/react/jsx!components/Data/LabeledStat.react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Panel/Panel.react',

  'utils/DateTimeUtils',
  'utils/formatDistance'

], function(

  React,
  Topline,
  LabeledStat,
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
        <div>
          {this._renderStats()}
          {this._renderActivities()}
        </div>
      );
    },

    _renderStats: function() {
      return (
        <Panel>
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
        </Panel>
      );
    },

    _renderActivities: function() {
      var activities = this.props.activities;
      if (!activities.length) {
        return (
          <div>
            Empty State
          </div>
        );
      }

      var rows = activities.map(function(activity, idx) {
        var date = DateTimeUtils.formatDate(
          activity.date * 1000,
          DATE_FORMAT
        );

        return (
          <tr key={idx}>
            <td>
              {date}
            </td>
            <td className="workoutDescription">
              <div className="workoutDescriptionTruncator">
                <Link href={'/workouts/view/' + activity.id}>
                  {activity.notes}
                </Link>
              </div>
            </td>
            <td className="mileage">
              {formatDistance(activity.distance) + ' mi'}
            </td>
            <td className="time">
              {DateTimeUtils.secondsToTime(activity.time)}
            </td>
          </tr>
        );
      });

      return (
        <Panel>
          <table className="item_list shoeList">{rows}</table>
        </Panel>
      );
    }

  });

});
