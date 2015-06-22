define(function() {
  /**
   * range.js
   *
   * Returns an array of numbers, incremented by one, from {start} to {end}.
   *
   * TODO: Make step param work.
   */
  return function(
    /*number*/ start,
    /*number*/ end,
    /*number*/ step
  ) /*array*/ {
    var range = [];
    for (var ii=start; ii<=end; ii++) {
      range.push(ii);
    }
    return range;
  }
});
