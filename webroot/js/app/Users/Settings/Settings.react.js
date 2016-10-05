import {find, isEqual} from 'lodash';
import React, {PropTypes} from 'react';
import {Button, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';

import AppPage from 'components/Page/AppPage.react';
import FormGroup from 'components/Forms/FormGroup.react';
import Loader from 'components/Loader/Loader.react';
import PageHeader from 'components/Page/PageHeader.react';
import TextInput from 'components/Forms/TextInput.react';

import {fetchSettings, userSaveSettings} from 'actions/users';

const mapStateToProps = ({session, users}) => {
  return {
    user: find(users, {id: session.id}) || {},
  };
};

/**
 * Settings.react
 */
const Settings = React.createClass({
  displayName: 'Settings',

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
      isLoading: false,
      last_name,
    };
  },

  componentWillMount() {
    this.props.dispatch(fetchSettings());
  },

  componentWillReceiveProps(nextProps) {
    this.setState({isLoading: false});
  },

  render() {
    const {user} = this.props;
    const {isLoading} = this.state;

    if (!user) {
      return (
        <AppPage>
          <Loader />
        </AppPage>
      );
    }

    return (
      <AppPage className="settings" narrow>
        <PageHeader title="Settings" />
        <Panel className="form-horizontal">
          {isLoading && <Loader background full />}
          <FormGroup label="First Name">
            <TextInput
              defaultValue={user.first_name}
              name="first_name"
              onChange={this._handleChange}
              placeholder="Enter your first name"
            />
          </FormGroup>
          <FormGroup label="Last Name">
            <TextInput
              defaultValue={user.last_name}
              name="last_name"
              onChange={this._handleChange}
              placeholder="Enter your last name"
            />
          </FormGroup>
          <FormGroup label="Email Address">
            <TextInput
              defaultValue={user.email}
              name="email"
              onChange={this._handleChange}
              placeholder="Enter your email address"
            />
          </FormGroup>
          <FormGroup label="">
            <Button
              bsStyle="primary"
              disabled={isEqual(this.state, this.getInitialState())}
              onClick={this._handleSave}>
              Save Changes
            </Button>
          </FormGroup>
        </Panel>
      </AppPage>
    );
  },

  _handleChange(e) {
    let state = {};
    let {name, value} = e.target;
    state[name] = value;

    this.setState(state);
  },

  _handleSave(e) {
    // TODO: Validation?
    this.setState({isLoading: true});
    this.props.dispatch(userSaveSettings({
      ...this.state,
      id: this.props.user.id,
    }));
  },
});

module.exports = connect(mapStateToProps)(Settings);
