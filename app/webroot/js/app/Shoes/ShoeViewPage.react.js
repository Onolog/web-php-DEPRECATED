var React = require('react');

var AppPage = require('components/Page/AppPage.react');
var Button = require('components/Button/Button.react');
var ButtonGroup = require('components/ButtonGroup/ButtonGroup.react');
var PageHeader = require('components/Page/PageHeader.react');
var Panel = require('components/Panel/Panel.react');
var ShoeView = require('./ShoeView.react');

/**
 * ShoeViewPage.react
 *
 * Displays the page header and view for a single shoe
 */
var ShoeViewPage = React.createClass({
  displayName: 'ShoeViewPage',

  getInitialState: function() {
    var {canEdit, shoe} = window.app;
    return {
      canEdit: canEdit,
      shoe: shoe
    };
  },

  render: function() {
    var {shoe} = this.state;
    return (
      <AppPage>
        <PageHeader title={shoe.name}>
          {this._renderButtonGroup()}
        </PageHeader>
        <Panel noPadding={true}>
          <ShoeView
            activityCount={shoe.activity_count}
            activities={shoe.activities}
            mileage={shoe.mileage}
          />
        </Panel>
      </AppPage>
    );
  },

  _renderButtonGroup: function() {
    var {canEdit, shoe} = this.state;
    if (canEdit) {
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
      document.location = '/shoes/delete/' + this.state.shoe.id;
    }
  }
});

module.exports = ShoeViewPage;
