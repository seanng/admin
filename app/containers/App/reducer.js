/*
 *
 * Global reducer
 *
 */

import { fromJS } from 'immutable';
import { INVALIDATE_TOKEN } from './constants';
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
      console.log('login success.');
      return state.set('user', action.user);

    default:
      return state;
  }
}

export default appReducer;
