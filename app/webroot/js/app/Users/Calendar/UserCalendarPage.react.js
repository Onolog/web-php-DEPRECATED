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
  'stores/WorkoutsStore',
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
  WorkoutsStore,
  cloneDate,
  cx,
  DateTimeUtils

) {

  return React.createClass({
    displayName: 'UserCalendarPage',

    propTypes: {
      /**
       * Array of the user's friends for display in the workout fields view
       */
      friends: React.PropTypes.array,
      /**
       * UTC month, ie: August === 7
       */
      month: React.PropTypes.number,
      /**
       * Array of the user's shoes for display in the workout fields view
       */
      shoes: React.PropTypes.array,
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
      WorkoutsStore.bind(ActionTypes.CHANGE, this._workoutsChanged);
    },

    componentWillUnmount: function() {
      WorkoutsStore.unbind(ActionTypes.CHANGE, this._workoutsChanged);
    },

    _workoutsChanged: function() {
      this.setState({
        workouts: WorkoutsStore.getWorkouts()
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
              friends={this.props.friends}
              shoes={this.props.shoes}
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
      date.setUTCMonth(date.getUTCMonth() - 1);
      this._updateCalendar(date);
    },

    _onThisMonthClick: function() {
      this._updateCalendar(new Date());
    },

    _onNextMonthClick: function() {
      var date = cloneDate(this.state.date);
      date.setUTCMonth(date.getUTCMonth() + 1);
      this._updateCalendar(date);
    },
  });

});
