/**
 * ShoeViewPage.react
 * @jsx React.DOM
 *
 * Displays the page header and view for a single shoe
 */

define([

  'lib/react/react',
  'lib/react/jsx!app/Chrome/PageHeader.react',
  'lib/react/jsx!app/Shoes/ShoeView.react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/ButtonGroup/ButtonGroup.react',

], function(

  React,
  PageHeader,
  ShoeView,
  Button,
  ButtonGroup

) {

  return React.createClass({
    displayName: 'ShoeViewPage',

    propTypes: {
      /**
       * Whether or not the current viewer can edit or delete the shoe.
       */
      canEdit: React.PropTypes.bool.isRequired,
      /**
       * Number of miles the shoe has accumulated
       */
      shoe: React.PropTypes.object.isRequired
    },

    render: function() {
      var shoe = this.props.shoe;
      return (
        <div>
          <PageHeader title={shoe.name}>
            {this._renderButtonGroup()}
          </PageHeader>
          <ShoeView
            activityCount={shoe.activity_count}
            activities={shoe.activities}
            mileage={shoe.mileage}
          />
        </div>
      );
    },

    _renderButtonGroup: function() {
      var shoe = this.props.shoe;
      if (this.props.canEdit) {
        return (
          <ButtonGroup>
            <Button
              glyph="pencil"
              href={'/shoes/edit/' + shoe.id}
              tooltip={{
                title: 'Edit Shoe'
              }}
            />
            <Button
              glyph="trash"
              onClick={this._onShoeDelete}
              tooltip={{
                title: 'Delete Shoe'
              }}
            />
            <Button
              glyph="plus"
              href="/shoes/add/"
              tooltip={{
                title: 'New Shoe'
              }}
            />
            <Button
              glyph="th"
              href="/shoes"
              tooltip={{
                title: 'All Shoes'
              }}
            />
          </ButtonGroup>
        );
      }
    },

    /**
     * TODO: Handle this better...
     */
    _onShoeDelete: function() {
      if (confirm('Are you sure you want to delete this shoe?')) {
        document.location = '/shoes/delete/' + this.props.shoe.id;
      }
    }
  });

});
