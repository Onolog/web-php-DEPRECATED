/**
 * ShoeViewLink.react
 * @jsx React.DOM
 *
 * Linkified name of shoe. Opens a dialog with the shoe's data when clicked.
 */
define([

  'lib/react/react',
  'lib/react/jsx!app/Shoes/ShoeView.react',
  'lib/react/jsx!components/Button/Button.react',
  'lib/react/jsx!components/Link/Link.react',
  'lib/react/jsx!components/Modal/Modal.react',

  'mixins/LayerMixin.react',
  'mixins/StoreMixin.react',

  'actions/ShoeActions',
  'stores/AllShoesStore',
  'stores/ShoeStore',

  'utils/cx'

], function(

  React,
  ShoeView,
  Button,
  Link,
  Modal,

  LayerMixin,
  StoreMixin,

  ShoeActions,
  AllShoesStore,
  ShoeStore,

  cx

) {

  return React.createClass({
    displayName: 'ShoeViewLink',

    mixins: [LayerMixin, StoreMixin],

    propTypes: {
      shoe: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
      return {
        isLoading: false,
        shown: false
      };
    },

    componentWillMount: function() {
      this.stores = [
        this.setStoreInfo(ShoeStore, this._shoeChanged)
      ];
    },

    _shoeChanged: function() {
      var shoe = ShoeStore.getData();
      if (shoe && shoe.id === this.props.shoe.id) {
        this.setState({
          isLoading: false
        });
      }
    },

    render: function() {
      return (
        <Link href="javascript:;" onClick={this._onViewClick}>
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
      if (!this.isMounted()) {
        // Deleting the shoe unmounts the component
        return;
      }

      this.setState({
        isLoading: false,
        shown: false
      });
    },

    _onViewClick: function() {
      // TODO: This is currently inefficient. The first call will not be cached
      // and we'll fetch the individual shoe data even though currently we
      // already get everything we need when we fetch all the shoe data. Quick
      // fix is simply to omit `getItem` here, though eventually we may need the
      // check. It would also be nice to abstract these stores, in which case
      // we'd generally want a to check.
      var shoe = AllShoesStore.getItem(this.props.shoe.id);
      this.setState({
        isLoading: !shoe,
        shown: true
      });
    }
  });

});
