/**
 * base.js
 *
 * Basic JS functions used in Onolog.com
 */

/**
 * Wrapper function for showing and hiding the progress indicator
 * during ajax calls. You can specify the size of the loader (big or small)
 * for use in different situations.
 *
 * @param   element   str   The name of the element you're loading shit into
 * @param   big       bool  Small if blank or false, big if true
 */
function toggleLoader(element, big) {
  var className = (big ? 'ajax_load_big' : 'ajax_load_small');
  var el = $(element);

  if (el.hasClass(className)) {
    el.removeClass(className);
  } else {
    el.empty();
    el.addClass(className);
  }
}
