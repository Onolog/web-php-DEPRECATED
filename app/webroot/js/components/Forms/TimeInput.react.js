/**
 * TimeInput.react
 * @jsx React.DOM
 *
 * Group of 3 text inputs displaying hh:mm:ss.
 * Returns a time in seconds onChange.
 */
define([

  'lib/react/react',
  'lib/react/jsx!components/Forms/HiddenInput.react',
  'lib/react/jsx!components/Forms/TextInput.react',
  'utils/cakePHP',
  'lib/Moment/Moment'

], function(

  React,
  HiddenInput,
  TextInput,
  cakePHP,
  moment

) {

  return React.createClass({
    displayName: 'TimeInput',

    propTypes: {
      /**
       * The duration of the workout, in seconds.
       */
      duration: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
      ]),
      /**
       * Name of the form that is using the component.
       */
      formName: React.PropTypes.string.isRequired,
      onChange: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
      return {
        duration: this.props.duration
      };
    },

    render: function() {
      var formName = this.props.formName;
      var duration =
        this.props.duration &&
        moment.duration(+this.props.duration, 's');

      return (
        <span>
          <TextInput
            name="hh"
            maxLength="2"
            placeholder="hh"
            ref="hh"
            defaultValue={this._getHoursValue(duration)}
            onChange={this._onChange}
          />
      		<span className="colon">:</span>
          <TextInput
            name="mm"
            maxLength="2"
            placeholder="mm"
            ref="mm"
            defaultValue={duration && duration.minutes()}
            onChange={this._onChange}
          />
      		<span className="colon">:</span>
          <TextInput
            defaultValue={duration && duration.seconds()}
            maxLength="2"
            name="ss"
            placeholder="ss"
            ref="ss"
            onChange={this._onChange}
          />
          <HiddenInput
            name={cakePHP.encodeFormFieldName('time', formName)}
            value={this.state.duration}
          />
        </span>
      );
    },

    _onChange: function() {
      var duration = moment.duration({
        hours:   this.refs.hh.getValue(),
        minutes: this.refs.mm.getValue(),
        seconds: this.refs.ss.getValue()
      }).asSeconds();

      // Update state to set the hidden input.
      this.setState({ duration: duration });

      // Bubble a fake event to the parent component.
      this.props.onChange({
        target: {
          name: cakePHP.encodeFormFieldName('time', this.props.formName),
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
