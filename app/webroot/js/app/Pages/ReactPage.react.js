/**
 * ReactPage.react
 * @jsx React.DOM
 *
 * Displays React components
 */
define([

  'lib/react/react',

  'lib/react/jsx!app/Activities/Activity.react',
  'lib/react/jsx!app/Workouts/WorkoutFields.react',


  'lib/react/jsx!components/Alert/Alert.react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/Button/DropdownButton.react',
  'lib/react/jsx!components/ButtonGroup/ButtonGroup.react',
  'lib/react/jsx!components/Calendar/Calendar.react',
  'lib/react/jsx!components/DateTimePicker/DateTimePicker.react',
  'lib/react/jsx!components/Facebook/FBFriendTokenizer.react',
  'lib/react/jsx!components/Glyph/Glyph.react',
  'lib/react/jsx!components/Graph/BarGraph/BarGraph.react',
  'lib/react/jsx!components/LeftRight/LeftRight.react',
  'lib/react/jsx!components/Menu/Menu.react',
  'lib/react/jsx!components/Menu/MenuDivider.react',
  'lib/react/jsx!components/Menu/MenuHeader.react',
  'lib/react/jsx!components/Menu/MenuItem.react',
  'lib/react/jsx!components/Modal/Modal.react',
  'lib/react/jsx!components/Page/PageHeader.react',
  'lib/react/jsx!components/Panel/Panel.react',

  'constants/TestData',
  'utils/cloneDate',
  'utils/DateTimeUtils',

  'lib/bootstrap.min'

], function(

  React,

  Activity,
  WorkoutFields,

  // Components
  Alert,
  Button,
  DropdownButton,
  ButtonGroup,
  Calendar,
  DateTimePicker,
  FBFriendTokenizer,
  Glyph,
  Graph,
  LeftRight,
  Menu,
  MenuDivider,
  MenuHeader,
  MenuItem,
  Modal,
  PageHeader,
  Panel,

  DATA,
  cloneDate,
  DateTimeUtils

) {

  return React.createClass({
    displayName: 'ReactPage',

    getInitialState: function() {
      return {
        calendarDate: new Date(),
        datePickerDate: new Date(),
        workouts: DATA.WORKOUTS
      };
    },

    componentDidMount: function() {
      $('.popover-dismiss').popover({
        title: 'Popover title',
        content: 'And here\'s some amazing content. It\'s very engaging. Right?'
      });
    },

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
          <PageHeader title="React Component Examples" />
          <Panel title="Glyph">
            <Glyph icon="heart" />
            <Glyph icon="triangle-left" />
            <Glyph icon="triangle-right" />
          </Panel>
          <Panel title="Date and Time Picker">
            <DateTimePicker
              initialDate={this.state.datePickerDate}
              onChange={function(date) {
                this.setState({datePickerDate: date});
              }.bind(this)}
            />
            <div style={{marginTop: '10px'}}>
              {this.state.datePickerDate.toISOString()}
            </div>
          </Panel>
          <Panel title="Dropdown Button">
            <DropdownButton
              label="Open Me!"
              menu={
                <Menu>
                  <MenuItem
                    label="Alert"
                    onClick={function() {
                      alert('You clicked the menu item!');
                    }}
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
          <Panel title="Calendar">
            <LeftRight style={{'marginBottom': '10px'}}>
              <h3>
                {DateTimeUtils.formatDate(
                  this.state.calendarDate,
                  'MMMM YYYY'
                )}
              </h3>
              <ButtonGroup>
                <Button
            	    glyph="triangle-left"
                  tooltip={{
                    title: 'Last month'
                  }}
                  onClick={this.onLastMonthClick}
                />
                <Button
            	    glyph="stop"
                  tooltip={{
                    title: 'This month'
                  }}
                  onClick={this.onThisMonthClick}
                />
                <Button
            	    glyph="triangle-right"
                  tooltip={{
                    title: 'Next month'
                  }}
                  onClick={this.onNextMonthClick}
                />
              </ButtonGroup>
            </LeftRight>
            <Calendar date={this.state.calendarDate} />
          </Panel>
          <Panel title="Buttons">
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
          <Panel title="Button Groups">
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
          <Panel title="Modal">
            <Button
              label="Click for Modal"
              href="/ajax/workouts/add"
              data-toggle="modal"
              data-target="#myModal"
            />
            <Modal
              id="myModal"
              title="This is the modal title"
              footer={[
                <Button
                  label="Close"
                  onClick={this.toggleModal}                  
                />
              ]}>
              These are the modal contents
            </Modal>
          </Panel>
          <Panel title="Popover">
            <Button
              label="Click for Popover"
              className="popover-dismiss"
            />
          </Panel>
          <Panel title="Panel">
            <Panel title="This is the title" footer="This is the footer">
              This is the body
            </Panel>
          </Panel>
          <Panel title="Friend Typeahead">
            <h4 style={{margin: '0 0 5px'}}>Initially Empty</h4>
            <FBFriendTokenizer />
            <h4 style={{margin: '15px 0 5px'}}>Pre-Populated</h4>
            <FBFriendTokenizer
              prePopulate={DATA.FRIENDS}
            />
          </Panel>
          <Panel title="Workout Fields">
            <WorkoutFields
              action="add"
              shoes={DATA.SHOES}
              workout={DATA.WORKOUTS['2014']['10']['21'][1]}
            />
          </Panel>
          <Panel title="Activity">
            <Activity activity={DATA.WORKOUTS['2014']['10']['21'][1]} />
          </Panel>
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

          <Panel title="Graph">
            Need to add
          </Panel>
        </div>
      );
    },

    toggleModal: function() {
      $('#myModal').modal('toggle');
    },

    onLastMonthClick: function() {
      var date = cloneDate(this.state.calendarDate);
      date.setMonth(date.getMonth() - 1);
      this.setState({calendarDate: date});
    },

    onThisMonthClick: function() {
      this.setState({calendarDate: new Date()});
    },

    onNextMonthClick: function() {
      var date = cloneDate(this.state.calendarDate);
      date.setMonth(date.getMonth() + 1);
      this.setState({calendarDate: date});
    },

    _onWorkoutsUpdate: function(workouts) {
      this.setState({ workouts: workouts });
    }
  });

});
