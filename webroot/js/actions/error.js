// @flow

import {ERROR_CLEAR} from 'constants/ActionTypes';

export function clearError(): Function {
  return (dispatch: Function, getState: Function) => (
    dispatch({type: ERROR_CLEAR})
  );
}
