var moment = require('moment');
var React = require('react');
var {
  Button,
  ButtonGroup,
  Glyphicon,
  OverlayTrigger,
  Panel,
  Tooltip,
} = require('react-bootstrap/lib');

var ActionTypes = require('flux/ActionTypes');
var WorkoutActions = require('flux/actions/WorkoutActions');
var WorkoutStore = require('flux/stores/WorkoutStore');

var ActivityModal = require('./ActivityModal.react');
var ActivityCalendar = require('./ActivityCalendar.react');
var AppPage = require('components/Page/AppPage.react');
var Loader = require('components/Loader/Loader.react');
var PageHeader = require('components/Page/PageHeader.react');

var cloneDate = require('utils/cloneDate');

/**
 * Home.react
 */
var Home = React.createClass({
  displayName: 'Home',

  getInitialState: function() {
    var {month, year} = window.APP_DATA;

    return {
      // Null means we haven't gotten a response back yet. An empty array
      // means there are no workouts for that timeframe.
      activities: null,
      date: new Date(year, month - 1, 1),
      showModal: false,
    };
  },

  componentWillMount: function() {
    // Load all the workouts into the component
    WorkoutActions.fetch(
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
      activities: WorkoutStore.getAll(),
      showModal: false,
    });
  },

  render: function() {
    const {activities, date} = this.state;

    return (
      <AppPage>
        <PageHeader title={moment(date).format('MMMM YYYY')}>
          {this._renderButtonGroup()}
        </PageHeader>
        <Panel className="calendarContainer">
          {activities ? null: <Loader background full />}
          <ActivityCalendar
            date={date}
            workouts={activities}
          />
        </Panel>
      </AppPage>
    );
  },

  _renderButtonGroup: function() {
    return (
      <div>
        <ActivityModal
          onHide={this._hideModal}
          show={this.state.showModal}
        />
        <Button
          bsStyle="success"
          onClick={this._showModal}>
          <Glyphicon glyph="plus" />
        </Button>
        <ButtonGroup>
          <OverlayTrigger
            overlay={<Tooltip id="last-month">Last month</Tooltip>}
            placement="top">
            <Button
              className="monthArrow"
              onClick={this._onLastMonthClick}>
              <Glyphicon glyph="triangle-left" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip id="this-month">This month</Tooltip>}
            placement="top">
            <Button
              onClick={this._onThisMonthClick}>
              <Glyphicon glyph="stop" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip id="next-month">Next month</Tooltip>}
            placement="top">
            <Button
              className="monthArrow"
              onClick={this._onNextMonthClick}>
              <Glyphicon glyph="triangle-right" />
            </Button>
          </OverlayTrigger>
        </ButtonGroup>
      </div>
    );
  },

  _hideModal: function() {
    this.setState({showModal: false});
  },

  _showModal: function() {
    this.setState({showModal: true});
  },

  _updateCalendar: function(/*Date*/ date) {
    // Update component state
    this.setState({
      date: date,
      activities: null, // Reset activities to trigger loader
    });

    // Update the browser state history
    history.pushState(
      {}, // State object
      '', // Title
      moment(date).format('/YYYY/MM') // URL
    );

    // Fetch activities for the selected month
    WorkoutActions.fetch(
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
