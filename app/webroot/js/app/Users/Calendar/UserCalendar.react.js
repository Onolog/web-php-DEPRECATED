/**
 * UserCalendar.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',

  'lib/react/jsx!app/Users/Calendar/UserCalendarDay.react',
  'lib/react/jsx!components/Calendar/BaseCalendar.react',
  'lib/react/jsx!components/Calendar/BaseCalendarWeek.react',
  'lib/react/jsx!components/Loader/Loader.react',

  'actions/CalendarActions',

  'stores/AlertStore',
  'stores/WorkoutsStore',

  'utils/calendarGrid',
  'utils/formatDistance',

  'constants/ActionTypes',

  'lib/jquery/jquery.min',

], function(

  React,

  UserCalendarDay,
  BaseCalendar,
  BaseCalendarWeek,
  Loader,

  CalendarActions,

  AlertStore,
  WorkoutsStore,

  calendarGrid,
  formatDistance,

  ActionTypes

) {

  return React.createClass({
    displayName: 'UserCalendar',

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
        // Null means we haven't gotten a response back yet. An empty array
        // means there are no workouts for that timeframe.
        workouts: null
      };
    },

    componentWillMount: function() {
      // Load all the workouts into the component
      CalendarActions.initCalendar(
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
      if (!this.state.workouts) {
        // Don't render until we've loaded the workouts
        return <Loader />;
      }

      var props = this.props;
      return (
        <BaseCalendar>
          {calendarGrid(props.month, props.year).map(this._renderWeek)}
        </BaseCalendar>
      );
    },

    _renderWeek: function(week, idx) {
      this._weeklyMileage = 0;
      return (
        <BaseCalendarWeek key={idx}>
          {week.map(this._renderDay)}
        </BaseCalendarWeek>
      );
    },

    _renderDay: function(day, idx) {
      var dateObject = day.date;
      var workouts = this.state.workouts.filter(function(workout) {
        return +workout.date === (dateObject.getTime() / 1000);
      });

      if (workouts.length) {
        workouts.forEach(function(workout) {
          this._weeklyMileage += +workout.distance;
        }.bind(this));
      }
  
      return (
        <UserCalendarDay
          date={dateObject}
          friends={this.props.friends}
          key={idx}
          month={this.props.month}
          shoes={this.props.shoes}
          weeklyMileage={this._weeklyMileage}
          workouts={workouts}
        />
      );
    }
  });

});
