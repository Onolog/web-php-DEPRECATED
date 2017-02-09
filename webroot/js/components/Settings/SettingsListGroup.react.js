import React, {PropTypes} from 'react';
import {Col, Row, ListGroup, ListGroupItem} from 'react-bootstrap';

import './css/SettingsListGroup.css';

const SettingsListGroup = props => (
  <ListGroup className="settings-list-group">
    {props.children}
  </ListGroup>
);

const SettingsListGroupItem = props => (
  <ListGroupItem className="settings-list-group-item">
    <Row>
      <Col md={2}>
        <h4 className="settings-list-group-item-title">
          {props.title}
        </h4>
        <div className="settings-list-group-item-description">
          {props.description}
        </div>
      </Col>
      <Col md={5}>
        {props.children}
      </Col>
    </Row>
  </ListGroupItem>
);

SettingsListGroupItem.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
};

SettingsListGroup.Item = SettingsListGroupItem;

export default SettingsListGroup;
