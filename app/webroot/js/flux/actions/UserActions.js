var $ = require('jquery');

var ActionTypes = require('flux/ActionTypes');
var AppDispatcher = require('flux/AppDispatcher');
var ResponseHandler = require('utils/ResponseHandler');

var encodeData = require('utils/encodeData');

const FORM_NAME = 'User';

/**
 * UserActions.js
 */
var UserActions = {
  saveSettings(data) {
    $.post('/ajax/users/settings', encodeData(data, FORM_NAME))
      .done(this.onSaveSettingsSuccess)
      .fail(this.onSaveSettingsError);
  },

  onSaveSettingsSuccess(response) {
    response = new ResponseHandler(response);
    if (response.getWasSuccessful()) {
      AppDispatcher.dispatch({
        data: response.getPayload(),
        eventName: ActionTypes.USER_SETTINGS_SAVE,
      });
    } else {
      alert(
        'Your settings could not be saved. Please refresh the page and try ' +
        'again.'
      );  
    }
  },
};

module.exports = UserActions;
