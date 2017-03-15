import {isEmpty} from 'lodash';
import React, {PropTypes} from 'react';
import {Button, ButtonToolbar, Modal} from 'react-bootstrap';

import ActivityFromUrlForm from 'components/Activities/ActivityFromUrlForm.react';
import activityWriteContainer from 'containers/activityWriteContainer';
import {GARMIN_ACTIVITY_FETCH} from 'constants/ActionTypes';

const ActivityImportModal = React.createClass({
  propTypes: {
    activity: PropTypes.object,
  },

  render() {
    const {
      activity,
      isLoading,
      onChange,
      onHide,
      onExited,
      onSave,
      pendingRequests,
      show,
    } = this.props;

    return (
      <Modal onExited={onExited} onHide={onHide} show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Import an Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ActivityFromUrlForm
            activity={activity}
            isLoading={pendingRequests[GARMIN_ACTIVITY_FETCH]}
            onChange={onChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <ButtonToolbar className="pull-right">
            <Button
              disabled={isLoading}
              onClick={onHide}>
              Cancel
            </Button>
            <Button
              bsStyle="primary"
              disabled={isLoading || isEmpty(activity)}
              onClick={onSave}>
              Create Activity
            </Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  },
});

export default activityWriteContainer(ActivityImportModal);
