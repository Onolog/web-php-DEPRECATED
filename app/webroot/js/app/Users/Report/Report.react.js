/**
 * YearInReviewController.react
 * @jsx React.DOM
 */
define([

  'lib/Moment/Moment',
  'lib/react/react',

  'lib/react/jsx!components/Data/LabeledStat.react',
  'lib/react/jsx!components/Data/Topline.react',
  'lib/react/jsx!components/Graph/BarGraph/BarGraph.react',
  'lib/react/jsx!components/Graph/BarGraph/BarGraphBar.react',
  'lib/react/jsx!components/Graph/BarGraph/BarGraphSection.react',
  'lib/react/jsx!components/Graph/BarGraph/BarGraphSectionUnit.react',
  'lib/react/jsx!components/Image/FBImage.react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Middot.react',
  'lib/react/jsx!components/Panel/Panel.react',

  'utils/DateTimeUtils',
  'utils/formatDistance'

], function(

  Moment,
  React,

  LabeledStat,
  Topline,
  BarGraph,
  BarGraphBar,
  BarGraphSection,
  BarGraphSectionUnit,
  FBImage,
  Link,
  Middot,
  Panel,

  DateTimeUtils,
  formatDistance

) {

  var DATE_FORMAT = 'MMMM Do';

  return React.createClass({
    propTypes: {
      /**
       * Longest and shortest runs
       */
      runExtremes: React.PropTypes.object,
      /**
       * Number of shoes used
       */
      shoeCount: React.PropTypes.number,
      /**
       * Name of most-used shoe brand + shoe count used
       */
      topBrand: React.PropTypes.shape({
        count: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired
      }),
      /**
       * All running friends, sorted by run count, then miles
       */
      topFriends: React.PropTypes.array,
      totalMiles: React.PropTypes.number,
      totalRuns: React.PropTypes.number,
      totalTime: React.PropTypes.number,

      workoutData: React.PropTypes.shape({
        miles: React.PropTypes.number.isRequired,
        months: React.PropTypes.object,
        run_count: React.PropTypes.number.isRequired,
        year: React.PropTypes.oneOfType([
          React.PropTypes.number,
          React.PropTypes.string
        ])
      }).isRequired,

      workoutDataByWeek: React.PropTypes.object.isRequired
    },

    render: function() {
      var workoutData = this.props.workoutData;
      // Render an empty state when there's no workout data
      if (!workoutData.run_count) {
        return (
          <Panel className="clearfix">
            <div className="emptyState">
              No runs this year. Get back out there!
            </div>
          </Panel>
        );
      }
      
      return (
        <Panel className="clearfix">
          <div className="YIRStats">
            {this._renderTotalStats()}
            {this._renderTimeStats()}
            {this._renderExtremesStats()}
            {this._renderShoeStats()}
            {this._renderTopFriendsTable()}
          </div>
          {this._renderGraphs()}
        </Panel>
      );
    },

    _renderTotalStats: function() {
      var totalMiles = this.props.totalMiles;
      var totalRuns = this.props.totalRuns;
      var avgRunDistance = formatDistance(totalMiles / totalRuns);

      return (
        <Topline>
          <LabeledStat
            label="Runs"
            stat={totalRuns}
          />
          <LabeledStat
            label="Miles"
            stat={totalMiles}
            annotation={'Avg. ' + avgRunDistance + ' miles/run'}
          />
        </Topline>
      );
    },

    _renderTimeStats: function() {
      var duration = moment.duration(this.props.totalTime, 'seconds');
      var durationString =
        duration.days() + 'd ' +
        duration.hours() + 'h ' +
        duration.minutes() + 'm ' +
        duration.seconds() + 's';

      return (
        <Topline className="fullWidth">
          <LabeledStat
            label="Time Spent Running"
            stat={durationString}
          />
        </Topline>
      );
    },

    _renderExtremesStats: function() {
      if (this.props.totalRuns < 2) {
        return;
      }

      var extremes = this.props.runExtremes;
      return (
        <Topline>
          <LabeledStat
            label="Longest Run (Miles)"
            stat={extremes.max.distance}
            annotation={DateTimeUtils.formatDate(
              extremes.max.date*1000,
              DATE_FORMAT
            )}
          />
          <LabeledStat
            label="Shortest Run (Miles)"
            stat={extremes.min.distance}
            annotation={DateTimeUtils.formatDate(
              extremes.min.date*1000,
              DATE_FORMAT
            )}
          />
        </Topline>
      );
    },

    _renderShoeStats: function() {
      if (!this.props.shoeCount) {
        return;
      }

      var topBrand = this.props.topBrand;
      return (
        <Topline>
          <LabeledStat
            label="Pairs of shoes used"
            stat={this.props.shoeCount}
          />
          <LabeledStat
            label="Favorite Brand"
            stat={topBrand.name}
            annotation={topBrand.count + ' pairs'}
          />
        </Topline>
      );
    },

    _renderTopFriendsTable: function() {
      // Only show the top 5 friends
      var topFriends = this.props.topFriends.slice(0, 5);
      var friends = topFriends.map(function(friend) {
        var runs = friend.runs;
        var totalMiles = runs.reduce(function(prevVal, currVal) {
          return +prevVal + +currVal;
        });

        return (
          <tr key={friend.id}>
            <td className="topFriendsPhoto">
              <Link
                className="innerBorder"
                href={'/users/profile/' + friend.id}>
                <FBImage fbid={friend.id} />
              </Link>
            </td>
            <td className="topFriendsInfo">
              {friend.name}
              <div className="topFriendsData">
                {runs.length + ' runs'}
                <Middot />
                {formatDistance(totalMiles) + ' miles'}
              </div>
            </td>
          </tr>
        );
      });

      return (
        <div className="topFriends">
          <h4 className="sectionHeader">
            Top Running Partners
          </h4>
          <table className="topFriendsTable">{friends}</table>
        </div>
      );
    },

    _renderGraphs: function() {
      return (
        <div className="YIRGraphContainer">
          <div className="YIRGraph dailyGraph">
            <h4 className="sectionHeader">
              Daily Mileage
            </h4>
            {this._renderDailyGraph()}
          </div>
          <div className="YIRGraph weeklyGraph">
            <h4 className="sectionHeader">
              Weekly Mileage
            </h4>
            {this._renderWeeklyGraph()}
          </div>
          <div className="YIRGraph">
            <h4 className="sectionHeader">
              Monthly Mileage
            </h4>
            {this._renderMonthlyGraph()}
          </div>
        </div>
      );
    },

    _renderDailyGraph: function() {
      var monthData = this.props.workoutData.months;
      var monthKeys = Object.keys(monthData);
      var months = monthKeys.map(function(monthKey) {
        var month = monthData[monthKey];
        var monthName = DateTimeUtils.formatDate(
          [month.year, month.month-1],
          'MMM'
        );
        var metadata = month.run_count + ' runs';

        var dayData = month.days;
        var dayKeys = Object.keys(dayData);
        var days = dayKeys.map(function(dayKey) {
          var day = dayData[dayKey];
          return (
            <BarGraphSectionUnit>
              <BarGraphBar
                label={day.miles + ' miles'}
                scale={1.15}
                value={day.miles}
              />
            </BarGraphSectionUnit>
          );
        });

        return (
          <BarGraphSection
            key={month.year + month.month}
            label={monthName}
            metadata={metadata}>
            {days}
          </BarGraphSection>
        );
      });
      
      return <BarGraph>{months}</BarGraph>;
    },

    _renderWeeklyGraph: function() {
      var weekData = this.props.workoutDataByWeek.weeks;
      var keys = Object.keys(weekData).sort();
      var weeks = keys.map(function(key) {
        var week = weekData[key];
        var label = week.week < 10 ? '0' + week.week : '' + week.week;
        var metadata = week.run_count + ' runs';

        return (
          <BarGraphSection
            key={week.year + week.week}
            label={label}>
            <BarGraphSectionUnit>
              <BarGraphBar
                label={week.miles + ' miles'}
                scale={1.2}
                value={week.miles}
              />
            </BarGraphSectionUnit>
          </BarGraphSection>
        );
      });
      
      return <BarGraph>{weeks}</BarGraph>;
    },

    _renderMonthlyGraph: function() {
      var monthData = this.props.workoutData.months;
      var keys = Object.keys(monthData);
      var months = keys.map(function(key) {
        var month = monthData[key];
        var monthName = DateTimeUtils.formatDate(
          [month.year, month.month-1],
          'MMM'
        );
        var metadata = month.run_count + ' runs';
        return (
          <BarGraphSection
            key={month.year + month.month}
            label={monthName}
            metadata={metadata}>
            <BarGraphSectionUnit>
              <BarGraphBar
                label={month.miles + ' miles'}
                scale={0.5}
                value={month.miles}
              />
            </BarGraphSectionUnit>
          </BarGraphSection>
        );
      });
      
      return <BarGraph>{months}</BarGraph>;
    }

  });

});
