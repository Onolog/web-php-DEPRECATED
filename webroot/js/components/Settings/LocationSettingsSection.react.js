import React from 'react';
import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';

import AppForm from 'components/Forms/AppForm.react';
import SettingsListGroup from 'components/Settings/SettingsListGroup.react';

const LocationSettingsSection = ({onChange, user}) => (
  <SettingsListGroup.Item
    description="Default location and timezone settings."
    title="Location">
    <AppForm>
      <FormGroup>
        <ControlLabel>Timezone</ControlLabel>
        <FormControl
          defaultValue={user.timezone}
          disabled
          name="timezone"
          onChange={onChange}
          placeholder="Enter your timezone..."
          type="text"
        />
      </FormGroup>
    </AppForm>
  </SettingsListGroup.Item>
);

export default LocationSettingsSection;
