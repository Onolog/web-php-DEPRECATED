/**
 * ReactPage.react
 * @jsx React.DOM
 *
 * Displays React components
 */
define([

  'lib/react/react',

  'lib/react/jsx!components/Alert/Alert.react',
  'lib/react/jsx!components/Badge/Badge.react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/Button/DropdownButton.react',
  'lib/react/jsx!components/ButtonGroup/ButtonGroup.react',
  'lib/react/jsx!components/Glyph/Glyph.react',
  'lib/react/jsx!components/Label/Label.react',
  'lib/react/jsx!components/ListGroup/ListGroup.react',
  'lib/react/jsx!components/ListGroup/ListGroupItem.react',
  'lib/react/jsx!components/Menu/Menu.react',
  'lib/react/jsx!components/Menu/MenuDivider.react',
  'lib/react/jsx!components/Menu/MenuHeader.react',
  'lib/react/jsx!components/Menu/MenuItem.react',
  'lib/react/jsx!components/Modal/Modal.react',
  'lib/react/jsx!components/Nav/Nav.react',
  'lib/react/jsx!components/Nav/NavItem.react',
  'lib/react/jsx!components/Page/AppPage.react',
  'lib/react/jsx!components/Page/PageHeader.react',
  'lib/react/jsx!components/Panel/Panel.react',
  'lib/react/jsx!components/Table/Table.react',

  'constants/Bootstrap',
  'lib/underscore/underscore'

], function(

  React,

  Alert,
  Badge,
  Button,
  DropdownButton,
  ButtonGroup,
  Glyph,
  Label,
  ListGroup,
  ListGroupItem,
  Menu,
  MenuDivider,
  MenuHeader,
  MenuItem,
  Modal,
  Nav,
  NavItem,
  AppPage,
  PageHeader,
  Panel,
  Table,

  BOOTSTRAP

) {

  var SIZE = BOOTSTRAP.SIZE; 
  var USE = BOOTSTRAP.USE;

  return React.createClass({
    displayName: 'BootstrapPage',

    render: function() {
      var uses = _.values(USE);
      var sizes = _.values(SIZE);

      var buttonUses = uses.map(function(use) {
        return (
          <Button
            key={use}
            label={use}
            use={use}
          />
        );
      });

      var buttonSizes = sizes.map(function(size) {
        return (
          <Button
            key={size}
            label={size}
            size={size}
          />
        );
      });

      var buttonGlyphs = sizes.map(function(size) {
        return (
          <Button
            key={size}
            glyph="comment"
            label="Comment"
            size={size}
          />
        );
      });

      var menu =
        <Menu align="right">
          <MenuHeader label="First Header" />
          <MenuItem
            label="Item 1 (Click me!)"
            onClick={function() {alert('You clicked the menu item!');}}
          />
          <MenuItem label="Item 2" />
          <MenuDivider />
          <MenuHeader label="Second Header" />
          <MenuItem label="Item 3" />
        </Menu>;

      return (
        <AppPage>
          <PageHeader title="Bootstrap Components" />

          <Panel title="Alerts">
            <Alert type="success">
              <strong>Well done!</strong> You successfully read this important alert message.
            </Alert>
            <Alert type="info">
              <strong>Heads up!</strong> This alert needs your attention, but it{"'"}s not super important.
            </Alert>
            <Alert type="warning">
              <strong>Warning!</strong> Better check yourself, you{"'"}re not looking too good.
            </Alert>
            <Alert type="danger">
              <strong>Oh snap!</strong> Change a few things up and try submitting again.
            </Alert>
            <Alert type="info" dismissible={true}>
              <strong>Sweeeeeeet!</strong> You can dismiss this alert by pressing the button over here ---->
            </Alert>
          </Panel>

          <Panel title="Badge">
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

          <Panel title="Button Group">
            <h5 style={{margin: '0 0 5px'}}>
              Standard Button Group
            </h5>
            <ButtonGroup size="large">
              <Button label="Left" />
              <Button label="Middle" />
              <Button label="Right" />
            </ButtonGroup>
            <h5 style={{margin: '15px 0 5px'}}>
              Justified Button Group
            </h5>
            <ButtonGroup justified={true}>
              <Button href="#" label="Left" />
              <Button href="#" label="Middle" />
              <Button href="#" label="Right" />
            </ButtonGroup>
            <h5 style={{margin: '15px 0 5px'}}>
              Vertical Button Group
            </h5>
            <ButtonGroup layout="vertical">
              <Button label="Left" />
              <Button label="Middle" />
              <Button label="Right" />
            </ButtonGroup>
          </Panel>

          <Panel title="Dropdown Button">
            <DropdownButton
              label="Open Me!"
              menu={menu}
            />
            <DropdownButton
              label="Split Button"
              menu={menu}
              split={true}
              use="danger"
            />
          </Panel>

          <Panel title="Glyph">
            <Glyph icon="heart" />
            <Glyph icon="triangle-left" />
            <Glyph icon="triangle-right" />
          </Panel>

          <Panel title="Label">
            <h1>Example Heading <Label>New</Label></h1>
            <h2>Example Heading <Label>New</Label></h2>
            <h3>Example Heading <Label>New</Label></h3>
            <h4>Example Heading <Label>New</Label></h4>
            <h5>Example Heading <Label>New</Label></h5>
            <h6>Example Heading <Label>New</Label></h6>

            <Label use="default">Default</Label>
            <Label use="primary">Primary</Label>
            <Label use="success">Success</Label>
            <Label use="info">Info</Label>
            <Label use="warning">Warning</Label>
            <Label use="danger">Danger</Label>
          </Panel>

          <Panel title="ListGroup">
            <ListGroup>
              <ListGroupItem>Standard List Item</ListGroupItem>
              <ListGroupItem href="#">Linked List Item</ListGroupItem>
              <ListGroupItem onClick={function() { alert('Clicked!')}}>
                List Item with onClick
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

          <Panel title="Nav">
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

          <Panel title="Panel">
            <Panel title="This is the title" footer="This is the footer">
              This is the body
            </Panel>
          </Panel>

          <Panel title="Table">
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
    }
  });

});
