import React from 'react';
import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';

import AppForm from 'components/Forms/AppForm.react';
import SettingsListGroup from 'components/Settings/SettingsListGroup.react';

const ProfileSettingsSection = ({onChange, user}) => (
  <SettingsListGroup.Item
    description="Name, email, and avatar settings."
    title="Profile">
    <AppForm>
      <FormGroup>
        <ControlLabel>First Name</ControlLabel>
        <FormControl
          defaultValue={user.first_name}
          name="first_name"
          onChange={onChange}
          placeholder="Enter your first name"
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Last Name</ControlLabel>
        <FormControl
          defaultValue={user.last_name}
          name="last_name"
          onChange={onChange}
          placeholder="Enter your last name"
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Email Address</ControlLabel>
        <FormControl
          defaultValue={user.email}
          name="email"
          onChange={onChange}
          placeholder="Enter your email address"
          type="text"
        />
      </FormGroup>
    </AppForm>
  </SettingsListGroup.Item>
);

export default ProfileSettingsSection;
