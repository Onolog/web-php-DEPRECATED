/**
 * Implement non-global version of JQuery so it doesn't conflict with other
 * frameworks, like Prototype.
 */
define(['lib/jquery.min'], function ($) {
    return $.noConflict(true);
});
