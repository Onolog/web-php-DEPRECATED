var React = require('react');

var AppPage = require('components/Page/AppPage.react');
var Button = require('components/Button/Button.react');
var FormGroup = require('components/Forms/FormGroup.react');
var HiddenInput = require('components/Forms/HiddenInput.react');
var TextInput = require('components/Forms/TextInput.react');
var PageHeader = require('components/Page/PageHeader.react');
var Panel = require('components/Panel/Panel.react');
var Select = require('components/Select/Select.react');

var UserStore = require('flux/stores/UserStore');

var cakePHP = require('utils/cakePHP');

var FORM_NAME = 'User';

/**
 * Settings.react
 */
var Settings = React.createClass({
  displayName: 'Settings',

  getInitialState: function() {
    return {
      user: UserStore.getUser()
    };
  },

  render: function() {
    var user = this.state.user;
    return (
      <AppPage className="settings" narrow>
        <PageHeader title="Settings" />
        <Panel className="form-horizontal">
          <form action={'/users/settings/'} method="post">
            <FormGroup label="First Name">
              <TextInput
                defaultValue={user.first_name}
                name={cakePHP.encodeFormFieldName('first_name', FORM_NAME)}
                placeholder="Enter your first name"
              />
            </FormGroup>
            <FormGroup label="Last Name">
              <TextInput
                defaultValue={user.last_name}
                name={cakePHP.encodeFormFieldName('last_name', FORM_NAME)}
                placeholder="Enter your last name"
              />
            </FormGroup>
            <FormGroup label="Email Address">
              <TextInput
                defaultValue={user.email}
                name={cakePHP.encodeFormFieldName('email', FORM_NAME)}
                placeholder="Enter your email address"
              />
            </FormGroup>
            <FormGroup label="">
              <Button use="primary" label="Save Changes" type="submit" />
            </FormGroup>
            <HiddenInput
              name={cakePHP.encodeFormFieldName('id', FORM_NAME)}
              value={user.id}
            />
          </form>
        </Panel>
      </AppPage>
    );
  }

});

module.exports = Settings;
