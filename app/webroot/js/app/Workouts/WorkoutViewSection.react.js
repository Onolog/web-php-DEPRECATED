/**
 * WorkoutViewSection.react
 * @jsx React.DOM
 *
 * Section for the workout view that provides standardized spacing and
 * header styling.
 */

define(['lib/react/react'], function(React) {

  return React.createClass({
    displayName: 'WorkoutViewSection',

    propTypes: {
      /**
       * An optional title for the section
       */
      title: React.PropTypes.string,
    },

    render: function() {
      return (
        <section className="workoutSection">
          {this._renderTitle()}
          {this.props.children}
        </section>
      );
    },

    _renderTitle: function() {
      if (this.props.title) {
        return (
          <h4 className="workoutSectionTitle">
            {this.props.title}
          </h4>
        );
      }
    }
  });

});
