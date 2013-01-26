/**
 * Calendar.js
 *
 * JS associated with the calendar view
 */

var Calendar = function() {
  this.init();
};

Calendar.prototype = {

  init: function() {
    // Add a new workout when user clicks on the add button
    $('#calendar table a.add').click(function(link) {
      this._addWorkout(link.currentTarget);
    }.bind(this));

    // View an existing workout
    $('#calendar table a.workout').click(function(link) {
      this._viewWorkout(link.currentTarget);
    }.bind(this));

    // Select a new month/year for the view
    $('#cal_submit').click(function() {
      this._selectDate({
        month: $('#m').val(),
        year: $('#y').val()
      });
    }.bind(this));

    return this;
  },

  /**
   * Assigns an onclick event to calendar cell,
   * redirecting to /workouts/add/{date}
   *
   * TODO: Make this work when calendar loads via async
   */
  _addWorkout: function(day) {
    /*
    $.ajax({
      url: '/ajax/workouts/add/',
      type: 'get',
      data: day.id,
      dataType: 'json',
      beforeSend: function() {
        $('#workoutModal')
          .empty()
          .addClass('loader_big')
          .modal('show');
      },
      success: function(data) {
        $('#workoutModal')
          .removeClass('loader_big')
          .html(data.html);
      }
    });
    */
    document.location = '/workouts/add/' + day.id;
  },

  /**
   * Assigns an onclick event to calendar cell,
   * redirecting to /workouts/view/{date}
   *
   * TODO: Make this work when calendar loads via async
   */
  _viewWorkout: function(workout) {
    /*
    $.ajax({
      url: '/ajax/workouts/view/',
      type: 'get',
      data: workout.id,
      dataType: 'json',
      beforeSend: function() {
        $('#workoutModal')
          .empty()
          .addClass('loader_big')
          .modal('show');
      },
      success: function(data) {
        $('#workoutModal')
          .removeClass('loader_big')
          .html(data.html);
      }
    });
    */
  },

  /**
   * Ajax call for retrieving calendar/workout information from different
   * months and years
   */
  _selectDate: function(data) {
    $.ajax({
      url: '/lib/ajax/show_calendar.php',
      type: 'get',
      data: data,
      dataType: 'json',
      beforeSend: this._toggleLoader('#calendar', true),
      success: this._renderCalendar(data),
    });
  },

  /**
   * Handler function for selectDate()
   * Returns month/year values and HTML for rendering calendar + data
   */
  _renderCalendar: function(data) {
    this._toggleLoader('#calendar', true);

    $('span.month').html(data.month);
    $('span.year').html(data.year);
    $('#calendar').html(data.html);

    return true;
  },

  /**
   * Onclick, sets the class of the selected <li> to 'selected'
   */
  toggleSidebar: function(filter) {
  
    // Deselect all the filters
    $('#filters li').removeClass('selected');
  
    // Select the desired filter
    $(filter).addClass('selected');
  
    switch (filter.id) {
      case 'shoes':
        var endpoint = '/ajax/users/shoes/';
        break;
      case 'friends':
        var endpoint = '/ajax/users/friends/';
        break;
      case 'mileage':
      default:
        var endpoint = '/ajax/users/miles/';
        break;
    }
  
    $.ajax({
      url: endpoint,
      type: 'post',
      dataType: 'json',
      beforeSend: function() {
        $('#sidebar_content')
          .empty()
          .addClass('loader_big');
      },
      success: function(data) {
        $('#sidebar_content')
          .removeClass('loader_big')
          .html(data.html);
      }
    });
  },

  _toggleLoader: function(element, big) {
    var className = (big ? 'ajax_load_big' : 'ajax_load_small');
    var el = $(element);
  
    if (el.hasClass(className)) {
      el.removeClass(className);
    } else {
      el.empty();
      el.addClass(className);
    }
  }

};
