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

  // Note: We expect the datasource to be either an array or a string , which
  // means we can make assumptions about how to compare. If the expected type
  // changes, this function could break.
  function dataSourceChanged(source1, source2) {
    // We only accept strings or arrays, so check that they're both at least the
    // same type.
    if (typeof source1 !== typeof source2) {
      return true;
    }

    // If the datasource is a URL, comparison is easy.
    if (typeof source1 === 'string') {
      return source1 !== source2;
    }

    // Compare arrays
    var length = source1.length;
    if (source2.length !== length) {
      return true;
    }

    // Again, the data source structure should be predictable here (an array of
    // shallow objects), so we can skip some comparison steps.
    for (var ii=0; ii < length; ii++) {
      return JSON.stringify(source1[ii]) !== JSON.stringify(source2[ii]);
    }
  }

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

    componentDidUpdate: function(prevProps, prevState) {
      // Update the data source if it has changed
      if (dataSourceChanged(prevProps.dataSource, this.props.dataSource)) {
        $(this.refs.input.getDOMNode()).tokenInput(
          'updateLocalData',
          this.props.dataSource
        );
      }
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
