/**
 * WorkoutAddEditPage.react
 * @jsx React.DOM
 *
 * Permalink page for adding new workouts or editing existing ones.
 */

define([

  'lib/react/react',
  'lib/react/jsx!app/Workouts/WorkoutFields.react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/LeftRight/LeftRight.react',
  'lib/react/jsx!components/Loader/Loader.react',
  'lib/react/jsx!components/Page/PageHeader.react',
  'lib/react/jsx!components/Panel/Panel.react',
  'utils/cx',
  'utils/dateToUnixTime'

], function(

  React,
  WorkoutFields,
  Button,
  LeftRight,
  Loader,
  PageHeader,
  Panel,
  cx,
  dateToUnixTime

) {

  return React.createClass({
    displayName: 'WorkoutAddEditPage',

    propTypes: {
      isEditing: React.PropTypes.bool,
      /**
       * If editing, the existing workout object
       */
      workout: React.PropTypes.object
    },

    getDefaultProps: function() {
      return {
        isEditing: false
      };
    },

    getInitialState: function() {
      return {
        isSaving: false
      };
    },

    render: function() {
      return (
        <div>
          <PageHeader title={this._getTitle()} />
          <Panel footer={this._renderFooter()}>
            <form action={this._getFormAction()} method="POST" ref="form">
              <WorkoutFields workout={this.props.workout} />
            </form>
            <Loader
              background={true}
              className={cx({
                'hidden': !this.state.isSaving
              })}
              full={true}
            />
          </Panel>
        </div>
      );
    },

    _getFormAction: function() {
      var isEditing = this.props.isEditing;
      var workout = this.props.workout;
      return [
        '/workouts',
        isEditing ? 'edit' : 'add',
        isEditing ? workout.id : ''
      ].join('/');
    },

    _getTitle: function() {
      return this.props.isEditing ? 'Edit Activity' : 'New Activity';
    },

    _renderFooter: function() {
      var submitLabel =
        this.props.isEditing ? 'Update Activity' : 'Add Activity';

      return (
        <div className="pull-right">
          <Button
            disabled={this.state.isSaving}
            label="Cancel"
            onClick={this._onCancel}
          />
          <Button
            disabled={this.state.isSaving}
            label={submitLabel}
            onClick={this._onSubmit}
            type="submit"
            use="primary"
          />
        </div>
      );
    },

    _onCancel: function() {
      document.location = '/';
    },

    _onSubmit: function() {
      this.setState({isSaving: true});

      // Submit the form via normal /add or /edit endpoints.
      this.refs.form.getDOMNode().submit();
    }

  });

});
