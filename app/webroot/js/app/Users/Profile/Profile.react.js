var React = require('react');

var AppPage = require('components/Page/AppPage.react');
var LabeledStat = require('components/Data/LabeledStat.react');
var PageHeader = require('components/Page/PageHeader.react');
var Panel = require('components/Panel/Panel.react');
var ProfileYearPanel = require('./ProfileYearPanel.react');
var Topline = require('components/Data/Topline.react');

var {chain} = require('lodash');
var {getAggregateDistance, groupActivities} = require('utils/ActivityUtils');

require('../../../../css/app/Profile.css');

/**
 * Profile.react
 */
var Profile = React.createClass({
  displayName: 'Profile',

  componentWillMount: function() {
    var {shoeCount, user, activities} = window.app;
    this.setState({
      shoeCount: shoeCount,
      user: user,
      activities: activities,
    });
  },

  render: function() {
    return (
      <AppPage className="profile">
        <PageHeader title={this.state.user.name} />
        {this._renderToplineStats()}
        {this._renderContent()}
      </AppPage>
    );
  },

  _renderToplineStats: function() {
    var {activities} = this.state;
    var totalMiles = getAggregateDistance(activities);
    var totalRuns = activities.length;

    return (
      <Panel title="Lifetime Stats">
        <Topline>
          <LabeledStat
            label="Miles"
            stat={totalMiles.toLocaleString()}
          />
          <LabeledStat
            label="Runs"
            stat={totalRuns.toLocaleString()}
          />
          <LabeledStat
            label="Shoes"
            stat={this.state.shoeCount}
          />
        </Topline>
      </Panel>
    );
  },

  _renderContent: function() {
    var {activities} = this.state;

    // Render an empty state when there's no data.
    if (!activities.length) {
      return (
        <Panel>
          <div className="emptyState">
            No runs this year. Get back out there!
          </div>
        </Panel>
      );
    }

    var activitiesByYear = groupActivities.byYear(activities);
    var years = chain(activitiesByYear)
      .keys()
      .reverse()
      .value();

    return years.map((year) => {
      return (
        <ProfileYearPanel
          activities={activitiesByYear[year]}
          key={year}
          year={year}
        />
      );
    });
  },
});

module.exports = Profile;
