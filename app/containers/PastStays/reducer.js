/*
 *
 * PastStays reducer
 *
 */

import { fromJS } from 'immutable';
import { FETCH_STAYS_SUCCESS } from './constants';

const initialState = fromJS({
  hasLoaded: false,
  stays: [],
});

function pastStaysReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STAYS_SUCCESS:
      return state.merge({
        hasLoaded: true,
        stays: action.stays,
      });
    default:
      return state;
  }
}

export default pastStaysReducer;
