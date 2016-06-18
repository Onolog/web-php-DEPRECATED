import $ from 'jquery';

import {
  USER_SETTINGS_SAVE,
  USER_SETTINGS_SAVE_ERROR,
  USER_SETTINGS_SAVE_SUCCESS,
} from 'constants/ActionTypes';

function userSaveSettingsSuccess(response, dispatch) {
  const {user} = response;
  dispatch({
    type: USER_SETTINGS_SAVE_SUCCESS,
    user,
  });
}

export function userSaveSettings(settings) {
  return dispatch => {
    dispatch({type: USER_SETTINGS_SAVE});

    $.post('/users/edit.json', settings)
      .done(response => userSaveSettingsSuccess(response, dispatch))
      .fail(response => dispatch({type: USER_SETTINGS_SAVE_ERROR}));
  };
}
