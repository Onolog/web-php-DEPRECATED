var React = require('react');

var AppPage = require('../../components/Page/AppPage.react');
var Button = require('../../components/Button/Button.react');
var LeftRight = require('../../components/LeftRight/LeftRight.react');
var Loader = require('../../components/Loader/Loader.react');
var PageHeader = require('../../components/Page/PageHeader.react');
var Panel = require('../../components/Panel/Panel.react');
var WorkoutFields = require('./WorkoutFields.react');

var cx = require('classnames');
var dateToUnixTime = require('../../utils/dateToUnixTime');

/**
 * WorkoutAddEditPage.react
 * @jsx React.DOM
 *
 * Permalink page for adding new workouts or editing existing ones.
 */
var WorkoutAddEditPage = React.createClass({
  displayName: 'WorkoutAddEditPage',

  getInitialState: function() {
    var {isEditing, workout} = window.app ? window.app : {};
    return {
      isEditing: isEditing,
      isSaving: false,
      workout: workout
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
          <Loader
            background={true}
            className={cx({
              'hidden': !this.state.isSaving
            })}
            full={true}
          />
        </Panel>
      </AppPage>
    );
  },

  _getFormAction: function() {
    var {isEditing, workout} = this.state;
    return [
      '/workouts',
      isEditing ? 'edit' : 'add',
      isEditing ? workout.id : ''
    ].join('/');
  },

  _getTitle: function() {
    return this.state.isEditing ? 'Edit Activity' : 'New Activity';
  },

  _renderFooter: function() {
    var submitLabel =
      this.state.isEditing ? 'Update Activity' : 'Add Activity';

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

module.exports = WorkoutAddEditPage;
