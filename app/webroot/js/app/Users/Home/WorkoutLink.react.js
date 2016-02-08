import React from 'react';

import ActivityModal from './ActivityModal.react';
import ActivityViewModal from './ActivityViewModal.react';
import Link from 'components/Link/Link.react';

import formatDistance from 'utils/formatDistance';
import {isEqual} from 'lodash';

/**
 * WorkoutLink.react
 */
const WorkoutLink = React.createClass({
  displayName: 'WorkoutLink',

  propTypes: {
    workout: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      isEditing: false,
      showModal: false,
    };
  },

  componentWillReceiveProps: function(nextProps) {
    // Close the modal if the activity was successfully updated.
    if (!isEqual(nextProps.workout, this.props.workout)) {
      this._hideModal();
    }
  },

  render: function() {
    var {workout} = this.props;
    var {isEditing, showModal} = this.state;

    var modal = isEditing ?
      <ActivityModal
        animation={false}
        initialActivity={workout}
        onHide={this._hideModal}
        show={showModal}
      /> :
      <ActivityViewModal
        activity={workout}
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

  _handleEdit: function() {
    this.setState({isEditing: true});
  },

  _hideModal: function() {
    this.setState({
      isEditing: false,
      showModal: false,
    });
  },

  _showModal: function() {
    this.setState({showModal: true});
  },
});

module.exports = WorkoutLink;
