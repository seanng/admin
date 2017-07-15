/*
 *
 * Global reducer
 *
 */

import { fromJS } from 'immutable';
import { INVALIDATE_TOKEN } from './constants';

const initialState = fromJS({
  hasLoaded: false,
  user: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_TOKEN:
      return state.set('hasLoaded', true);
    default:
      return state;
  }
}

export default appReducer;
