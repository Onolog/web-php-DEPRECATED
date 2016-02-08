var React = require('react');
var {Button, Panel} = require('react-bootstrap/lib');

var AppPage = require('components/Page/AppPage.react');
var FormGroup = require('components/Forms/FormGroup.react');
var HiddenInput = require('components/Forms/HiddenInput.react');
var TextInput = require('components/Forms/TextInput.react');
var PageHeader = require('components/Page/PageHeader.react');

var UserStore = require('flux/stores/UserStore');

var {encodeFormFieldName} = require('utils/cakePHP');

var FORM_NAME = 'User';

/**
 * Settings.react
 */
var Settings = React.createClass({
  displayName: 'Settings',

  getInitialState: function() {
    return {
      user: UserStore.getUser(),
    };
  },

  render: function() {
    const {user} = this.state;

    return (
      <AppPage className="settings" narrow>
        <PageHeader title="Settings" />
        <Panel className="form-horizontal">
          <form action={'/users/settings/'} method="post">
            <FormGroup label="First Name">
              <TextInput
                defaultValue={user.first_name}
                name={encodeFormFieldName('first_name', FORM_NAME)}
                placeholder="Enter your first name"
              />
            </FormGroup>
            <FormGroup label="Last Name">
              <TextInput
                defaultValue={user.last_name}
                name={encodeFormFieldName('last_name', FORM_NAME)}
                placeholder="Enter your last name"
              />
            </FormGroup>
            <FormGroup label="Email Address">
              <TextInput
                defaultValue={user.email}
                name={encodeFormFieldName('email', FORM_NAME)}
                placeholder="Enter your email address"
              />
            </FormGroup>
            <FormGroup label="">
              <Button bsStyle="primary" type="submit">
                Save Changes
              </Button>
            </FormGroup>
            <HiddenInput
              name={encodeFormFieldName('id', FORM_NAME)}
              value={user.id}
            />
          </form>
        </Panel>
      </AppPage>
    );
  },
});

module.exports = Settings;
