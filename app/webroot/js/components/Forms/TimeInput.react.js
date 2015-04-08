/**
 * TimeInput.react
 * @jsx React.DOM
 *
 * Group of 3 text inputs displaying hh:mm:ss.
 * Returns a time in seconds onChange.
 */
define([

  'lib/react/react',
  'utils/cakePHP',
  'lib/Moment/Moment',
  'lib/jquery/jquery.min'

], function(React, cakePHP) {

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
          <input
            type="text"
            name="hh"
            className="hh form-control"
            maxLength="2"
            placeholder="hh"
            ref="hh"
            defaultValue={this._getHoursValue(duration)}
            onChange={this._onChange}
          />
      		<span className="colon">:</span>
          <input
            type="text"
            name="mm"
            className="mm form-control"
            maxLength="2"
            placeholder="mm"
            ref="mm"
            defaultValue={duration && duration.minutes()}
            onChange={this._onChange}
          />
      		<span className="colon">:</span>
          <input
            type="text"
            name="ss"
            className="ss form-control"
            maxLength="2"
            placeholder="ss"
            ref="ss"
            defaultValue={duration && duration.seconds()}
            onChange={this._onChange}
          />
          <input
            value={this.state.duration}
            name={cakePHP.encodeFormFieldName('time', formName)}
            type="hidden"
          />
        </span>
      );
    },

    _onChange: function() {
      var duration = moment.duration({
        hours:   this.refs.hh.getDOMNode().value,
        minutes: this.refs.mm.getDOMNode().value,
        seconds: this.refs.ss.getDOMNode().value
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
