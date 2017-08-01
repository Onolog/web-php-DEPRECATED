import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React from 'react';
import {Table} from 'react-bootstrap/lib';

import ActivitySection from 'components/Activities/ActivitySection.react';
import EmptyState from 'components/EmptyState.react';
import Loader from 'components/Loader/Loader.react';
import Topline from 'components/Topline/Topline.react';

import formatDistance from 'utils/formatDistance';
import secondsToTime from 'utils/secondsToTime';

/**
 * ShoeView.react
 *
 * Data (mileage, total activities, and activity summary) for a single shoe.
 */
class ShoeView extends React.Component {
  static displayName = 'ShoeView';

  static propTypes = {
    /**
     * Array of all the activities associated with the shoe
     */
    activities: PropTypes.arrayOf(PropTypes.shape({
      distance: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      start_date: PropTypes.string.isRequired,
      timezone: PropTypes.string.isRequired,
    }).isRequired),
    isLoading: PropTypes.bool,
    shoe: PropTypes.shape({
      activity_count: PropTypes.number.isRequired,
      mileage: PropTypes.number.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    activities: [],
    isLoading: false,
  };

  render() {
    const {shoe} = this.props;

    const sizeItem = shoe.size ?
      <Topline.Item label="Size">
        {shoe.size}
      </Topline.Item> :
      null;

    return (
      <div className="shoeView">
        <ActivitySection>
          <Topline>
            <Topline.Item label="Miles">
              {shoe.mileage}
            </Topline.Item>
            <Topline.Item label="Activities">
              {shoe.activity_count}
            </Topline.Item>
            {sizeItem}
          </Topline>
        </ActivitySection>
        {this._renderNotes()}
        {this._renderActivities()}
      </div>
    );
  }

  _renderNotes = () => {
    const {notes} = this.props.shoe;
    if (notes) {
      return (
        <ActivitySection title="Notes">
          {notes}
        </ActivitySection>
      );
    }
  };

  _renderActivities = () => {
    const {activities, isLoading} = this.props;

    if (isLoading) {
      return (
        <EmptyState>
          <Loader background full large />
        </EmptyState>
      );
    }

    if (!activities.length) {
      return <EmptyState>No activities to display.</EmptyState>;
    }

    return (
      <Table fill hover>
        <thead>
          <tr>
            <th>Activity Date</th>
            <th className="mileage">Distance</th>
            <th className="time">Duration</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(this._renderRows)}
        </tbody>
      </Table>
    );
  };

  _renderRows = (activity) => {
    const date = moment.tz(
      activity.start_date,
      activity.timezone
    ).format('MM/DD/YY');

    return (
      <tr key={activity.id}>
        <td>
          {date}
        </td>
        <td className="mileage">
          {`${formatDistance(activity.distance)} mi`}
        </td>
        <td className="time">
          {secondsToTime(activity.duration)}
        </td>
      </tr>
    );
  };
}

module.exports = ShoeView;
