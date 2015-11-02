var React = require('react');

var Button = require('../../components/Button/Button.react');
var Link = require('../../components/Link/Link.react');
var Modal = require('../../components/Modal/Modal.react');
var ShoeView = require('./ShoeView.react');

var LayerMixin = require('../../mixins/LayerMixin.react');
var ShoeActions = require('../../flux/actions/ShoeActions');
var ShoeStore = require('../../flux/stores/ShoeStore');

var cx = require('classnames');

/**
 * ShoeViewLink.react
 * @jsx React.DOM
 *
 * Linkified name of shoe. Opens a dialog with the shoe's data when clicked.
 */
var ShoeViewLink = React.createClass({
  displayName: 'ShoeViewLink',

  mixins: [LayerMixin],

  propTypes: {
    shoe: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isLoading: false,
      shown: false
    };
  },

  render: function() {
    return (
      <Link href="#" onClick={this._onViewClick}>
        {this.props.shoe.name}
      </Link>
    );
  },

  renderLayer: function() {
    var shoe = this.props.shoe;
    return (
      <Modal
        alert={this.state.alert}
        isLoading={this.state.isLoading}
        shown={this.state.shown}
        size="small"
        onRequestClose={this._closeDialog}
        title={shoe.name}
        footer={
          <Button
            label="Close"
            onClick={this._closeDialog}
          />
        }>
        <ShoeView
          activities={shoe.activities}
          activityCount={shoe.activity_count}
          mileage={shoe.mileage}
        />
      </Modal>
    );
  },

  _closeDialog: function() {
    if (this.isMounted()) {
      this.setState(this.getInitialState());
    }
  },

  _onViewClick: function() {
    this.setState({
      isLoading: !ShoeStore.getItem(this.props.shoe.id),
      shown: true
    });
  }
});

module.exports = ShoeViewLink;
