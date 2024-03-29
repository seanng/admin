/*
 *
 * Global reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INVALIDATE_TOKEN,
  LOGOUT,
  SOCKET_CONNECTION_ESTABLISHED,
} from './constants';
import { SUCCESS } from '../LoginPage/constants';

const initialState = fromJS({
  hasLoaded: false,
  user: null,
  socketId: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_TOKEN:
      return state.set('hasLoaded', true);

    case SOCKET_CONNECTION_ESTABLISHED:
      return state.set('socketId', action.socketId);

    case SUCCESS:
      window.localStorage.accessToken = action.token;
      return state.merge({
        hasLoaded: true,
        user: action.user,
      });

    case LOGOUT:
      delete window.localStorage.accessToken;
      return state.set('user', null);

    default:
      return state;
  }
}

export default appReducer;
