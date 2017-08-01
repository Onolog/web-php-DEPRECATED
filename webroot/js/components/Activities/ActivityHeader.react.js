import moment from 'moment-timezone';
import {OverlayTrigger, Tooltip} from 'react-bootstrap/lib';
import PropTypes from 'prop-types';
import React from 'react';

import ActivitySection from 'components/Activities/ActivitySection.react';
import FBImage from 'components/Facebook/FBImage.react';
import FBLikeButton from 'components/Facebook/FBLikeButton.react';
import ImageBlock from 'components/ImageBlock/ImageBlock.react';
import Link from 'components/Link/Link.react';

const PHOTO_DIMENSIONS = 75; // In px

/**
 * ActivityHeader.react
 */
const ActivityHeader = React.createClass({

  propTypes: {
    activity: PropTypes.shape({
      activity_type: PropTypes.string,
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]).isRequired,
      start_date: PropTypes.string.isRequired,
      timezone: PropTypes.string.isRequired,
    }),
    athlete: PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]).isRequired,
      name: PropTypes.string,
    }).isRequired,
  },

  render: function() {
    const {activity, athlete} = this.props;

    return (
      <ActivitySection className="activityHeader">
        <ImageBlock
          align="middle"
          image={
            <Link
              className="activityAthletePhoto innerBorder"
              href={'/users/profile/' + athlete.id}>
              <FBImage
                fbid={athlete.id}
                height={PHOTO_DIMENSIONS}
                width={PHOTO_DIMENSIONS}
              />
            </Link>
          }>
          <h4 className="activityAthleteName">
            {athlete.name}
          </h4>
          <div className="activityDate">
            {this._renderActivityDate(activity)}
          </div>
          <FBLikeButton
            href={`/activities/view/${activity.id}`}
            layout="button_count"
            showFaces={false}
          />
        </ImageBlock>
      </ActivitySection>
    );
  },

  _renderActivityDate: function({start_date, timezone}) {
    const date = moment.tz(start_date, timezone);
    const tooltip =
      <Tooltip id={timezone}>
        {timezone + ' ('+ date.format('Z') +')'}
      </Tooltip>;

    return (
      <span>
        {date.format('dddd, MMMM Do, YYYY ')}
        <OverlayTrigger overlay={tooltip}>
          <Link className="activityTime" href="#">
            {date.format('LT')}
          </Link>
        </OverlayTrigger>
      </span>
    );
  },
});

export default ActivityHeader;
