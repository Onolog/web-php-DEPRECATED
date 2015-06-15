/**
 * AllShoesView.react
 * @jsx React.DOM
 *
 * View controller for displaying all of a user's shoes
 */
define([

  'lib/react/react',

  'lib/react/jsx!app/Shoes/ShoeEditLink.react',
  'lib/react/jsx!app/Shoes/ShoeViewLink.react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/Button/CloseButton.react',
  'lib/react/jsx!components/EmptyState.react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Panel/Panel.react',
  'lib/react/jsx!components/Table/Table.react',

  'actions/ShoeActions',
  'utils/cx',
  'utils/ShoeUtils'

], function(

  React,

  ShoeEditLink,
  ShoeViewLink,
  Button,
  CloseButton,
  EmptyState,
  Link,
  Panel,
  Table,

  ShoeActions,
  cx,
  ShoeUtils

) {

  return React.createClass({
    displayName: 'AllShoesView',

    propTypes: {
      shoes: React.PropTypes.array.isRequired
    },

    render: function() {
      var shoes = ShoeUtils.groupByActivity(this.props.shoes);

      return (
        <div>
          {this._renderActiveShoes(shoes.active)}
          {this._renderInactiveShoes(shoes.inactive)}
        </div>
      );
    },

    _renderActiveShoes: function(/*array*/ activeShoes) {
      var contents;
      if (activeShoes.length) {
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
      if (inactiveShoes.length) {
        return (
          <Panel title="Inactive">
            {this._renderShoeTable(inactiveShoes)}
          </Panel>
        );
      }
    },

    _renderShoeTable: function(/*array*/ shoes) {
      return (
        <Table hover={true}>
          <tbody>
            {shoes.map(this._renderTableRows)}
          </tbody>
        </Table>
      );
    },

    _renderTableRows: function(shoe, idx) {
      return (
        <tr
          className={cx({
            inactive: !!shoe.inactive
          })}
          key={idx}>
          <td>
            <ShoeViewLink shoe={shoe} />
          </td>
          <td className="activities">
            {shoe.activity_count + ' runs'}
          </td>
          <td className="mileage">{shoe.mileage + ' mi'}</td>
          <td className="actions">
            <ShoeEditLink initialShoe={shoe} />
            <CloseButton
              onClick={this._onDeleteClick.bind(this, shoe.id)}
              tooltip={{title: 'Delete'}}
            />
          </td>
        </tr>
      );
    },

    _onDeleteClick: function(id, evt) {
      if (confirm('Are you sure you want to delete this shoe?')) {
        ShoeActions.delete(id);
      }
    }
  });

});
