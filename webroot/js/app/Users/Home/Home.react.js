import {isEqual, map} from 'lodash';
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
import {browserHistory} from 'react-router';

import ActivityModal from './ActivityModal.react';
import ActivityCalendar from './ActivityCalendar.react';
import AppPage from 'components/Page/AppPage.react';
import Loader from 'components/Loader/Loader.react';
import PageHeader from 'components/Page/PageHeader.react';

import {fetchActivities} from 'actions/activities';
import cloneDate from 'utils/cloneDate';

const getMoment = ({month, year}) => moment({month: +month - 1, year});

const mapStateToProps = ({activities}) => {
  return {
    activities,
  };
};

/**
 * Home.react
 */
const Home = React.createClass({
  propTypes: {
    activities: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  },

  componentWillMount() {
    const {params} = this.props;
    let m = getMoment(params);

    // Set path to today if params are invalid.
    if (!m.isValid()) {
      m = moment();
    }

    // Load initial data.
    this._fetchData(m);
  },

  getInitialState() {
    return {
      isLoading: false,
      showModal: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    // This is pretty hacky. This method fires once when the history updates and
    // again when the callback returns. Only update the second time around.
    if (isEqual(this.props.params, nextProps.params)) {
      this.setState(this.getInitialState());
    }
  },

  render() {
    const {params} = this.props;
    const {isLoading} = this.state;

    const activities = isLoading ?
      // Don't show any activities while new ones are loading.
      [] :
      // Filter out activities that aren't within a couple weeks of the selected
      // month, otherwise calendar rendering can be slow.
      this.props.activities.filter(activity => (
        moment(activity.start_date).isBetween(
          // Create new moments here, since manipulating them mutates the
          // underlying moment.
          getMoment(params).subtract({weeks: 1}),
          getMoment(params).add({weeks: 6})
        )
      ));

    const m = getMoment(params);

    return (
      <AppPage>
        <PageHeader title={m.format('MMMM YYYY')}>
          {this._renderButtonGroup()}
        </PageHeader>
        <Panel className="calendarContainer">
          {isLoading && <Loader background full />}
          <ActivityCalendar
            activities={activities}
            date={m.toDate()}
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

  _fetchData(m) {
    this.props.dispatch(fetchActivities(m.year(), m.month() + 1));
    this.setState({isLoading: true});
  },

  _hideModal() {
    this.setState({showModal: false});
  },

  _showModal() {
    this.setState({showModal: true});
  },

  _updateCalendar(newMoment) {
    // Don't update if the month hasn't changed.
    if (newMoment.isSame(getMoment(this.props.params), 'month')) {
      return;
    }

    browserHistory.push(newMoment.format('/YYYY/MM'));

    this._fetchData(newMoment);
  },

  _onLastMonthClick() {
    this._updateCalendar(getMoment(this.props.params).subtract({months: 1}));
  },

  _onThisMonthClick() {
    this._updateCalendar(moment());
  },

  _onNextMonthClick() {
    this._updateCalendar(getMoment(this.props.params).add({months: 1}));
  },
});

module.exports = connect(mapStateToProps)(Home);
