var React = require('react');
var {Button, Panel} = require('react-bootstrap/lib');

var AppPage = require('components/Page/AppPage.react');
var FormGroup = require('components/Forms/FormGroup.react');
var Loader = require('components/Loader/Loader.react');
var PageHeader = require('components/Page/PageHeader.react');
var TextInput = require('components/Forms/TextInput.react');

var ActionTypes = require('flux/ActionTypes');
var UserActions = require('flux/actions/UserActions');
var UserStore = require('flux/stores/UserStore');

var {isEqual} = require('lodash');

/**
 * Settings.react
 */
var Settings = React.createClass({
  displayName: 'Settings',

  getInitialState() {
    const {email, first_name, id, last_name} = UserStore.getUser();
    return {
      email,
      first_name,
      id,
      isLoading: false,
      last_name,
    };
  },

  componentDidMount() {
    UserStore.bind(ActionTypes.CHANGE, this._settingsChanged);
  },

  componentWillUnmount() {
    UserStore.unbind(ActionTypes.CHANGE, this._settingsChanged);
  },

  _settingsChanged(user) {
    this.setState(this.getInitialState());
  },

  render() {
    const {email, first_name, isLoading, last_name} = this.state;

    return (
      <AppPage className="settings" narrow>
        <PageHeader title="Settings" />
        <Panel className="form-horizontal">
          {isLoading && <Loader background full />}
          <FormGroup label="First Name">
            <TextInput
              defaultValue={first_name}
              name="first_name"
              onChange={this._handleChange}
              placeholder="Enter your first name"
            />
          </FormGroup>
          <FormGroup label="Last Name">
            <TextInput
              defaultValue={last_name}
              name="last_name"
              onChange={this._handleChange}
              placeholder="Enter your last name"
            />
          </FormGroup>
          <FormGroup label="Email Address">
            <TextInput
              defaultValue={email}
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
    UserActions.saveSettings(this.state);
  },
});

module.exports = Settings;
