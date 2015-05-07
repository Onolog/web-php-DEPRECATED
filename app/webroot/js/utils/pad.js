/**
 * pad.js
 *
 * Util function for adding leading characters (usually zeroes) to a number or
 * string. Common use case: '3' -> '03'
 */
define(function() {

  return function pad(
    /*number*/ number,
    /*number*/ width,
    /*string*/ char
  ) /*string*/ {
    char = char || '0';
    number = number + '';
    return number.length >= width ?
      number :
      new Array(width - number.length + 1).join(char) + number;
  };

});
