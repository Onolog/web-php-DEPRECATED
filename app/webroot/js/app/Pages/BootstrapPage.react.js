import React from 'react';
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  Glyphicon,
  Label,
  ListGroup,
  ListGroupItem,
  MenuItem,
  Nav,
  NavDropdown,
  NavItem,
  Navbar,
  Panel,
  Table,
} from 'react-bootstrap/lib';

import AppPage from 'components/Page/AppPage.react';
import Menu from 'components/Navigation/Menu.react';
import PageHeader from 'components/Page/PageHeader.react';

import {values} from 'lodash';

const {SIZE, USE} = require('constants/Bootstrap');

/**
 * BootstrapPage.react
 *
 * Displays React components
 */
var BootstrapPage = React.createClass({
  displayName: 'BootstrapPage',

  render: function() {
    var uses = values(USE);
    var sizes = values(SIZE);

    var buttonUses = uses.map((use) => {
      return (
        <Button bsStyle={use} key={use}>
          {use}
        </Button>
      );
    });

    var buttonSizes = sizes.map((size) => {
      return (
        <Button bsSize={size} key={size}>
          {size}
        </Button>
      );
    });

    var buttonGlyphs = sizes.map((size) => {
      return (
        <Button
          bsSize={size}
          key={size}>
          <Glyphicon glyph="comment" /> Comment
        </Button>
      );
    });

    var menu =
      <Menu align="right">
        <MenuItem header>
          First Header
        </MenuItem>
        <MenuItem onClick={() => { alert('You clicked the menu item!'); }}>
          Item 1 (Click me!)
        </MenuItem>
        <MenuItem>
          Item 2
        </MenuItem>
        <MenuItem divider />
        <MenuItem header>
          Second Header
        </MenuItem>
        <MenuItem>
          Item 3
        </MenuItem>
      </Menu>;

    return (
      <AppPage>
        <PageHeader title="Bootstrap Components" />

        <Panel header={<h3>Alert</h3>}>
          <Alert bsStyle="success">
            <strong>Well done!</strong> You successfully read this important
            alert message.
          </Alert>
          <Alert bsStyle="info">
            <strong>Heads up!</strong> This alert needs your attention, but
            it{"'"}s not super important.
          </Alert>
          <Alert bsStyle="warning">
            <strong>Warning!</strong> Better check yourself, you{"'"}re not
            looking too good.
          </Alert>
          <Alert bsStyle="danger">
            <strong>Oh snap!</strong> Change a few things up and try
            submitting again.
          </Alert>
          <Alert bsStyle="info" dismissible>
            <strong>Sweeeeeeet!</strong> You can dismiss this alert by
            pressing the button over here ---->
          </Alert>
        </Panel>

        <Panel header={<h3>Badge</h3>}>
          <Badge>101</Badge>
        </Panel>

        <Panel title="Button">
          <h5>Button Uses</h5>
          <div style={{margin: '5px 0 15px'}}>
            {buttonUses}
          </div>
          <h5>Button Sizes</h5>
          <div style={{margin: '5px 0 15px'}}>
            {buttonSizes}
          </div>
          <h5>Button Glyphs</h5>
          <div style={{margin: '5px 0 0 0'}}>
            {buttonGlyphs}
          </div>
        </Panel>

        <Panel header={<h3>Button Group</h3>}>
          <h5 style={{margin: '0 0 5px'}}>
            Standard Button Group
          </h5>
          <ButtonGroup size="large">
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
          </ButtonGroup>
          <h5 style={{margin: '15px 0 5px'}}>
            Justified Button Group
          </h5>
          <ButtonGroup justified>
            <Button href="#">Left</Button>
            <Button href="#">Middle</Button>
            <Button href="#">Right</Button>
          </ButtonGroup>
          <h5 style={{margin: '15px 0 5px'}}>
            Vertical Button Group
          </h5>
          <ButtonGroup vertical>
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </Panel>

        <Panel header={<h3>Glyphicon</h3>}>
          <Glyphicon glyph="heart" />
          <Glyphicon glyph="triangle-left" />
          <Glyphicon glyph="triangle-right" />
        </Panel>

        <Panel header={<h3>Label</h3>}>
          <h1>Example Heading <Label>New</Label></h1>
          <h2>Example Heading <Label>New</Label></h2>
          <h3>Example Heading <Label>New</Label></h3>
          <h4>Example Heading <Label>New</Label></h4>
          <h5>Example Heading <Label>New</Label></h5>
          <h6>Example Heading <Label>New</Label></h6>

          <Label use="default">Default</Label>
          {' '}
          <Label use="primary">Primary</Label>
          {' '}
          <Label use="success">Success</Label>
          {' '}
          <Label use="info">Info</Label>
          {' '}
          <Label use="warning">Warning</Label>
          {' '}
          <Label use="danger">Danger</Label>
        </Panel>

        <Panel header={<h3>ListGroup</h3>}>
          <ListGroup>
            <ListGroupItem>Standard List Item</ListGroupItem>
            <ListGroupItem href="#">Linked List Item</ListGroupItem>
            <ListGroupItem onClick={() => {alert('Clicked!');}}>
              List Item with onClick
            </ListGroupItem>
            <ListGroupItem>
              List Item with Badge <Badge>12</Badge>
            </ListGroupItem>
          </ListGroup>
          <ListGroup>
            <ListGroupItem type="success">Success</ListGroupItem>
            <ListGroupItem type="info">Info</ListGroupItem>
            <ListGroupItem type="warning">Warning</ListGroupItem>
            <ListGroupItem type="danger">Danger</ListGroupItem>
          </ListGroup>
          <ListGroup>
            <ListGroupItem active>Active</ListGroupItem>
            <ListGroupItem disabled>Disabled</ListGroupItem>
          </ListGroup>
        </Panel>

        <Panel header={<h3>Nav</h3>}>
          <h5 style={{margin: '0 0 10px 0'}}>Tabbed Nav</h5>
          <Nav>
            <NavItem active>Item 1</NavItem>
            <NavItem menu={menu}>Item 2</NavItem>
            <NavItem disabled>Item 3</NavItem>
          </Nav>

          <h5 style={{margin: '20px 0 10px 0'}}>Justified Tabbed Nav</h5>
          <Nav justified>
            <NavItem active>Item 1</NavItem>
            <NavItem menu={menu}>Item 2</NavItem>
            <NavItem disabled>Item 3</NavItem>
          </Nav>

          <h5 style={{margin: '20px 0 10px 0'}}>Pill Nav</h5>
          <Nav type="pills">
            <NavItem active>Item 1</NavItem>
            <NavItem menu={menu}>Item 2</NavItem>
            <NavItem disabled>Item 3</NavItem>
          </Nav>

          <h5 style={{margin: '20px 0 10px 0'}}>Stacked Nav</h5>
          <Nav type="pills" stacked>
            <NavItem active>Item 1</NavItem>
            <NavItem menu={menu}>Item 2</NavItem>
            <NavItem disabled>Item 3</NavItem>
          </Nav>
        </Panel>

        <Panel header={<h3>Navbar</h3>}>
          <Navbar fluid>
            <Navbar.Header>
              <Navbar.Brand>Brand</Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem active>Item 1</NavItem>
              <NavDropdown id="navbar-1" title="Item 2">{menu}</NavDropdown>
              <NavItem disabled>Item 3</NavItem>
            </Nav>
          </Navbar>
          <Navbar fluid inverse>
            <Navbar.Header>
              <Navbar.Brand>Brand</Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem active>Item 1</NavItem>
              <NavItem>Item 2</NavItem>
              <NavItem disabled>Item 3</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem active>Item 1</NavItem>
              <NavItem>Item 2</NavItem>
              <NavItem disabled>Item 3</NavItem>
            </Nav>
          </Navbar>
        </Panel>

        <Panel header={<h3>Panel</h3>}>
          <Panel header="This is the title" footer="This is the footer">
            This is the body
          </Panel>
        </Panel>

        <Panel header={<h3>Table</h3>}>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            {this._renderTableBody()}
          </Table>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            {this._renderTableBody()}
          </Table>
          <Table border>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            {this._renderTableBody()}
          </Table>
          <Table condensed>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            {this._renderTableBody()}
          </Table>
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            {this._renderTableBody()}
          </Table>
        </Panel>

      </AppPage>
    );
  },

  _renderTableBody: function() {
    return (
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    );
  },
});

module.exports = BootstrapPage;
