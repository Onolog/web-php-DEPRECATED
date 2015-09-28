var React = require('react');

var ActivitySection = require('./ActivitySection.react');
var FBImage = require('../../components/Facebook/FBImage.react');
var FBLikeButton = require('../../components/Facebook/FBLikeButton.react');
var ImageBlock = require('../../components/ImageBlock/ImageBlock.react');
var LeftRight = require('../../components/LeftRight/LeftRight.react');
var Link = require('../../components/Link/Link.react');
var Middot = require('../../components/Middot.react');

var DateTimeUtils = require('../../utils/DateTimeUtils');
var unixTimeToDate = require('../../utils/unixTimeToDate');

var PHOTO_DIMENSIONS = 75; // In px

/**
 * ActivityHeader.react
 * @jsx React.DOM
 */
var ActivityHeader = React.createClass({
  displayName: 'ActivityHeader',

  propTypes: {
    activityDate: React.PropTypes.number.isRequired,
    activityID: React.PropTypes.number.isRequired,
    activityType: React.PropTypes.string,
    athlete: React.PropTypes.shape({
      id: React.PropTypes.number,
      name: React.PropTypes.string
    }).isRequired
  },

  render: function() {
    var props = this.props;

    var activityDate = DateTimeUtils.formatDate(
      unixTimeToDate(props.activityDate),
      'dddd, MMMM Do, YYYY LT'
    );

    return (
      <ActivitySection className="activityHeader">
        <ImageBlock
          align="middle"
          image={
            <Link
              className="activityAthletePhoto innerBorder"
              href={'/users/profile/' + props.athlete.id}>
              <FBImage
                fbid={props.athlete.id}
                height={PHOTO_DIMENSIONS}
                width={PHOTO_DIMENSIONS}
              />
            </Link>
          }>
          <h4 className="activityAthleteName">
            {props.athlete.name}
          </h4>
          <div className="activityDate">
            {activityDate}
          </div>
          <FBLikeButton
            href={'/workouts/view/' + props.activityID}
            layout="button_count"
            showFaces={false}
          />
        </ImageBlock>
      </ActivitySection>
    );
  }
});

module.exports = ActivityHeader;
