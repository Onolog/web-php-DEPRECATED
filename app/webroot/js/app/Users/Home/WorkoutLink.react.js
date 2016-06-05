import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import ActivityModal from './ActivityModal.react';
import ActivityViewModal from './ActivityViewModal.react';
import Link from 'components/Link/Link.react';

import {deleteActivity} from 'actions/activities';

import formatDistance from 'utils/formatDistance';
import {isEqual} from 'lodash';

/**
 * WorkoutLink.react
 */
const WorkoutLink = React.createClass({
  displayName: 'WorkoutLink',

  propTypes: {
    workout: PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      isEditing: false,
      isLoading: false,
      showModal: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    // Close the modal if the activity was successfully updated.
    if (!isEqual(nextProps.workout, this.props.workout)) {
      this._hideModal();
    }
  },

  render() {
    const {workout} = this.props;
    const {isEditing, isLoading, showModal} = this.state;

    const modal = isEditing ?
      <ActivityModal
        animation={false}
        initialActivity={workout}
        onHide={this._hideModal}
        show={showModal}
      /> :
      <ActivityViewModal
        activity={workout}
        isLoading={isLoading}
        onDelete={this._handleDelete}
        onEdit={this._handleEdit}
        onHide={this._hideModal}
        show={showModal}
      />;

    return (
      <Link className="workout" href="#" onClick={this._showModal}>
        <span className="distance">
          {formatDistance(workout.distance)}
        </span> mi
        {modal}
      </Link>
    );
  },

  _handleDelete() {
    if (confirm('Are you sure you want to delete this activity?')) {
      this.setState({isLoading: true});

      const {dispatch, workout} = this.props;
      dispatch(deleteActivity(workout.id));
    }
  },

  _handleEdit() {
    this.setState({isEditing: true});
  },

  _hideModal() {
    this.setState({
      isEditing: false,
      isLoading: false,
      showModal: false,
    });
  },

  _showModal() {
    this.setState({showModal: true});
  },
});

module.exports = connect()(WorkoutLink);
