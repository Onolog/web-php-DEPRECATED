var {Panel} = require('react-bootstrap');
var React = require('react');

var AppPage = require('components/Page/AppPage.react');
var PageHeader = require('components/Page/PageHeader.react');
var ProfileYearPanel = require('./ProfileYearPanel.react');
var Topline = require('components/Topline/Topline.react');

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
      <Panel header={<h3>Lifetime Stats</h3>}>
        <Topline>
          <Topline.Item label="Miles">
            {totalMiles.toLocaleString()}
          </Topline.Item>
          <Topline.Item label="Runs">
            {totalRuns.toLocaleString()}
          </Topline.Item>
          <Topline.Item label="Shoes">
            {this.state.shoeCount}
          </Topline.Item>
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
