import React from 'react';
import {
  Button,
  ButtonGroup,
  Glyphicon,
  Modal,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap/lib';

import Activity from 'app/Activities/Activity.react';
import LeftRight from 'components/LeftRight/LeftRight.react';
import Loader from 'components/Loader/Loader.react';
import WorkoutActions from 'flux/actions/WorkoutActions';

const {PropTypes} = React;

/**
 * ActivityViewModal.react
 */
const ActivityViewModal = React.createClass({
  displayName: 'ActivityViewModal',

  propTypes: {
    activity: PropTypes.object,
    onEdit: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool,
  },

  getInitialState: function() {
    return {
      isLoading: false,
    };
  },

  render: function() {
    const {activity} = this.props;
    const {isLoading} = this.state;

    return (
      <Modal onHide={this._handleClose} show={this.props.show}>
        <Modal.Body>
          {isLoading && <Loader background full large />}
          <Activity activity={activity} />
        </Modal.Body>
        <Modal.Footer>
          <LeftRight>
            <ButtonGroup>
              <OverlayTrigger
                overlay={<Tooltip id="edit">Edit Activity</Tooltip>}
                placement="top">
                <Button disabled={isLoading} onClick={this._handleEdit}>
                  <Glyphicon glyph="pencil" />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                overlay={<Tooltip id="delete">Delete Activity</Tooltip>}
                placement="top">
                <Button disabled={isLoading} onClick={this._handleDelete}>
                  <Glyphicon glyph="trash" />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                overlay={<Tooltip id="permalink">View Permalink</Tooltip>}
                placement="top">
                <Button disabled={isLoading} onClick={this._handlePermalink}>
                  <Glyphicon glyph="link" />
                </Button>
              </OverlayTrigger>
            </ButtonGroup>
            <Button disabled={isLoading} onClick={this._handleClose}>
              Close
            </Button>
          </LeftRight>
        </Modal.Footer>
      </Modal>
    );
  },

  _handleDelete: function() {
    if (confirm('Are you sure you want to delete this activity?')) {
      this.setState({isLoading: true});
      WorkoutActions.delete(this.props.activity.id);
    }
  },

  _handleEdit: function() {
    this.props.onEdit();
  },

  _handlePermalink: function() {
    document.location = `/workouts/view/${this.props.activity.id}`;
  },

  _handleClose: function() {
    this.props.onHide();
  },
});

module.exports = ActivityViewModal;
