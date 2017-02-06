import cx from 'classnames';
import React from 'react';
import {Col, ControlLabel, FormGroup} from 'react-bootstrap';

/**
 * FormGroup.react
 */
module.exports = React.createClass({
  displayName: 'FormGroup',

  propTypes: {
    label: React.PropTypes.string,
    type: React.PropTypes.string,
    hideLabel: React.PropTypes.bool,
  },

  render() {
    return (
      <FormGroup>
        <Col sm={3}>
          <ControlLabel for={this.props.name}>
            {this.props.label}
          </ControlLabel>
        </Col>
        <Col sm={9}>
          {this.props.children}
        </Col>
      </FormGroup>
    );
  },
});
