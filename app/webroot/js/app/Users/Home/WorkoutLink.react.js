var _ = require('underscore');
var React = require('react');

var Activity = require('app/Activities/Activity.react');
var Button = require('components/Button/Button.react');
var ButtonGroup = require('components/ButtonGroup/ButtonGroup.react');
var LeftRight = require('components/LeftRight/LeftRight.react');
var Link = require('components/Link/Link.react');
var Modal = require('components/Modal/Modal.react');
var WorkoutFields = require('app/Workouts/WorkoutFields.react');

var LayerMixin = require('mixins/LayerMixin.react');
var StoreMixin = require('mixins/StoreMixin.react');

var ActionTypes = require('flux/ActionTypes');
var AlertStore = require('flux/stores/AlertStore');
var WorkoutActions = require('flux/actions/WorkoutActions');
var WorkoutStore = require('flux/stores/WorkoutStore');

var formatDistance = require('utils/formatDistance');

/**
 * WorkoutLink.react
 */
var WorkoutLink = React.createClass({
  displayName: 'WorkoutLink',

  mixins: [LayerMixin, StoreMixin],

  propTypes: {
    workout: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      alert: null,
      isEditing: false,
      isLoading: false,
      shown: false,
      workout: WorkoutStore.getItem(this.props.workout.id)
    };
  },

  componentWillMount: function() {
    this.stores = [
      this.setStoreInfo(AlertStore, this._alertChanged),
      this.setStoreInfo(WorkoutStore, this._workoutsChanged)
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

  _workoutsChanged: function() {
    // After the workout is deleted, this callback will fire.
    if (this.isMounted()) {
      this.setState({
        isLoading: false,
        workout: WorkoutStore.getItem(this.props.workout.id)
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
          onRequestClose={this._closeModal}
          title="Edit Activity"
          footer={
            <LeftRight>
              <Button
                disabled={isLoading}
                glyph="trash"
                onClick={this._onDeleteClick}
                tooltip={{
                  title: 'Delete Activity'
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
                  label="Update Activity"
                  onClick={this._onUpdateClick}
                />
              </div>
            </LeftRight>
          }>
          <WorkoutFields
            onChange={this._onChange}
            workout={this.state.workout}
          />
        </Modal>
      );
    }
    
    return (
      <Modal
        isLoading={isLoading}
        alert={this.state.alert}
        shown={this.state.shown}
        onRequestClose={this._closeModal}
        footer={
          <LeftRight>
            <ButtonGroup>
              <Button
                disabled={isLoading}
                glyph="pencil"
                onClick={this._onEditClick}
                tooltip={{
                  title: 'Edit Activity'
                }}
              />
              <Button
                disabled={isLoading}
                glyph="trash"
                onClick={this._onDeleteClick}
                tooltip={{
                  title: 'Delete Activity'
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
              onClick={this._closeModal}
            />
          </LeftRight>
        }>
        <Activity activity={this.state.workout} />
      </Modal>
    );
  },

  _closeModal: function() {
    if (!this.isMounted()) {
      return;
    }

    var hasEdits = !_.isEqual(
      WorkoutStore.getItem(this.props.workout.id),
      this.state.workout
    );
    var confirmed = hasEdits && confirm(
      'Are you sure you want to close the dialog? Your changes will not ' +
      'be saved.'
    );

    if (!hasEdits || confirmed) {
      this.setState(this.getInitialState());
    }
  },

  _onChange: function(workout) {
    this.setState({workout: workout});
  },

  _onViewClick: function() {
    this.setState({shown: true});

    if (!WorkoutStore.getItem(this.props.workout.id)) {
      // Fetch the full set of data if we don't already have it
      this.setState({ isLoading: true });
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
  },

  _onCancelEdit: function() {
    this._closeModal();
  },

  _onUpdateClick: function() {
    this.setState({ isLoading: true });
    WorkoutActions.save(this.state.workout);
  },

  _onPermalinkClick: function() {
    window.location.href = '/workouts/view/' + this.props.workout.id;
  },

  _isCached: function() {
    return WorkoutStore.getIsCached(this.props.workout.id);
  }
});

module.exports = WorkoutLink;
