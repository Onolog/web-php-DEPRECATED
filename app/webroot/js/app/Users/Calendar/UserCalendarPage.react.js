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

  'utils/cx',
  'utils/DateTimeUtils',
  'utils/pad'

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

  cx,
  DateTimeUtils,
  pad

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
        month: this.props.month,
        // Null means we haven't gotten a response back yet. An empty array
        // means there are no workouts for that timeframe.
        workouts: null,
        year: this.props.year
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
      var month = this.state.month;
      var year = this.state.year;

      var date = new Date(year, month, 1);
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
              {...this.props}
              month={this.state.month}
              workouts={this.state.workouts}
              year={this.state.year}
            />
          </Panel>
        </div>
      );
    },

    _renderButtonGroup: function() {
      return (
        <ButtonGroup>
          <Button
            label="◄"
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
            label="►"
            tooltip={{
              title: 'Next month'
            }}
            onClick={this._onNextMonthClick}
          />
        </ButtonGroup>
      );
    },

    _updateCalendar: function(/*number*/ month, /*number*/ year) {
      this.setState({
        month: month,
        workouts: null, // Reset workouts to trigger loader
        year: year
      });

      history.pushState(
        // State object
        {
          month: month,
          year: year
        },
        // Title
        '',
        // URL
        '/' + year + '/' + pad(month + 1, 2) + '/'
      );

      CalendarActions.fetch(
        year,
        month + 1
      );
    },

    _onLastMonthClick: function() {
      var month = this.state.month;
      var year = this.state.year;

      if (month === 0) {
        month = 11;
        year--;
      } else {
        month--;
      }

      this._updateCalendar(month, year);
    },

    _onThisMonthClick: function() {
      var today = new Date();
      this._updateCalendar(today.getMonth(), today.getFullYear());
    },

    _onNextMonthClick: function() {
      var month = this.state.month;
      var year = this.state.year;

      if (month === 11) {
        month = 0;
        year++;
      } else {
        month++;
      }

      this._updateCalendar(month, year);
    },
  });

});
