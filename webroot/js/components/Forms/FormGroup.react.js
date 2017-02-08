import cx from 'classnames';
import React, {PropTypes} from 'react';
import {Col, ControlLabel, FormGroup} from 'react-bootstrap';

/**
 * FormRow.react
 */
const FormRow = React.createClass({
  displayName: 'FormRow',

  propTypes: {
    inline: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
  },

  render() {
    const {children, inline, label, name} = this.props;

    return (
      <FormGroup className={cx({'form-inline': inline})}>
        <Col sm={3}>
          <ControlLabel for={name}>
            {label}
          </ControlLabel>
        </Col>
        <Col sm={9}>
          {children}
        </Col>
      </FormGroup>
    );
  },
});

module.exports = FormRow;
