import $ from 'jquery';
import encodeData from 'utils/encodeData';

import {
  USER_SETTINGS_SAVE,
  USER_SETTINGS_SAVE_ERROR,
  USER_SETTINGS_SAVE_SUCCESS,
} from 'constants/ActionTypes';

const FORM_NAME = 'User';

function userSaveSettingsSuccess(response, dispatch) {
  const {payload} = JSON.parse(response);
  dispatch({
    type: USER_SETTINGS_SAVE_SUCCESS,
    user: payload,
  });
}

export function userSaveSettings(settings) {
  return dispatch => {
    $.post('/ajax/users/settings', encodeData(settings, FORM_NAME))
      .done(response => userSaveSettingsSuccess(response, dispatch))
      .fail(response => dispatch({type: USER_SETTINGS_SAVE_ERROR}));
  };
}
