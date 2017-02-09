import React from 'react';
import {ControlLabel, FormGroup, Radio} from 'react-bootstrap';

import AppForm from 'components/Forms/AppForm.react';
import SettingsListGroup from 'components/Settings/SettingsListGroup.react';

const DISTANCE_UNITS = {
  MILES: 0,
  KILOMETERS: 1,
};

const UnitsSettingsSection = ({onChange, user}) => {
  const units = [
    {label: 'Miles', value: DISTANCE_UNITS.MILES},
    {label: 'Kilometers', value: DISTANCE_UNITS.KILOMETERS},
  ];

  return (
    <SettingsListGroup.Item
      description="Default settings for units of measure."
      title="Units & Measurements">
      <AppForm>
        <FormGroup>
          <ControlLabel>Distance Units</ControlLabel>
          {units.map(({label, value}) => (
            <Radio
              checked={user.distance_units === value}
              key={value}
              name="distance_units"
              onChange={onChange}
              value={value}>
              {label}
            </Radio>
          ))}
        </FormGroup>
      </AppForm>
    </SettingsListGroup.Item>
  );
};

export default UnitsSettingsSection;
