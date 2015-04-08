/**
 * GarminActivityList.react
 * @jsx React.DOM
 *
 * Scrollable and selectable table of Garmin activities
 */
define([

  'lib/react/react',
  'utils/GarminActivityUtils'

], function(React, GarminActivityUtils) {

  return React.createClass({

    propTypes: {
      activities: React.PropTypes.array.isRequired,
      onChange: React.PropTypes.func.isRequired,
      selectedActivities: React.PropTypes.array.isRequired
    },
  
    render: function() {
      return (
        <div className="table-responsive garminActivityList">
        	<table
            id="activityListingHeader"
            className="table table-condensed table-bordered">
        		<thead>
        		  <tr>
        		    <th className="activityCheck">
        		      <input
        		        type="checkbox"
        		        ref="checkAll"
        		        disabled={!this.props.activities.length}
        		        onChange={this._handleOnCheckAll}
        		      />
        		    </th>
                <th className="activityDate">
                  Date
                </th>
                <th className="activityDuration">
                  Duration
                </th>
        		  </tr>
            </thead>
          </table>
          <div className="activityListingWrapper">
          	<table
              id="activityListing"
              className="table table-condensed table-bordered table-striped">
              <tbody>
                {this._renderActivities()}
              </tbody>
            </table>
          </div>
        </div>
      );
    },

    _renderActivities: function() {
      var activities = this.props.activities;

      if (!activities || !activities.length) {
        // Render an empty state
        return (
          <tr>
            <td colSpan="3">No activities listed.</td>
          </tr>
        );
      }

      activities = activities.map(function(activity) {
        var activityName = GarminActivityUtils.getName(activity);
        return (
          <tr>
            <td className="activityCheck">
    		      <input
    		        type="checkbox"
    		        value={activityName}
    		        checked={this._isSelected(activityName)}
    		        onChange={this._handleOnCheck}
    		      />
            </td>
            <td className="activityDate">
              {GarminActivityUtils.getStartTime(activity)}
            </td>
            <td className="activityDuration">
              {GarminActivityUtils.getDuration(activity)}
            </td>
          </tr>
        )
      }.bind(this));

      return activities;
    },

    _isSelected: function(value) {
      return this.props.selectedActivities.indexOf(value) !== -1;
    },

    _handleOnCheckAll: function(data) {
      // If `checkAll` is unchecked, passing an empty array will clear all
      // the checkboxes.
      var selectedActivities = [];

      // If the checkAll box is checked, check all the boxes by adding
      // every activity to the `selectedActivities` array.
      if (data.target.checked) {
        this.props.activities.forEach(function(activity) {
          selectedActivities.push(GarminActivityUtils.getName(activity));
        }.bind(this));
      }

      this.props.onChange(selectedActivities);
    },

    _handleOnCheck: function(data) {
      var selectedActivities = this.props.selectedActivities;
      var value = data.target.value;

      if (data.target.checked) {
        // Add the activity to the list of selected activities
        selectedActivities.push(value);
      } else {
        // Remove activity from the list of selected activities
        var index = selectedActivities.indexOf(value);
        (index !== -1) && selectedActivities.splice(index, 1);
      }

      this.props.onChange(selectedActivities) ;
    }

  });

});
