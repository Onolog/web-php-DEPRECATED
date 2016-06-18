import React, {PropTypes} from 'react';
import {
  Button,
  ButtonGroup,
  Glyphicon,
  Modal,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

import ActivityContainer from 'containers/ActivityContainer';
import LeftRight from 'components/LeftRight/LeftRight.react';
import Loader from 'components/Loader/Loader.react';

/**
 * ActivityViewModal.react
 */
const ActivityViewModal = React.createClass({
  displayName: 'ActivityViewModal',

  propTypes: {
    activity: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      isLoading: false,
    };
  },

  render() {
    const {activity, isLoading, onDelete, onEdit, onHide, show} = this.props;

    return (
      <Modal onHide={onHide} show={show}>
        <Modal.Body>
          {isLoading && <Loader background full large />}
          <ActivityContainer id={activity.id} />
        </Modal.Body>
        <Modal.Footer>
          <LeftRight>
            <ButtonGroup>
              <OverlayTrigger
                overlay={<Tooltip id="edit">Edit Activity</Tooltip>}
                placement="top">
                <Button disabled={isLoading} onClick={onEdit}>
                  <Glyphicon glyph="pencil" />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                overlay={<Tooltip id="delete">Delete Activity</Tooltip>}
                placement="top">
                <Button disabled={isLoading} onClick={onDelete}>
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
            <Button disabled={isLoading} onClick={onHide}>
              Close
            </Button>
          </LeftRight>
        </Modal.Footer>
      </Modal>
    );
  },

  _handlePermalink() {
    document.location = `/activities/view/${this.props.activity.id}`;
  },
});

module.exports = ActivityViewModal;
