import {find, isEmpty} from 'lodash';
import React, {PropTypes} from 'react';
import {Button, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import {connect} from 'react-redux';

import AppForm from 'components/Forms/AppForm.react';
import AppFullPage from 'components/Page/AppFullPage.react';
import Loader from 'components/Loader/Loader.react';
import PageFrame from 'components/Page/PageFrame.react';
import PageHeader from 'components/Page/PageHeader.react';
import ScrollContainer from 'components/ScrollContainer/ScrollContainer.react';
import SettingsListGroup from 'components/Settings/SettingsListGroup.react';

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
      email: PropTypes.string.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    }).isRequired,
  },

  getInitialState() {
    const {email, first_name, last_name} = this.props.user;
    return {
      email,
      first_name,
      last_name,
    };
  },

  componentWillMount() {
    this.props.dispatch(fetchSettings());
  },

  render() {
    return (
      <AppFullPage>
        <PageHeader full title="Settings" />
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
          <SettingsListGroup.Item title="Profile">
            <AppForm>
              <FormGroup>
                <ControlLabel>First Name</ControlLabel>
                <FormControl
                  defaultValue={user.first_name}
                  name="first_name"
                  onChange={this._handleChange}
                  placeholder="Enter your first name"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Last Name</ControlLabel>
                <FormControl
                  defaultValue={user.last_name}
                  name="last_name"
                  onChange={this._handleChange}
                  placeholder="Enter your last name"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Email Address</ControlLabel>
                <FormControl
                  defaultValue={user.email}
                  name="email"
                  onChange={this._handleChange}
                  placeholder="Enter your email address"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Button bsStyle="primary" onClick={this._handleSave}>
                  Save Changes
                </Button>
              </FormGroup>
            </AppForm>
          </SettingsListGroup.Item>
        </SettingsListGroup>
      </ScrollContainer>
    );
  },

  _handleChange(e) {
    let newState = {};
    let {name, value} = e.target;
    newState[name] = value;

    this.setState(newState);
  },

  _handleSave(e) {
    // TODO: Validation?
    this.props.dispatch(userSaveSettings({
      ...this.state,
      id: this.props.user.id,
    }));
  },
});

module.exports = connect(mapStateToProps)(SettingsController);
