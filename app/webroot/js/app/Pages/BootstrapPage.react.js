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
  'lib/react/jsx!components/ListGroup/ListGroup.react',
  'lib/react/jsx!components/ListGroup/ListGroupItem.react',
  'lib/react/jsx!components/Menu/Menu.react',
  'lib/react/jsx!components/Menu/MenuDivider.react',
  'lib/react/jsx!components/Menu/MenuHeader.react',
  'lib/react/jsx!components/Menu/MenuItem.react',
  'lib/react/jsx!components/Modal/Modal.react',
  'lib/react/jsx!components/Page/PageHeader.react',
  'lib/react/jsx!components/Panel/Panel.react'

], function(

  React,

  Alert,
  Badge,
  Button,
  DropdownButton,
  ButtonGroup,
  Glyph,
  ListGroup,
  ListGroupItem,
  Menu,
  MenuDivider,
  MenuHeader,
  MenuItem,
  Modal,
  PageHeader,
  Panel

) {

  return React.createClass({
    displayName: 'BootstrapPage',

    render: function() {
      var uses = [
        'default',
        'primary',
        'success',
        'info',
        'warning',
        'danger',
        'link'
      ];

      var sizes = [
        'large',
        'default',
        'small',
        'xsmall'
      ];

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

      return (
        <div>
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
            <h4>Button Uses</h4>
            <div style={{margin: '5px 0 15px'}}>
              {buttonUses}
            </div>
            <h4>Button Sizes</h4>
            <div style={{margin: '5px 0 15px'}}>
              {buttonSizes}
            </div>
            <h4>Button Glyphs</h4>
            <div style={{margin: '5px 0 0 0'}}>
              {buttonGlyphs}
            </div>
          </Panel>

          <Panel title="Button Group">
            <h4 style={{margin: '0 0 5px'}}>
              Standard Button Group
            </h4>
            <ButtonGroup size="large">
              <Button label="Left" />
              <Button label="Middle" />
              <Button label="Right" />
            </ButtonGroup>
            <h4 style={{margin: '15px 0 5px'}}>
              Justified Button Group
            </h4>
            <ButtonGroup justified={true}>
              <Button href="#" label="Left" />
              <Button href="#" label="Middle" />
              <Button href="#" label="Right" />
            </ButtonGroup>
            <h4 style={{margin: '15px 0 5px'}}>
              Vertical Button Group
            </h4>
            <ButtonGroup layout="vertical">
              <Button label="Left" />
              <Button label="Middle" />
              <Button label="Right" />
            </ButtonGroup>
          </Panel>

          <Panel title="Dropdown Button">
            <DropdownButton
              label="Open Me!"
              menu={
                <Menu>
                  <MenuItem
                    label="Alert"
                    onClick={function() {alert('You clicked the menu item!');}}
                  />
                  <MenuItem label="Item 2" />
                  <MenuDivider />
                  <MenuItem label="Item 3" />
                </Menu>
              }
            />
            <DropdownButton
              label="Split Button"
              menu={
                <Menu align="right">
                  <MenuHeader label="First Header" />
                  <MenuItem label="Item 1" />
                  <MenuItem label="Item 2" />
                  <MenuDivider />
                  <MenuHeader label="Second Header" />
                  <MenuItem label="Item 3" />
                </Menu>
              }
              split={true}
              use="danger"
            />
          </Panel>

          <Panel title="Glyph">
            <Glyph icon="heart" />
            <Glyph icon="triangle-left" />
            <Glyph icon="triangle-right" />
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

          <Panel title="Panel">
            <Panel title="This is the title" footer="This is the footer">
              This is the body
            </Panel>
          </Panel>

        </div>
      );
    }
  });

});
