/**
 * WorkoutFields.react
 * @jsx React.DOM
 *
 * Displays a form with inputs for adding or editing a workout
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Datepicker/Datepicker.react',
  'lib/react/jsx!components/Forms/FormGroup.react',
  'lib/react/jsx!components/Forms/HiddenInput.react',
  'lib/react/jsx!components/Forms/Textarea.react',
  'lib/react/jsx!components/Forms/TextInput.react',
  'lib/react/jsx!components/Forms/TimeInput.react',
  'lib/react/jsx!components/Select/Select.react',
  'lib/react/jsx!components/Tokenizer/FriendTokenizer.react',

  'actions/WorkoutActions',
  'constants/ActionTypes',
  'constants/Workouts',
  'stores/WorkoutStore',
  'utils/cakePHP',
  'utils/calculatePace',
  'utils/unixTimeToDate'

], function(

  React,
  Datepicker,
  FormGroup,
  HiddenInput,
  Textarea,
  TextInput,
  TimeInput,
  Select,
  FriendTokenizer,
  WorkoutActions,
  ActionTypes,
  WorkoutConstants,
  WorkoutStore,
  cakePHP,
  calculatePace,
  unixTimeToDate

) {

  var FORM_NAME = WorkoutConstants.FORM_NAME;

  return React.createClass({
    displayName: 'WorkoutFields',

    propTypes: {
      /**
       * Unix timestamp (seconds).
       *
       * Note: A date is required for the "add" action.
       */
      date: React.PropTypes.number,
      /**
       * The selected shoe in an existing workout, if one has been selected.
       */
      selectedShoe: React.PropTypes.number,
      /**
       * An array of all the user's shoes
       */
      shoes: React.PropTypes.array,
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
        shoes: [],
        workout: {}
      };
    },

    componentWillMount: function() {
      // Keep a copy of the workout in the store for modification.
      WorkoutActions.initWorkout(this.props.workout);

      this.setState({
        pace: this._getPace()
      });
    },

    componentDidMount: function() {
      // Auto-focus the first field
      this.refs.distance.focus();
    },

    render: function() {
      // Existing workout data
      var workout = WorkoutStore.getWorkout();
      var date = (workout && workout.date) || this.props.date;

      return (
        <div className="form-horizontal workoutForm">
          <HiddenInput
            name={cakePHP.encodeFormFieldName('date', FORM_NAME)}
            value={date}
          />
          <FormGroup label="Distance">
            <TextInput
              className="distance"
              defaultValue={workout && workout.distance}
              name={cakePHP.encodeFormFieldName('distance', FORM_NAME)}
              onChange={this._onUpdate}
              ref="distance"
            />
            <span className="colon">miles</span>
          </FormGroup>

          <FormGroup label="Time" className="time">
            <div className="time">
              <TimeInput
                duration={workout && workout.time}
                formName={FORM_NAME}
                onChange={this._onUpdate}
              />
          		<span id="pace" className="colon">
          		  <span>{this.state.pace}</span> per mile
          		</span>
        		</div>
        	</FormGroup>

          <FormGroup label="Date">
            <Datepicker
              initialDate={unixTimeToDate(date)}
              name={cakePHP.encodeFormFieldName('date', FORM_NAME)}
              onChange={this._onUpdate}
            />
          </FormGroup>

          <FormGroup label="Avg. Heart Rate">
            <TextInput
              className="distance"
              defaultValue={workout && workout.avg_hr}
              maxLength="3"
              name={cakePHP.encodeFormFieldName('avg_hr', FORM_NAME)}
              onChange={this._onUpdate}
            />
            <span className="colon">bpm</span>
          </FormGroup>

          <FormGroup label="Shoes">
            <Select
              name={cakePHP.encodeFormFieldName('shoe_id', FORM_NAME)}
              className="form-control"
              onChange={this._onUpdate}
              defaultLabel="Select a shoe:"
              defaultValue={this._getSelectedShoe()}
              options={this.props.shoes}
            />
          </FormGroup>

          <FormGroup label="Friends">
            <FriendTokenizer
              prePopulate={workout && workout.friends}
              name={cakePHP.encodeFormFieldName('friends', FORM_NAME)}
              onChange={this._onUpdate}
            />
          </FormGroup>

          <FormGroup label="Notes">
            <Textarea
              className="notes"
              defaultValue={workout && workout.notes}
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

    _getPace: function() /*string*/ {
      var workout = WorkoutStore.getWorkout();
      return calculatePace.fromSeconds(
        (workout && workout.distance) || 0,
        (workout && workout.time) || 0
      );
    },

    _getSelectedShoe: function() {
      var workout = WorkoutStore.getWorkout();
      return (
        (workout && workout.shoe_id) ||
        this.props.selectedShoe ||
        0
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
