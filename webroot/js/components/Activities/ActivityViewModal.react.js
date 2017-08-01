import PropTypes from 'prop-types';
import React from 'react';
import {
  Button,
  ButtonGroup,
  Modal,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import ActivityContainer from 'containers/ActivityContainer';
import LeftRight from 'components/LeftRight/LeftRight.react';
import Loader from 'components/Loader/Loader.react';
import MaterialIcon from 'components/Icons/MaterialIcon.react';

/**
 * ActivityViewModal.react
 */
const ActivityViewModal = React.createClass({
  displayName: 'ActivityViewModal',

  propTypes: {
    activity: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
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
    const {activity, isLoading, onEdit, onHide, show} = this.props;

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
                  <MaterialIcon icon="pencil" />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                overlay={<Tooltip id="permalink">View Permalink</Tooltip>}
                placement="top">
                <LinkContainer to={`/activities/${activity.id}`}>
                  <Button disabled={isLoading}>
                    <MaterialIcon icon="link-variant" />
                  </Button>
                </LinkContainer>
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
});

export default ActivityViewModal;
