var moment = require('moment-timezone');
var React = require('react');
var {PropTypes} = React;

var ActivitySection = require('./ActivitySection.react');
var FBImage = require('components/Facebook/FBImage.react');
var FBLikeButton = require('components/Facebook/FBLikeButton.react');
var ImageBlock = require('components/ImageBlock/ImageBlock.react');
var LeftRight = require('components/LeftRight/LeftRight.react');
var Link = require('components/Link/Link.react');
var Middot = require('components/Middot.react');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var Tooltip = require('react-bootstrap/lib/Tooltip');

var PHOTO_DIMENSIONS = 75; // In px

/**
 * ActivityHeader.react
 */
var ActivityHeader = React.createClass({
  displayName: 'ActivityHeader',

  propTypes: {
    activity: PropTypes.shape({
      activity_type: PropTypes.string,
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]).isRequired,
      start_date: PropTypes.string.isRequired,
      timezone: PropTypes.string.isRequired
    }),
    athlete: PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]).isRequired,
      name: PropTypes.string
    }).isRequired
  },

  render: function() {
    var {activity, athlete} = this.props;

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
            href={'/workouts/view/' + activity.id}
            layout="button_count"
            showFaces={false}
          />
        </ImageBlock>
      </ActivitySection>
    );
  },

  _renderActivityDate: function({start_date, timezone}) {
    var date = moment.tz(start_date, timezone);
    var tooltip =
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
  }
});

module.exports = ActivityHeader;
