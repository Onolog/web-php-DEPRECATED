import React, {PropTypes} from 'react';
import {Button, ButtonToolbar, Modal} from 'react-bootstrap';

import ActivityForm from 'components/Activities/ActivityForm.react';
import LeftRight from 'components/LeftRight/LeftRight.react';
import Loader from 'components/Loader/Loader.react';

import activityWriteContainer from 'containers/activityWriteContainer';

/**
 * ActivityModal.react
 *
 * Edit an existing activity or create a new one.
 */
const ActivityModal = React.createClass({

  propTypes: {
    initialActivity: PropTypes.object,
    /**
     * Date object for the given day
     */
    date: PropTypes.instanceOf(Date),
    onHide: PropTypes.func,
    show: PropTypes.bool,
  },

  render() {
    const {
      activity,
      initialActivity,
      isLoading,
      onChange,
      onDelete,
      onExited,
      onHide,
      onSave,
      show,
    } = this.props;

    let deleteButton;
    let primaryAction;
    let title;

    if (initialActivity) {
      deleteButton =
        <Button
          bsStyle="danger"
          onClick={onDelete}>
          Delete
        </Button>;
      primaryAction = 'Update Activity';
      title = 'Edit Activity';
    } else {
      primaryAction = 'Create Activity';
      title = 'Create A New Activity';
    }

    return (
      <Modal
        onExited={onExited}
        onHide={onHide}
        show={show}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading && <Loader background full large />}
          <ActivityForm
            activity={activity}
            onChange={onChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <LeftRight>
            {deleteButton}
            <ButtonToolbar>
              <Button
                disabled={isLoading}
                onClick={onHide}>
                Cancel
              </Button>
              <Button
                bsStyle="primary"
                disabled={isLoading}
                onClick={onSave}>
                {primaryAction}
              </Button>
            </ButtonToolbar>
          </LeftRight>
        </Modal.Footer>
      </Modal>
    );
  },
});

export default activityWriteContainer(ActivityModal);
