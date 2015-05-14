/**
 * AllShoesView.react
 * @jsx React.DOM
 *
 * View controller for displaying all of a user's shoes
 */
define([

  'lib/react/react',

  'lib/react/jsx!app/Shoes/ShoeViewLink.react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/Button/CloseButton.react',
  'lib/react/jsx!components/EmptyState.react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Panel/Panel.react',

  'actions/ShoeActions',
  'utils/cx'

], function(

  React,

  ShoeViewLink,
  Button,
  CloseButton,
  EmptyState,
  Link,
  Panel,

  ShoeActions,
  cx

) {

  return React.createClass({
    displayName: 'AllShoesView',

    propTypes: {
      shoes: React.PropTypes.array.isRequired
    },

    render: function() {
      var shoes = this.props.shoes;
      var activeShoes = [];
      var inactiveShoes = [];

      // Split the shoes into groups by inactive state
      shoes.forEach(function(shoe) {
        if (shoe.inactive) {
          inactiveShoes.push(shoe);
        } else {
          activeShoes.push(shoe);
        }
      });

      return (
        <div>
          {this._renderActiveShoes(activeShoes)}
          {this._renderInactiveShoes(inactiveShoes)}
        </div>
      );
    },

    _renderActiveShoes: function(/*array*/ activeShoes) {
      var contents;
      if (activeShoes && activeShoes.length) {
        contents = this._renderShoeTable(activeShoes);
      } else {
        contents =
          <EmptyState
            message="You do not have any active shoes to display."
          />;
      }

      return (
        <Panel title="Active">
          {contents}
        </Panel>
      );
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
              <ShoeViewLink
                shoeID={+shoe.id}
                shoeName={shoe.name}
              />
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

      return (
        <table className="item_list">
          <tbody>{rows}</tbody>
        </table>
      );
    },

    _onDeleteClick: function(id, evt) {
      if (confirm('Are you sure you want to delete this shoe?')) {
        ShoeActions.delete(id);
      }
    }
  });

});
