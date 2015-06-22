/**
 * WorkoutFields.react
 * @jsx React.DOM
 *
 * Displays a form with inputs for adding or editing a workout
 */
define([

  'lib/react/react',
  'lib/react/jsx!app/Workouts/ShoeSelector.react',
  'lib/react/jsx!components/DateTimePicker/DateTimePicker.react',
  'lib/react/jsx!components/Forms/FormGroup.react',
  'lib/react/jsx!components/Forms/HiddenInput.react',
  'lib/react/jsx!components/Forms/Textarea.react',
  'lib/react/jsx!components/Forms/TextInput.react',
  'lib/react/jsx!components/Forms/TimeInput.react',
  'lib/react/jsx!components/Facebook/FBFriendTokenizer.react',

  'actions/WorkoutActions',
  'constants/ActionTypes',
  'constants/Workouts',
  'stores/WorkoutStore',
  'utils/cakePHP',
  'utils/calculatePace',
  'utils/dateToUnixTime',
  'utils/unixTimeToDate'

], function(

  React,
  ShoeSelector,
  DateTimePicker,
  FormGroup,
  HiddenInput,
  Textarea,
  TextInput,
  TimeInput,
  FBFriendTokenizer,
  WorkoutActions,
  ActionTypes,
  WorkoutConstants,
  WorkoutStore,
  cakePHP,
  calculatePace,
  dateToUnixTime,
  unixTimeToDate

) {

  var FORM_NAME = WorkoutConstants.FORM_NAME;

  return React.createClass({
    displayName: 'WorkoutFields',

    propTypes: {
      /**
       * Unix timestamp (seconds)
       */
      date: React.PropTypes.number,
      /**
       * Whether or not to validate the data
       */
      validate: React.PropTypes.bool,
      /**
       * Existing workout object.
       *
       * Should be kept in the store only, and not used directly in the
       * component.
       */
      workout: React.PropTypes.object
    },

    getDefaultProps: function() {
      return {
        workout: {}
      };
    },

    componentWillMount: function() {
      // Initialize the workout data in the store
      // FIXME: This defaults the time for new workouts to be 12:00AM
      var workout = this.props.workout;
      if (!workout.date && this.props.date) {
        workout.date = this.props.date;
      }
      WorkoutActions.initWorkout(workout);

      this.setState({
        pace: this._getPace()
      });
    },

    componentDidMount: function() {
      // Auto-focus the first field
      this.refs.distance.focus();
    },

    render: function() {
      var workout = WorkoutStore.getWorkout();
      var date = workout.date || this.props.date;

      return (
        <div className="form-horizontal workoutForm">
          <HiddenInput
            name={cakePHP.encodeFormFieldName('user_id', FORM_NAME)}
            value={workout.user_id}
          />
          <FormGroup label="Distance">
            <TextInput
              className="distance"
              defaultValue={workout.distance}
              name={cakePHP.encodeFormFieldName('distance', FORM_NAME)}
              onChange={this._onUpdate}
              ref="distance"
            />
            <span className="colon">miles</span>
          </FormGroup>

          <FormGroup label="Time" className="time">
            <div className="time">
              <TimeInput
                duration={workout.time}
                formName={FORM_NAME}
                onChange={this._onUpdate}
              />
          		<span id="pace" className="colon">
          		  <span>{this.state.pace}</span> per mile
          		</span>
        		</div>
        	</FormGroup>

          <FormGroup label="Date">
            <DateTimePicker
              initialDate={unixTimeToDate(date)}
              name={cakePHP.encodeFormFieldName('date', FORM_NAME)}
              onChange={this._onDateUpdate}
            />
          </FormGroup>

          <FormGroup label="Avg. Heart Rate">
            <TextInput
              className="distance"
              defaultValue={workout.avg_hr}
              maxLength={3}
              name={cakePHP.encodeFormFieldName('avg_hr', FORM_NAME)}
              onChange={this._onUpdate}
            />
            <span className="colon">bpm</span>
          </FormGroup>

          <FormGroup label="Shoes">
            <ShoeSelector
              defaultValue={workout.shoe_id}
              name={cakePHP.encodeFormFieldName('shoe_id', FORM_NAME)}
              onChange={this._onUpdate}
            />
          </FormGroup>

          <FormGroup label="Friends">
            <FBFriendTokenizer
              friends={workout.friends}
              name={cakePHP.encodeFormFieldName('friends', FORM_NAME)}
              onChange={this._onUpdate}
            />
          </FormGroup>

          <FormGroup label="Notes">
            <Textarea
              className="notes"
              defaultValue={workout.notes}
              name={cakePHP.encodeFormFieldName('notes', FORM_NAME)}
              onChange={this._onUpdate}
              placeholder="Add some details about your activity..."
              rows="6"
            />
          </FormGroup>
        </div>
      );
    },

    _onUpdate: function(event) {
      // Get the actual name of the fields
      var field = cakePHP.decodeFormFieldName(event.target.name);
      var value = event.target.value;

      WorkoutActions.update(field, value);

      this.setState({ pace: this._getPace() });
    },

    _onDateUpdate: function(/*Date*/ date) {
      this._onUpdate({
        target: {
          name: cakePHP.encodeFormFieldName('date', FORM_NAME),
          value: dateToUnixTime(date)
        }
      });
    },

    _getPace: function() /*string*/ {
      var workout = WorkoutStore.getWorkout();
      return calculatePace.fromSeconds(
        (workout && workout.distance) || 0,
        (workout && workout.time) || 0
      );
    },

    // TODO: Finish this. Should each individual form field have its own validation?
    _validateForm: function() {
      var error;
      var workout = WorkoutStore.getWorkout();

      if (!workout.distance && !workout.time) {
        error = 'The distance and time fields can\'t both be blank.';
      }

      // Validate this onBlur?
      if (isNAN(workout.distance)) {
        error = 'Please enter a valid distance.';
      }

      if (isNAN(workout.time)) {
        error = 'Please enter a valid time.'
      }
    }

  });

});
