/**
 * Profile.react
 * @jsx React.DOM
 */
define([

  'lib/Moment/Moment',
  'lib/react/react',

  'lib/react/jsx!app/Users/Profile/ProfileYearPanel.react',

  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/ButtonGroup/ButtonGroup.react',
  'lib/react/jsx!components/Chart/Chart.react',
  'lib/react/jsx!components/Data/LabeledStat.react',
  'lib/react/jsx!components/Data/Topline.react',
  'lib/react/jsx!components/Facebook/FBImage.react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Panel/Panel.react',

  'utils/DateTimeUtils',
  'utils/formatDistance'

], function(

  moment,
  React,

  ProfileYearPanel,

  Button,
  ButtonGroup,
  Chart,
  LabeledStat,
  Topline,
  FBImage,
  Link,
  Panel,

  DateTimeUtils,
  formatDistance

) {

  var DATE_FORMAT = 'MMMM Do';
  var GRAPH_HEIGHT = 200;

  return React.createClass({
    displayName: 'Profile',

    propTypes: {
      /**
       * Total number of shoes used
       */
      shoeCount: React.PropTypes.number,
      totalMiles: React.PropTypes.number,
      totalRuns: React.PropTypes.number,

      workoutData: React.PropTypes.object.isRequired,
      workoutDataByWeek: React.PropTypes.object.isRequired
    },

    render: function() {
      var workoutData = this.props.workoutData;

      // Render an empty state when there's no data
      /*
      if (!workoutData.run_count) {
        return (
          <Panel className="clearfix">
            <div className="emptyState">
              No runs this year. Get back out there!
            </div>
          </Panel>
        );
      }
      */

      return (
        <div>
          {this._renderToplineStats()}
          {this._renderAnnualData()}
        </div>
      );
    },

    _renderToplineStats: function() {
      return (
        <Panel title="Lifetime Stats">
          <Topline>
            <LabeledStat
              label="Miles"
              stat={this.props.totalMiles.toLocaleString()}
            />
            <LabeledStat
              label="Runs"
              stat={this.props.totalRuns.toLocaleString()}
            />
            <LabeledStat
              label="Shoes"
              stat={this.props.shoeCount}
            />
          </Topline>
        </Panel>
      );
    },

    _renderAnnualData: function() {
      var workoutData = this.props.workoutData;
      var workoutDataByWeek = this.props.workoutDataByWeek;
      var years = Object.keys(workoutData).reverse();

      return years.map(function(year, idx) {
        var section = workoutData[year];
        return (
          <ProfileYearPanel
            key={idx}
            miles={section.miles}
            months={workoutData[year].months}
            runs={section.run_count}
            time={section.time}
            title={section.year}
            weeks={workoutDataByWeek[year].weeks}
          />
        );
      }.bind(this));
    }

  });

});
