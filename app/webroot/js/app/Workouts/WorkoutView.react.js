/**
 * WorkoutView.react
 * @jsx React.DOM
 *
 * Displays a non-editable view of the workout data
 */
define([

  'lib/react/react',
  'lib/react/jsx!app/Workouts/WorkoutStats.react',
  'lib/react/jsx!app/Workouts/WorkoutViewSection.react',
  'lib/react/jsx!components/Facebook/FBLikeButton.react',
  'lib/react/jsx!components/Facepile/Facepile.react',
  'lib/react/jsx!components/Image/FBImage.react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Panel/Panel.react',
  'lib/Autolinker.min'

], function(

  React,
  WorkoutStats,
  WorkoutViewSection,
  FBLikeButton,
  Facepile,
  FBImage,
  Link,
  Panel,
  Autolinker

) {

  return React.createClass({
    displayName: 'WorkoutView',

    propTypes: { 
      workout: React.PropTypes.object.isRequired
    },

    getDefaultProps: function() {
      return {
        workout: {}
      };
    },

    render: function() {
      var workout = this.props.workout;
      var userID = workout.user_id;
      return (
        <div className="workoutView clearfix">
          <div className="leftCol">
            <Link
              href={'/users/profile/' + userID}
              className="profilePhotoLink innerBorder">
              <FBImage fbid={userID} />
            </Link>
          </div>
          <div className="rightCol">
            <WorkoutViewSection>
              <WorkoutStats workout={workout} />
            </WorkoutViewSection>
            {this._renderNotes(workout.notes)}
            {this._renderFriendsRow(workout.friends)}
            <FBLikeButton
              href={'/workouts/view/' + workout.id}
              layout="button_count"
              showFaces={false}
            />
          </div>
        </div>
      );
    },

    /**
     * Autolinker replaces some of the text in the notes string with markup,
     * so we need to use `dangerouslySetInnerHTML` otherwise React just renders
     * a bunch of gibberish.
     */
    _renderNotes: function(/*?string*/ notes) {
      if (notes) {
        return (
          <WorkoutViewSection title="Notes">
            <div
              className="workoutViewNotes"
              dangerouslySetInnerHTML={{__html: Autolinker.link(notes)}}
            />
          </WorkoutViewSection>
        );
      }
    },

    _renderFriendsRow: function(/*?string|?array*/ friends) {
      // TODO: this should always be an array of friend objects with name/id
      if (friends && typeof friends === 'string') {
        friends = friends.split(',');
      }

      if (friends && friends.length) {
        return (
          <WorkoutViewSection title="Friends">
            <Facepile friends={friends} />
          </WorkoutViewSection>
        );
      }
    }

  });

});
