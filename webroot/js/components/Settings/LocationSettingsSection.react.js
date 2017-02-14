import React from 'react';
import {ControlLabel, FormGroup} from 'react-bootstrap';

import AppForm from 'components/Forms/AppForm.react';
import SettingsListGroup from 'components/Settings/SettingsListGroup.react';
import TimezoneSelector from 'components/Forms/TimezoneSelector.react';

const LocationSettingsSection = ({onChange, user}) => (
  <SettingsListGroup.Item
    description="Default location and timezone settings."
    title="Location">
    <AppForm>
      <FormGroup>
        <ControlLabel>Timezone</ControlLabel>
        <TimezoneSelector
          className="form-control"
          name="timezone"
          onChange={onChange}
          timezone={user.timezone}
        />
      </FormGroup>
    </AppForm>
  </SettingsListGroup.Item>
);

export default LocationSettingsSection;
