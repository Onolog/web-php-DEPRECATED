var React = require('react');

var AppPage = require('../../../components/Page/AppPage.react');
var LabeledStat = require('../../../components/Data/LabeledStat.react');
var PageHeader = require('../../../components/Page/PageHeader.react');
var Panel = require('../../../components/Panel/Panel.react');
var ProfileYearPanel = require('./ProfileYearPanel.react');
var Topline = require('../../../components/Data/Topline.react');

var DATE_FORMAT = 'MMMM Do';
var GRAPH_HEIGHT = 200;

require('../../../../css/app/Profile.css');

/**
 * Profile.react
 * @jsx React.DOM
 */
var Profile = React.createClass({
  displayName: 'Profile',

  componentWillMount: function() {
    var {
      shoeCount,
      totalMiles,
      totalRuns,
      user,
      workoutData,
      workoutDataByWeek
    } = window.app;

    this.setState({
      shoeCount: shoeCount,
      totalMiles: totalMiles,
      totalRuns: totalRuns,
      user: user,
      workoutData: workoutData,
      workoutDataByWeek: workoutDataByWeek
    });
  },

  render: function() {
    var workoutData = this.state.workoutData;

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
      <AppPage className="profile">
        <PageHeader title={this.state.user.name} />
        {this._renderToplineStats()}
        {this._renderAnnualData()}
      </AppPage>
    );
  },

  _renderToplineStats: function() {
    return (
      <Panel title="Lifetime Stats">
        <Topline>
          <LabeledStat
            label="Miles"
            stat={this.state.totalMiles.toLocaleString()}
          />
          <LabeledStat
            label="Runs"
            stat={this.state.totalRuns.toLocaleString()}
          />
          <LabeledStat
            label="Shoes"
            stat={this.state.shoeCount}
          />
        </Topline>
      </Panel>
    );
  },

  _renderAnnualData: function() {
    var workoutData = this.state.workoutData;
    var workoutDataByWeek = this.state.workoutDataByWeek;
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

module.exports = Profile;
