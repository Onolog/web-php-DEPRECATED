var moment = require('moment-timezone');
var React = require('react');
var {Button, ButtonGroup, Glyphicon, Panel} = require('react-bootstrap/lib');

var Activity = require('app/Activities/Activity.react');
var AppPage = require('components/Page/AppPage.react');
var Calendar = require('components/Calendar/Calendar.react');
var DateTimePicker = require('components/DateTimePicker/DateTimePicker.react');
var FBFriendTokenizer = require('components/Facebook/FBFriendTokenizer.react');
var LeftRight = require('components/LeftRight/LeftRight.react');
var PageHeader = require('components/Page/PageHeader.react');
var WorkoutFields = require('app/Workouts/WorkoutFields.react');

var cloneDate = require('utils/cloneDate');

var {FRIENDS, SHOES, WORKOUTS} = require('constants/TestData');

/**
 * ReactPage.react
 *
 * Displays React components
 */
var ReactPage = React.createClass({
  displayName: 'ReactPage',

  getInitialState: function() {
    return {
      calendarDate: new Date(),
      datePickerDate: moment().toDate(),
      timezone: 'America/Los_Angeles',
      workouts: WORKOUTS,
    };
  },

  render: function() {
    return (
      <AppPage>
        <PageHeader title="React Component Examples" />

        <Panel header={<h3>Date/Time Picker</h3>}>
          <DateTimePicker
            date={this.state.datePickerDate}
            onChange={(dateString, timezone) => {
              this.setState({
                datePickerDate: dateString,
                timezone,
              });
            }}
          />
          <div style={{marginTop: '10px'}}>
            {moment.tz(
              this.state.datePickerDate,
              this.state.timezone
            ).format('MM/D/YYYY HH:mm Z')}
          </div>
        </Panel>

        <Panel header={<h3>Calendar</h3>}>
          <LeftRight style={{'marginBottom': '10px'}}>
            <h3>{moment(this.state.calendarDate).format('MMMM YYYY')}</h3>
            <ButtonGroup>
              <Button onClick={this.onLastMonthClick}>
                <Glyphicon glyph="triangle-left" />
              </Button>
              <Button onClick={this.onThisMonthClick}>
                <Glyphicon glyph="stop" />
              </Button>
              <Button onClick={this.onNextMonthClick}>
                <Glyphicon glyph="triangle-right" />
              </Button>
            </ButtonGroup>
          </LeftRight>
          <Calendar date={this.state.calendarDate} />
        </Panel>

        <Panel header={<h3>Friend Typeahead</h3>}>
          <h4 style={{margin: '0 0 5px'}}>Initially Empty</h4>
          <FBFriendTokenizer />
          <h4 style={{margin: '15px 0 5px'}}>Pre-Populated</h4>
          <FBFriendTokenizer friends={FRIENDS} />
        </Panel>

        <Panel header={<h3>Workout Fields</h3>}>
          <WorkoutFields
            action="add"
            shoes={SHOES}
            workout={WORKOUTS['2014']['10']['21'][1]}
          />
        </Panel>

        <Panel header={<h3>Activity</h3>}>
          <Activity activity={WORKOUTS['2014']['10']['21'][1]} />
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
    this.setState({workouts});
  },
});

module.exports = ReactPage;
