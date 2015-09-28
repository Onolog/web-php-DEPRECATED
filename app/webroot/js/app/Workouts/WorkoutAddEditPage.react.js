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

module.exports = WorkoutAddEditPage;
