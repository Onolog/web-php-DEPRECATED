define([

  'lib/react/react',
  'lib/react/jsx!components/Forms/ConstrainedTextInput.react',
  'lib/react/jsx!components/Forms/HiddenInput.react',
  'lib/react/jsx!components/Forms/TextInput.react',
  'utils/joinClasses',
  'utils/pad',
  'lib/Moment/Moment',
  'lib/underscore/underscore'

], function(

  React,
  ConstrainedTextInput,
  HiddenInput,
  TextInput,
  joinClasses,
  pad,
  moment

) {

  function formatter(value) {
    return pad(value, 2);
  }

  /**
   * DurationInput.react
   * @jsx React.DOM
   *
   * Input for specifying and displaying the duration of an activity, formatted
   * as `hh:mm:ss`.
   */
  return React.createClass({
    displayName: 'DurationInput',

    propTypes: {
      /**
       * The duration of the workout, in seconds.
       */
      duration: React.PropTypes.number,
      /**
       * Name of the form that is using the component.
       */
      name: React.PropTypes.string.isRequired,
      onChange: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
      return {
        duration: this.props.duration
      };
    },

    render: function() {
      var duration = this.props.duration || 0;
      duration = moment.duration(duration, 's');

      return (
        <div className={joinClasses('form-control', this.props.className)}>
          <ConstrainedTextInput
            defaultValue={this._getHoursValue(duration)}
            maxLength={2}
            onChange={this._onChange}
            placeholder="hh"
            ref="hours"
            values={_.range(0, 100)}
          />
          :
          <ConstrainedTextInput
            defaultValue={duration.minutes()}
            format={formatter}
            maxLength={2}
            onChange={this._onChange}
            placeholder="mm"
            ref="minutes"
            values={_.range(0, 60)}
          />
          :
          <ConstrainedTextInput
            defaultValue={duration.seconds()}
            format={formatter}
            maxLength={2}
            onChange={this._onChange}
            placeholder="ss"
            ref="seconds"
            values={_.range(0, 60)}
          />
          <HiddenInput
            name={this.props.name}
            value={this.state.duration}
          />
        </div>
      );
    },

    _onChange: function() {
      var duration = moment.duration({
        hours:   this.refs.hours.getValue(),
        minutes: this.refs.minutes.getValue(),
        seconds: this.refs.seconds.getValue()
      }).asSeconds();

      // Update state to set the hidden input.
      this.setState({ duration: duration });

      // Bubble a fake event to the parent component.
      this.props.onChange({
        target: {
          name: this.props.name,
          value: duration
        }
      });
    },

    _getHoursValue: function(/*object*/ duration) /*?number*/ {
      if (duration) {
        return duration.days() * 24 + duration.hours();
      }
    },
  });

});
