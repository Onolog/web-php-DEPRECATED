import moment from 'moment';
import React, {PropTypes} from 'react';
import {
  Button,
  ButtonGroup,
  Glyphicon,
  OverlayTrigger,
  Panel,
  Tooltip,
} from 'react-bootstrap';
import {connect} from 'react-redux';

import ActivityModal from './ActivityModal.react';
import ActivityCalendar from './ActivityCalendar.react';
import AppPage from 'components/Page/AppPage.react';
import Loader from 'components/Loader/Loader.react';
import PageHeader from 'components/Page/PageHeader.react';

import {fetchActivities} from 'actions/activities';
import cloneDate from 'utils/cloneDate';

const mapStateToProps = ({activities}) => {
  return {
    activities,
  };
};

/**
 * Home.react
 */
const Home = React.createClass({
  displayName: 'Home',

  propTypes: {
    activities: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  },

  getInitialState() {
    const pathArr = document.location.pathname.split('/');
    const date = pathArr.length === 3 ?
      new Date(pathArr[1], pathArr[2] - 1, 1) :
      new Date();

    return {
      date,
      isLoading: false,
      showModal: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoading: false,
      showModal: false,
    });
  },

  render() {
    const {activities} = this.props;
    const {date, isLoading} = this.state;

    return (
      <AppPage>
        <PageHeader title={moment(date).format('MMMM YYYY')}>
          {this._renderButtonGroup()}
        </PageHeader>
        <Panel className="calendarContainer">
          {isLoading && <Loader background full />}
          <ActivityCalendar
            date={date}
            workouts={activities}
          />
        </Panel>
      </AppPage>
    );
  },

  _renderButtonGroup() {
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

  _hideModal() {
    this.setState({showModal: false});
  },

  _showModal() {
    this.setState({showModal: true});
  },

  _updateCalendar(/*Date*/ date) {
    // Update component state
    this.setState({
      date,
      isLoading: true, // Reset activities to trigger loader
    });

    // Update the browser state history
    history.pushState(
      {}, // State object
      '', // Title
      moment(date).format('/YYYY/MM') // URL
    );

    // Fetch activities for the selected month
    this.props.dispatch(fetchActivities(
      date.getFullYear(),
      date.getMonth() + 1
    ));
  },

  _onLastMonthClick() {
    var date = cloneDate(this.state.date);
    date.setMonth(date.getMonth() - 1);
    this._updateCalendar(date);
  },

  _onThisMonthClick() {
    this._updateCalendar(new Date());
  },

  _onNextMonthClick() {
    var date = cloneDate(this.state.date);
    date.setMonth(date.getMonth() + 1);
    this._updateCalendar(date);
  },
});

module.exports = connect(mapStateToProps)(Home);
