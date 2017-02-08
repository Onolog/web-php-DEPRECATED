import cx from 'classnames';
import React from 'react';
import {Form} from 'react-bootstrap';

import './css/AppForm.css';

/**
 * Wrapper around react-bootstrap Form component for app-specific styling.
 */
const AppForm = props => (
  <Form
    {...props}
    className={cx('app-form', {
      'app-form-bordered': props.bordered,
    }, props.className)}
  />
);

export default AppForm;
