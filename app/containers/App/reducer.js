/*
 *
 * Global reducer
 *
 */

import { fromJS } from 'immutable';
import { INVALIDATE_TOKEN, LOGOUT_SUCCESS } from './constants';
import { SUCCESS } from '../LoginPage/constants';

const initialState = fromJS({
  hasLoaded: false,
  user: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_TOKEN:
      return state.set('hasLoaded', true);

    case SUCCESS:
      window.localStorage.accessToken = action.token;
      return state.merge({
        hasLoaded: true,
        user: action.user,
      });

    case LOGOUT_SUCCESS:
      delete window.localStorage.accessToken;
      return state.set('user', null);

    default:
      return state;
  }
}

export default appReducer;
