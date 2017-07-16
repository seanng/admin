/*
 *
 * FrontDesk reducer
 *
 */

import { fromJS } from 'immutable';
import { FETCH_ROOMS_SUCCESS, FETCH_ROOMS_ERROR } from './constants';

const initialState = fromJS({
  rooms: [],
  hasLoaded: false,
});

function frontDeskReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ROOMS_ERROR:
      return state;
    case FETCH_ROOMS_SUCCESS:
      return state.merge({ rooms: action.rooms, hasLoaded: true });
    default:
      return state;
  }
}

export default frontDeskReducer;
