import {ERROR_CLEAR} from 'constants/ActionTypes';

export function clearError() {
  return (dispatch, getState) => dispatch({type: ERROR_CLEAR});
}
