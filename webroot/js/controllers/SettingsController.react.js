import {find, isEmpty, isEqual} from 'lodash';
import React, {PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';

import AppFullPage from 'components/Page/AppFullPage.react';
import Loader from 'components/Loader/Loader.react';
import LocationSettingsSection from 'components/Settings/LocationSettingsSection.react';
import PageFrame from 'components/Page/PageFrame.react';
import PageHeader from 'components/Page/PageHeader.react';
import ProfileSettingsSection from 'components/Settings/ProfileSettingsSection.react';
import ScrollContainer from 'components/ScrollContainer/ScrollContainer.react';
import SettingsListGroup from 'components/Settings/SettingsListGroup.react';
import UnitsSettingsSection from 'components/Settings/UnitsSettingsSection.react';

import {fetchSettings, userSaveSettings} from 'actions/users';
import {SETTINGS_FETCH} from 'constants/ActionTypes';

import './css/Settings.css';

const mapStateToProps = ({pendingRequests, session, users}) => {
  return {
    pendingRequests,
    user: find(users, {id: session.id}) || {},
  };
};

/**
 * SettingsController.react
 */
const SettingsController = React.createClass({
  propTypes: {
    user: PropTypes.shape({
      distance_units: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      timezone: PropTypes.string.isRequired,
    }).isRequired,
  },

  getInitialState() {
    return {...this.props.user};
  },

  componentWillMount() {
    this.props.dispatch(fetchSettings());
  },

  render() {
    return (
      <AppFullPage>
        <PageHeader full title="Settings">
          <Button
            bsSize="small"
            bsStyle="primary"
            disabled={isEqual(this.state, this.props.user)}
            onClick={this._handleSave}>
            Save Changes
          </Button>
        </PageHeader>
        <PageFrame>
          {this._renderContent()}
        </PageFrame>
      </AppFullPage>
    );
  },

  _renderContent() {
    const {pendingRequests, user} = this.props;

    if (isEmpty(user)) {
      return <Loader background full />;
    }

    return (
      <ScrollContainer className="settings-page">
        {pendingRequests[SETTINGS_FETCH] && <Loader background full />}
        <SettingsListGroup>
          <ProfileSettingsSection
            onChange={this._handleChange}
            user={this.state}
          />
          <LocationSettingsSection
            onChange={this._handleChange}
            user={this.state}
          />
          <UnitsSettingsSection
            onChange={this._handleChange}
            user={this.state}
          />
        </SettingsListGroup>
      </ScrollContainer>
    );
  },

  _handleChange(e) {
    const newState = {};
    const {name, value} = e.target;

    switch (name) {
      case 'distance_units':
        // Cast string value to an int.
        newState[name] = parseInt(value, 10);
        break;
      default:
        newState[name] = value;
        break;
    }

    this.setState(newState);
  },

  _handleSave(e) {
    const {email, first_name, last_name} = this.state;

    // TODO: Better client-side validation.
    if (!email.trim()) {
      alert('Email cannot be empty.');
      return;
    }

    if (!first_name.trim()) {
      alert('First name cannot be empty.');
      return;
    }

    if (!last_name.trim()) {
      alert('Last name cannot be empty.');
      return;
    }

    this.props.dispatch(userSaveSettings({
      ...this.state,
      id: this.props.user.id,
    }));
  },
});

module.exports = connect(mapStateToProps)(SettingsController);
