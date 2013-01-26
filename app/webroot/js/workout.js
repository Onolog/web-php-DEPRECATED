/**
 * workout.js
 */

// Calculates the pace per mile/km
function calculate_pace() {

  var distance    = $('.distance').val();
  var hours       = $('.hh').val();
  var minutes     = $('.mm').val();
  var seconds     = $('.ss').val();

  // Convert everything to a number
  distance  = parseFloat(distance);

  // If there is no value entered, set it to zero. Otherwise, remove leading
  // zeroes and convert to an integer.
  hours     = (isNaN(hours)   ? 0 : parseInt(hours*1) );
  minutes   = (isNaN(minutes) ? 0 : parseInt(minutes*1) );
  seconds   = (isNaN(seconds) ? 0 : parseInt(seconds*1) );

  if (!distance || distance == 0 || (hours + minutes + seconds) == 0) {

    // If distance hasn't been entered or has a value of zero, the calculation
    // will come back invalid. Likewise, if all three of the time values are
    // zero, the result will be invalid.
    // In any of these cases just return 0:00 as the pace.
    var pace = '0:00';

  } else {
    // Convert the time to seconds
    minutes = (hours*60) + minutes + (seconds/60);

    // Find the pace in minutes and force/round to 5 decimals
    // For example: 7.56288 or 6.75000
    var pace = (minutes/distance).toFixed(5);

    // Convert to a string to parse and split it
    pace = pace.toString();

    // Split the whole minutes from the fraction
    var pace_arr = pace.split('.');

    // Convert from fractions of a minute to seconds and round to the nearest
    // whole second
    seconds = Math.round(('.' + pace_arr[1])*60);

    // If there are less than 10 seconds, add a leading zero
    seconds = (seconds < 10 ? '0' + seconds : seconds);
    minutes = parseInt(pace_arr[0]);

    // When seconds get rounded up to 60, it displays 60 instead of an extra
    // minute. Fix this.
    if (seconds == 60) {
      seconds = '00';
      minutes = minutes + 1;
    }

    pace = minutes + ':' + seconds;
  } 
  
  $('#pace span').html(pace);
}
