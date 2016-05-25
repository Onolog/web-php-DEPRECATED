var {isEmpty} = require('lodash');
var React = require('react');
var {Button, Panel} = require('react-bootstrap/lib');

var AppPage = require('components/Page/AppPage.react');
var Loader = require('components/Loader/Loader.react');
var PageHeader = require('components/Page/PageHeader.react');
var WorkoutFields = require('./WorkoutFields.react');
var WorkoutStore = require('flux/stores/WorkoutStore');

var getIdFromPath = require('utils/getIdFromPath');

/**
 * WorkoutAddEditPage.react
 *
 * Permalink page for adding new workouts or editing existing ones.
 */
var WorkoutAddEditPage = React.createClass({
  displayName: 'WorkoutAddEditPage',

  getInitialState() {
    return {
      isSaving: false,
    };
  },

  render() {
    const workout = WorkoutStore.getSingle(getIdFromPath());
    const isEditing = !isEmpty(workout);

    return (
      <AppPage>
        <PageHeader title={this._getTitle(isEditing)} />
        <Panel footer={this._renderFooter(isEditing)}>
          <form
            action={this._getFormAction(workout, isEditing)}
            method="POST"
            ref="form">
            <WorkoutFields workout={workout} />
          </form>
          {this.state.isSaving && <Loader background full />}
        </Panel>
      </AppPage>
    );
  },

  _getFormAction(workout, isEditing) {
    return isEditing ?
      `/workouts/edit/${workout.id}` :
      '/workouts/add';
  },

  _getTitle(isEditing) {
    return isEditing ? 'Edit Activity' : 'New Activity';
  },

  _renderFooter(isEditing) {
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
            {isEditing ? 'Update Activity' : 'Add Activity'}
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
