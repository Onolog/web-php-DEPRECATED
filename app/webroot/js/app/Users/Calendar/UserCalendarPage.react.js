/**
 * UserCalendarPage.react
 * @jsx React.DOM
 *
 * Basically a view controller around UserCalendar
 */
define([

  'lib/react/react',
  'lib/react/jsx!app/Users/Calendar/UserCalendar.react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/ButtonGroup/ButtonGroup.react',
  'lib/react/jsx!components/Loader/Loader.react',
  'lib/react/jsx!components/Page/PageHeader.react',
  'lib/react/jsx!components/Panel/Panel.react',

  'actions/CalendarActions',
  'constants/ActionTypes',
  'stores/WorkoutStore',
  'utils/cloneDate',
  'utils/cx',
  'utils/DateTimeUtils'

], function(

  React,
  UserCalendar,
  Button,
  ButtonGroup,
  Loader,
  PageHeader,
  Panel,

  CalendarActions,
  ActionTypes,
  WorkoutStore,
  cloneDate,
  cx,
  DateTimeUtils

) {

  return React.createClass({
    displayName: 'UserCalendarPage',

    propTypes: {
      /**
       * UTC month, ie: August === 7
       */
      month: React.PropTypes.number,
      /**
       * UTC Full Year, ie: 2014
       */
      year: React.PropTypes.number
    },

    getInitialState: function() {
      return {
        date: new Date(this.props.year, this.props.month, 1),
        // Null means we haven't gotten a response back yet. An empty array
        // means there are no workouts for that timeframe.
        workouts: null
      };
    },

    componentWillMount: function() {
      // Load all the workouts into the component
      CalendarActions.fetch(
        this.props.year,
        this.props.month + 1
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
        workouts: WorkoutStore.getCollection()
      });
    },

    render: function() {
      var date = this.state.date;
      return (
        <div>
          <PageHeader title={DateTimeUtils.formatDate(date, 'MMMM YYYY')}>
            {this._renderButtonGroup()}
          </PageHeader>
          <Panel className="calendarContainer">
            <Loader
              background={true}
              full={true}
              className={cx({
                hidden: this.state.workouts
              })}
            />
            <UserCalendar
              date={date}
              workouts={this.state.workouts}
            />
          </Panel>
        </div>
      );
    },

    _renderButtonGroup: function() {
      return (
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
        DateTimeUtils.formatDate(date, '/YYYY/MM/') // URL
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

});
