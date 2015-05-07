/**
 * CloseButton.react
 * @jsx React.DOM
 */
define([

  'lib/react/react',
  'lib/react/jsx!mixins/TooltipMixin.react',
  'utils/joinClasses'

], function(React, TooltipMixin, joinClasses) {

  return React.createClass({
    displayName: 'CloseButton',

    mixins: [TooltipMixin],

    render: function() {
      return (
        <button
          {...this.props}
          className={joinClasses(this.props.className, 'close')}
          type="button">
          <span aria-hidden="true">&times;</span>
          <span className="sr-only">Close</span>
        </button>
      );
    }
  });

});
