import React from 'react';
import {ControlLabel, FormGroup, Radio} from 'react-bootstrap';

import AppForm from 'components/Forms/AppForm.react';
import SettingsListGroup from 'components/Settings/SettingsListGroup.react';

import {UNITS} from 'constants/metrics';

const UnitsSettingsSection = ({onChange, user}) => {
  const units = [
    {label: 'Miles', value: UNITS.MILES},
    {label: 'Kilometers', value: UNITS.KILOMETERS},
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
