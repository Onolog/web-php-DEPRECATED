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

  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/ButtonGroup/ButtonGroup.react',
  'lib/react/jsx!components/Calendar/Calendar.react',
  'lib/react/jsx!components/DateTimePicker/DateTimePicker.react',
  'lib/react/jsx!components/Facebook/FBFriendTokenizer.react',
  'lib/react/jsx!components/Graph/BarGraph/BarGraph.react',
  'lib/react/jsx!components/LeftRight/LeftRight.react',
  'lib/react/jsx!components/Page/PageHeader.react',
  'lib/react/jsx!components/Panel/Panel.react',

  'constants/TestData',
  'utils/cloneDate',
  'utils/DateTimeUtils'

], function(

  React,

  Activity,
  WorkoutFields,

  Button,
  ButtonGroup,
  Calendar,
  DateTimePicker,
  FBFriendTokenizer,
  Graph,
  LeftRight,
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

    render: function() {

      return (
        <div>
          <PageHeader title="React Component Examples" />

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

          <Panel title="Graph">
            Need to add
          </Panel>
        </div>
      );
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
