/**
 * Tokenizer.react
 * @jsx React.DOM
 *
 * Basic tokenizer component
 */
define([

  'lib/react/react',
  'lib/TokenInput'

], function(React) {

  return React.createClass({
    displayName: 'Tokenizer',

    propTypes: {
      animateDropDown: React.PropTypes.bool,
      /**
       * Either an array of data or a remote query url string
       */
      dataSource: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.string
      ]).isRequired,

      hintText: React.PropTypes.string,
      noResultsText: React.PropTypes.string,
      searchingText: React.PropTypes.string,
      /**
       * Items to display in the tokenizer
       */
      items: React.PropTypes.array,
      preventDuplicates: React.PropTypes.bool
    },

    getDefaultProps: function() {
      return {
        animateDropdown: false,
        hintText: 'Type something...',
        noResultsText: 'No results',
        searchingText: 'Searching...',
        prePopulate: [],
        preventDuplicates: true
      };
    },

    componentDidMount: function() {
      $(this.refs.input.getDOMNode()).tokenInput(this.props.dataSource, {
        theme: 'facebook',
        hintText: this.props.hintText,
        noResultsText: this.props.noResultsText,
        searchingText: this.props.searchingText,
        preventDuplicates: this.props.preventDuplicates,
        animateDropdown: this.props.animateDropdown,
        prePopulate: this.props.items,
        onAdd: this._onAdd,
        onDelete: this._onDelete
      });
    },

    render: function() {
      return (
        <div className="typeahead-container">
          <input
            ref="input"
            type="text"
            placeholder={this.props.placeholder}
            name={this.props.name}
          />
        </div>
      );
    },

    _onAdd: function(/*object*/ item) {
      var items = this.props.items || [];
      // tokenInput handles de-duping, so no need to do it here...
      items.push(item);
      this._onChange(items);
    },

    _onDelete: function(/*object*/ item) {
      var items = this.props.items.filter(function(existingItem) {
        return item.id !== existingItem.id;
      });
      this._onChange(items);
    },

    _onChange: function(/*array*/ items) {
      this.props.onChange && this.props.onChange(items);
    },

    getValue: function() {
      return this.refs.input.getDOMNode().value;
    }

  });

});
