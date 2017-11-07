import {isEmpty, isEqual} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import AppFullPage from 'components/Page/AppFullPage.react';
import Loader from 'components/Loader/Loader.react';
import LocationSettingsSection from 'components/Settings/LocationSettingsSection.react';
import PageFrame from 'components/Page/PageFrame.react';
import PageHeader from 'components/Page/PageHeader.react';
import ProfileSettingsSection from 'components/Settings/ProfileSettingsSection.react';
import SettingsListGroup from 'components/Settings/SettingsListGroup.react';
import UnitsSettingsSection from 'components/Settings/UnitsSettingsSection.react';

import {fetchSettings, userSaveSettings} from 'actions/users';
import {SETTINGS_FETCH} from 'constants/ActionTypes';

const TITLE = 'Settings';

const mapStateToProps = ({pendingRequests, session}) => {
  return {
    pendingRequests,
    user: session,
  };
};

/**
 * SettingsController.react
 */
class SettingsController extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      distance_units: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      timezone: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {...this.props.user};

  componentWillMount() {
    this.props.dispatch(fetchSettings());
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(
      this.props.route,
      this._handleNavigateAway
    );
  }

  render() {
    const {pendingRequests, user} = this.props;

    return (
      <AppFullPage title={TITLE}>
        <PageHeader full title={TITLE}>
          <Button
            bsSize="small"
            bsStyle="primary"
            disabled={isEqual(this.state, user)}
            onClick={this._handleSave}>
            Save Changes
          </Button>
        </PageHeader>
        <PageFrame fill isLoading={pendingRequests[SETTINGS_FETCH]} scroll>
          {this._renderContent()}
        </PageFrame>
      </AppFullPage>
    );
  }

  _renderContent = () => {
    if (isEmpty(this.props.user)) {
      return <Loader background full />;
    }

    return (
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
    );
  };

  _handleChange = (e) => {
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
  };

  _handleNavigateAway = (nextLocation) => {
    if (!isEqual(this.state, this.props.user)) {
      return (
        'Are you sure you want to leave? Your settings have not been saved.'
      );
    }
  };

  _handleSave = (e) => {
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
  };
}

module.exports = connect(mapStateToProps)(withRouter(SettingsController));
