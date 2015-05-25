/**
 * ActivityHeader.react
 * @jsx React.DOM
 */

define([

  'lib/react/react',
  'lib/react/jsx!app/Activities/ActivitySection.react',
  'lib/react/jsx!components/Facebook/FBLikeButton.react',
  'lib/react/jsx!components/Image/FBImage.react',
  'lib/react/jsx!components/ImageBlock/ImageBlock.react',
  'lib/react/jsx!components/LeftRight/LeftRight.react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Middot.react',
  'utils/DateTimeUtils'

], function(

  React,
  ActivitySection,
  FBLikeButton,
  FBImage,
  ImageBlock,
  LeftRight,
  Link,
  Middot,
  DateTimeUtils

) {

  var PHOTO_DIMENSIONS = 75; // In px

  return React.createClass({
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

      // TODO: Add localized time ('LT') to the date format when we have a more
      // accurate timekeeping method.
      var activityDate = DateTimeUtils.formatDate(
        props.activityDate * 1000,
        'dddd, MMMM Do, YYYY'
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

});
