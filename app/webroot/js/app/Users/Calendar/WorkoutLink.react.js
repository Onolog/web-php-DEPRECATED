/**
 * WorkoutLink.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',

  'lib/react/jsx!app/Activities/Activity.react',  
  'lib/react/jsx!app/Workouts/WorkoutFields.react',
  
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/ButtonGroup/ButtonGroup.react',
  'lib/react/jsx!components/LeftRight/LeftRight.react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Modal/Modal.react',

  'actions/WorkoutActions',

  'constants/ActionTypes',
  'constants/Components',
  'constants/Workouts',

  'mixins/LayerMixin.react',
  'mixins/StoreMixin.react',

  'stores/AlertStore',
  'stores/WorkoutsStore',
  'stores/WorkoutStore',

  'utils/DateTimeUtils',
  'utils/formatDistance',
  'utils/cakePHP'

], function(

  React,

  Activity,
  WorkoutFields,

  Button,
  ButtonGroup,
  LeftRight,
  Link,
  Modal,

  WorkoutActions,

  ActionTypes,
  Components,
  Workouts,

  LayerMixin,
  StoreMixin,

  AlertStore,
  WorkoutsStore,
  WorkoutStore,
  DateTimeUtils,
  formatDistance,
  cakePHP

) {

  var ALERT = Components.ALERT;
  var ENDPOINT = Workouts.ENDPOINT;

  return React.createClass({
    displayName: 'WorkoutLink',

    mixins: [LayerMixin, StoreMixin],

    propTypes: {
      shoes: React.PropTypes.array,
      workout: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
      return {
        alert: null,
        isEditing: false,
        isLoading: false,
        shown: false,
        workout: this.props.workout
      };
    },

    componentWillMount: function() {
      this.stores = [
        this.setStoreInfo(AlertStore, this._alertChanged),
        this.setStoreInfo(WorkoutsStore, this._workoutsChanged),
        this.setStoreInfo(WorkoutStore, this._workoutChanged)
      ];
    },

    _alertChanged: function() {
      this.setState({
        alert: {
          message: AlertStore.getAlertMessage(),
          type: AlertStore.getAlertType()
        },
        // Stay in the edit state if there was an error
        isEditing: AlertStore.getAlertTypeIsDanger(),
        isLoading: false
      });
    },

    /**
     * When in a temporary state (adding or editing), use the workout store
     */
    _workoutChanged: function() {
      var workout = WorkoutStore.getWorkout();
      if (workout && workout.id === this.props.workout.id) {
        this.setState({
          isLoading: false,
          workout: workout
        });
      } else {
        this.setState({
          workout: this.props.workout          
        });
      }
    },

    /**
     * When fetching or writing data, use WorkoutsStore, which holds all the
     * workouts for the view.
     */
    _workoutsChanged: function() {
      // After the workout is deleted, this callback will fire.
      if (this.isMounted()) {
        var workout = WorkoutsStore.getWorkoutByID(this.props.workout.id);
        this.setState({
          isLoading: false,
          workout: workout
        });
      }
    },

    render: function() {
      return (
        <Link
          href="javascript:;"
          className="workout"
          onClick={this._onViewClick}>
          <span className="distance">
            {formatDistance(this.props.workout.distance)}
          </span>
          {' '}
          mi
        </Link>
      );
    },

    renderLayer: function() {
      var isLoading = this.state.isLoading;
      if (this.state.isEditing) {
        return (
          <Modal
            isLoading={isLoading}
            alert={this.state.alert}
            shown={this.state.shown}
            onRequestClose={this._toggleModal}
            title="Edit Workout"
            footer={
              <LeftRight>
                <Button
                  disabled={isLoading}
                  glyph="trash"
                  onClick={this._onDeleteClick}
                  tooltip={{
                    title: 'Delete workout'
                  }}
                />
                <div>
                  <Button
                    disabled={isLoading}
                    label="Cancel"
                    onClick={this._onCancelEdit}
                  />
                  <Button
                    use="primary"
                    disabled={isLoading}
                    label="Update Workout"
                    onClick={this._onUpdateClick}
                  />
                </div>
              </LeftRight>
            }>
            <WorkoutFields
              action="edit"
              shoes={this.props.shoes}
              workout={this.state.workout}
            />
          </Modal>
        );
      }

      var workoutView;
      var footer;
      if (this._isCached()) {
        workoutView = <Activity activity={this.props.workout} />;
        footer =
          <LeftRight>
            <ButtonGroup>
              <Button
                disabled={isLoading}
                glyph="pencil"
                onClick={this._onEditClick}
                tooltip={{
                  title: 'Edit workout'
                }}
              />
              <Button
                disabled={isLoading}
                glyph="trash"
                onClick={this._onDeleteClick}
                tooltip={{
                  title: 'Delete workout'
                }}
              />
              <Button
                disabled={isLoading}
                glyph="link"
                onClick={this._onPermalinkClick}
                tooltip={{
                  title: 'View Permalink'
                }}
              />
            </ButtonGroup>
            <Button
              disabled={isLoading}
              label="Close"
              onClick={this._toggleModal}
            />
          </LeftRight>;
      }
      
      return (
        <Modal
          isLoading={isLoading}
          alert={this.state.alert}
          shown={this.state.shown}
          onRequestClose={this._toggleModal}
          footer={footer}>
          {workoutView}
        </Modal>
      );
    },

    _toggleModal: function() {
      if (!this.isMounted()) {
        // Deleting the workout unmounts the component
        return;
      }

      this.setState({
        shown: !this.state.shown,
        isEditing: false,
        isLoading: false,
        alert: null
      });
    },

    _onViewClick: function() {
      this._toggleModal();
      if (!this._isCached()) {
        // Fetch the full set of data if we don't already have it
        this.setState({ isLoading: true });
        WorkoutActions.view(this.props.workout.id);
      }
    },

    _onDeleteClick: function() {
      if (confirm('Are you sure you want to delete this workout?')) {
        this.setState({ isLoading: true });
        WorkoutActions.delete(this.props.workout.id);
      }
    },

    _onEditClick: function() {
      this.setState({
        alert: null,
        isEditing: true
      });
      WorkoutActions.startEditWorkout(this.state.workout);
    },

    _onCancelEdit: function() {
      this._toggleModal();
      WorkoutActions.cancel();
    },

    _onUpdateClick: function() {
      this.setState({ isLoading: true });
      WorkoutActions.save(this.state.workout);
    },

    _onPermalinkClick: function() {
      window.location.href = '/workouts/view/' + this.props.workout.id;
    },

    _isCached: function() {
      return WorkoutsStore.getIsCached(this.props.workout.id);
    }
  });

});