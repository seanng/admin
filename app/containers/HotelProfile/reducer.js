/*
 *
 * HotelProfile reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_HOTEL_INFO_SUCCESS,
  GET_HOTEL_INFO_FAIL,
  SET_EDITING_MODE,
} from './constants';

const initialState = fromJS({
  hasLoaded: false,
  isEditingMode: false,
  hotelInfo: {},
});

function hotelProfileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOTEL_INFO_SUCCESS:
      return state.merge({
        isEditingMode: false,
        hotelInfo: action.info,
        hasLoaded: true,
      });
    case GET_HOTEL_INFO_FAIL:
      console.error('error getting hotel info.');
      return state;

    case SET_EDITING_MODE:
      return state.merge({
        isEditingMode: action.bool,
      });

    default:
      return state;
  }
}

export default hotelProfileReducer;
