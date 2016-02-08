var React = require('react');
var {Button, Panel} = require('react-bootstrap/lib');

var AppPage = require('components/Page/AppPage.react');
var Loader = require('components/Loader/Loader.react');
var PageHeader = require('components/Page/PageHeader.react');
var WorkoutFields = require('./WorkoutFields.react');

/**
 * WorkoutAddEditPage.react
 *
 * Permalink page for adding new workouts or editing existing ones.
 */
var WorkoutAddEditPage = React.createClass({
  displayName: 'WorkoutAddEditPage',

  getInitialState: function() {
    var {isEditing, workout} = window.app || {};
    return {
      isEditing: isEditing,
      isSaving: false,
      workout: workout,
    };
  },

  render: function() {
    return (
      <AppPage>
        <PageHeader title={this._getTitle()} />
        <Panel footer={this._renderFooter()}>
          <form action={this._getFormAction()} method="POST" ref="form">
            <WorkoutFields workout={this.state.workout} />
          </form>
          {this.state.isSaving && <Loader background full />}
        </Panel>
      </AppPage>
    );
  },

  _getFormAction: function() {
    var {isEditing, workout} = this.state;
    return isEditing ?
      `/workouts/edit/${workout.id}` :
      '/workouts/add';
  },

  _getTitle: function() {
    return this.state.isEditing ? 'Edit Activity' : 'New Activity';
  },

  _renderFooter: function() {
    var submitLabel =
      this.state.isEditing ? 'Update Activity' : 'Add Activity';

    return (
      <div className="clearfix">
        <div className="pull-right">
          <Button
            disabled={this.state.isSaving}
            onClick={this._onCancel}>
            Cancel
          </Button>
          <Button
            bsStyle="primary"
            disabled={this.state.isSaving}
            onClick={this._onSubmit}
            type="submit">
            {submitLabel}
          </Button>
        </div>
      </div>
    );
  },

  _onCancel: function() {
    document.location = '/';
  },

  _onSubmit: function() {
    this.setState({isSaving: true});

    // Submit the form via normal /add or /edit endpoints.
    this.refs.form.submit();
  },
});

module.exports = WorkoutAddEditPage;
