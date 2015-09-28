var React = require('react');

var Activity = require('../Activities/Activity.react');
var AppPage = require('../../components/Page/AppPage.react');
var Button = require('../../components/Button/Button.react');
var ButtonGroup = require('../../components/ButtonGroup/ButtonGroup.react');
var Calendar = require('../../components/Calendar/Calendar.react');
var DateTimePicker = require('../../components/DateTimePicker/DateTimePicker.react');
var FBFriendTokenizer = require('../../components/Facebook/FBFriendTokenizer.react');
var BarGraph = require('../../components/Graph/BarGraph/BarGraph.react');
var LeftRight = require('../../components/LeftRight/LeftRight.react');
var PageHeader = require('../../components/Page/PageHeader.react');
var Panel = require('../../components/Panel/Panel.react');
var WorkoutFields = require('../Workouts/WorkoutFields.react');

var cloneDate = require('../../utils/cloneDate');
var DateTimeUtils = require('../../utils/DateTimeUtils');

var DATA = require('../../constants/TestData');

/**
 * ReactPage.react
 * @jsx React.DOM
 *
 * Displays React components
 */
var ReactPage = React.createClass({
  displayName: 'ReactPage',

  getInitialState: function() {
    return {
      calendarDate: new Date(),
      datePickerDate: new Date(),
      workouts: DATA.WORKOUTS
    };
  },

  render: function() {

    return (
      <AppPage>
        <PageHeader title="React Component Examples" />

        <Panel title="Date and Time Picker">
          <DateTimePicker
            initialDate={this.state.datePickerDate}
            onChange={function(date) {
              this.setState({datePickerDate: date});
            }.bind(this)}
          />
          <div style={{marginTop: '10px'}}>
            {this.state.datePickerDate.toISOString()}
          </div>
        </Panel>

        <Panel title="Calendar">
          <LeftRight style={{'marginBottom': '10px'}}>
            <h3>
              {DateTimeUtils.formatDate(
                this.state.calendarDate,
                'MMMM YYYY'
              )}
            </h3>
            <ButtonGroup>
              <Button
          	    glyph="triangle-left"
                tooltip={{
                  title: 'Last month'
                }}
                onClick={this.onLastMonthClick}
              />
              <Button
          	    glyph="stop"
                tooltip={{
                  title: 'This month'
                }}
                onClick={this.onThisMonthClick}
              />
              <Button
          	    glyph="triangle-right"
                tooltip={{
                  title: 'Next month'
                }}
                onClick={this.onNextMonthClick}
              />
            </ButtonGroup>
          </LeftRight>
          <Calendar date={this.state.calendarDate} />
        </Panel>

        <Panel title="Friend Typeahead">
          <h4 style={{margin: '0 0 5px'}}>Initially Empty</h4>
          <FBFriendTokenizer />
          <h4 style={{margin: '15px 0 5px'}}>Pre-Populated</h4>
          <FBFriendTokenizer
            prePopulate={DATA.FRIENDS}
          />
        </Panel>

        <Panel title="Workout Fields">
          <WorkoutFields
            action="add"
            shoes={DATA.SHOES}
            workout={DATA.WORKOUTS['2014']['10']['21'][1]}
          />
        </Panel>

        <Panel title="Activity">
          <Activity activity={DATA.WORKOUTS['2014']['10']['21'][1]} />
        </Panel>

        <Panel title="Graph">
          Need to add
        </Panel>
      </AppPage>
    );
  },

  onLastMonthClick: function() {
    var date = cloneDate(this.state.calendarDate);
    date.setMonth(date.getMonth() - 1);
    this.setState({calendarDate: date});
  },

  onThisMonthClick: function() {
    this.setState({calendarDate: new Date()});
  },

  onNextMonthClick: function() {
    var date = cloneDate(this.state.calendarDate);
    date.setMonth(date.getMonth() + 1);
    this.setState({calendarDate: date});
  },

  _onWorkoutsUpdate: function(workouts) {
    this.setState({ workouts: workouts });
  }
});

module.exports = ReactPage;
