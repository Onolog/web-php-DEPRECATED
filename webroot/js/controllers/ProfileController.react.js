import {find} from 'lodash';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import AppFullPage from 'components/Page/AppFullPage.react';
import Loader from 'components/Loader/Loader.react';
import PageHeader from 'components/Page/PageHeader.react';

import {fetchProfile} from 'actions/users';

import {PROFILE_FETCH} from 'constants/ActionTypes';

import 'components/Profile/Profile.css';

const mapStateToProps = ({pendingRequests, users}) => {
  return {
    pendingRequests,
    users,
  };
};

/**
 * ProfileController.react
 */
const ProfileController = React.createClass({
  propTypes: {
    pendingRequests: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
  },

  componentWillMount() {
    this.props.dispatch(fetchProfile(this.props.params.userId));
  },

  render() {
    return (
      <AppFullPage className="profile">
        {this._renderContents()}
      </AppFullPage>
    );
  },

  _renderContents() {
    const {params, pendingRequests, users} = this.props;
    const user = find(users, {id: +params.userId});

    if (!user || pendingRequests[PROFILE_FETCH]) {
      return <Loader background full />;
    }

    return <PageHeader full title={user.name} />;
  },
});

module.exports = connect(mapStateToProps)(ProfileController);
