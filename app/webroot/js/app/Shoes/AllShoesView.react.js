/**
 * AllShoesView.react
 * @jsx React.DOM
 *
 * View controller for displaying all of a user's shoes
 */
define([

  'lib/react/react',

  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/Button/CloseButton.react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Panel/Panel.react',

  'utils/cx'

], function(

  React,

  Button,
  CloseButton,
  Link,
  Panel,

  cx

) {

  return React.createClass({
    displayName: 'AllShoesView',

    propTypes: {
      shoes: React.PropTypes.object.isRequired
    },

    render: function() {
      var shoes = this.props.shoes;

      return (
        <div>
          {this._renderActiveShoes(shoes.active)}
          {this._renderInactiveShoes(shoes.inactive)}
        </div>
      );
    },

    _renderEmptyState: function() {

    },

    _renderActiveShoes: function(/*array*/ activeShoes) {
      if (activeShoes && activeShoes.length) {
        return (
          <Panel title="Active">
            {this._renderShoeTable(activeShoes)}
          </Panel>
        );
      }
    },

    _renderInactiveShoes: function(/*array*/ inactiveShoes) {
      if (inactiveShoes && inactiveShoes.length) {
        return (
          <Panel title="Inactive">
            {this._renderShoeTable(inactiveShoes)}
          </Panel>
        );
      }
    },

    _renderShoeTable: function(/*array*/ shoes) {
      var rows = shoes.map(function(shoe, idx) {
        return (
          <tr
            className={cx({
              inactive: !!+shoe.inactive
            })}
            key={idx}>
            <td>
              <Link href={'/shoes/view/' + shoe.id}>
                {shoe.name}
              </Link>
            </td>
            <td className="activities">
              {shoe.activity_count + ' runs'}
            </td>
            <td className="mileage">{shoe.mileage + ' mi'}</td>
            <td className="actions">
              <Link href={'/shoes/edit/' + shoe.id}>
                Edit
              </Link>
              <CloseButton
                onClick={this._onDeleteClick.bind(this, shoe.id)}
                tooltip={{title: 'Delete'}}
              />
            </td>
          </tr>
        );
      }.bind(this));

      return <table className="item_list">{rows}</table>;
    },

    _onDeleteClick: function(id, evt) {
      if (confirm('Are you sure you want to delete this shoe?')) {
        document.location = '/shoes/delete/' + id;
      }
    }
  });

});
