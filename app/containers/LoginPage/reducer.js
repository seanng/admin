/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import { HANDLE_INPUT_CHANGE, ERROR } from './constants';

const initialState = fromJS({
  email: '',
  password: '',
  error: null,
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_INPUT_CHANGE:
      return state.set(action.key, action.value);

    case ERROR:
      console.log('error: ', action.msg);
      return state.set('error', action.msg);

    default:
      return state;
  }
}

export default loginPageReducer;
