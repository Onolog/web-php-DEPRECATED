var CalendarActions = require('../../../actions/CalendarActions');
var React = require('react');
var WorkoutStore = require('../../../stores/WorkoutStore');

var ActivityCalendar = require('./ActivityCalendar.react');
var AppPage = require('../../../components/Page/AppPage.react');
var Button = require('../../../components/Button/Button.react');
var ButtonGroup = require('../../../components/ButtonGroup/ButtonGroup.react');
var Loader = require('../../../components/Loader/Loader.react');
var PageHeader = require('../../../components/Page/PageHeader.react');
var Panel = require('../../../components/Panel/Panel.react');
var WorkoutAddDialog = require('../../../app/Users/Home/WorkoutAddDialog.react');

var cloneDate = require('../../../utils/cloneDate');
var cx = require('classnames');
var DateTimeUtils = require('../../../utils/DateTimeUtils');

var ActionTypes = require('../../../constants/ActionTypes');

/**
 * Home.react
 * @jsx React.DOM
 */
var Home = React.createClass({
  displayName: 'Home',

  getInitialState: function() {
    var {month, year} = window.app;

    return {
      date: new Date(year, month - 1, 1),
      // Null means we haven't gotten a response back yet. An empty array
      // means there are no workouts for that timeframe.
      activities: null
    };
  },

  componentWillMount: function() {
    // Load all the workouts into the component
    CalendarActions.fetch(
      this.state.date.getFullYear(),
      this.state.date.getMonth() + 1
    );
  },

  componentDidMount: function() {
    WorkoutStore.bind(ActionTypes.CHANGE, this._workoutsChanged);
  },

  componentWillUnmount: function() {
    WorkoutStore.unbind(ActionTypes.CHANGE, this._workoutsChanged);
  },

  _workoutsChanged: function() {
    this.setState({
      activities: WorkoutStore.getCollection()
    });
  },

  render: function() {
    var date = this.state.date;
    return (
      <AppPage>
        <PageHeader title={DateTimeUtils.formatDate(date, 'MMMM YYYY')}>
          {this._renderButtonGroup()}
        </PageHeader>
        <Panel className="calendarContainer">
          <Loader
            background={true}
            full={true}
            className={cx({
              hidden: this.state.activities
            })}
          />
          <ActivityCalendar
            date={date}
            workouts={this.state.activities}
          />
        </Panel>
      </AppPage>
    );
  },

  _renderButtonGroup: function() {
    return (
      <div>
        <WorkoutAddDialog
          date={new Date()}
          trigger={
            <Button
              glyph="plus"
              label="New Activity"
              use="success"
            />
          }
        />
        <ButtonGroup>
          <Button
            className="monthArrow"
            glyph="triangle-left"
            tooltip={{
              title: 'Last month'
            }}
            onClick={this._onLastMonthClick}
          />
          <Button
            glyph="stop"
            tooltip={{
              title: 'This month'
            }}
            onClick={this._onThisMonthClick}
          />
          <Button
            className="monthArrow"
            glyph="triangle-right"
            tooltip={{
              title: 'Next month'
            }}
            onClick={this._onNextMonthClick}
          />
        </ButtonGroup>
      </div>
    );
  },

  _updateCalendar: function(/*Date*/ date) {
    // Update component state
    this.setState({
      date: date,
      workouts: null // Reset workouts to trigger loader
    });

    // Update the browser state history
    history.pushState(
      {}, // State object
      '', // Title
      DateTimeUtils.formatDate(date, '/YYYY/MM') // URL
    );

    // Fetch workouts for the selected month
    CalendarActions.fetch(
      date.getFullYear(),
      date.getMonth() + 1
    );
  },

  _onLastMonthClick: function() {
    var date = cloneDate(this.state.date);
    date.setMonth(date.getMonth() - 1);
    this._updateCalendar(date);
  },

  _onThisMonthClick: function() {
    this._updateCalendar(new Date());
  },

  _onNextMonthClick: function() {
    var date = cloneDate(this.state.date);
    date.setMonth(date.getMonth() + 1);
    this._updateCalendar(date);
  },
});

module.exports = Home;
