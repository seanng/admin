/*
 *
 * HotelProfile reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_HOTEL_INFO_SUCCESS, GET_HOTEL_INFO_FAIL } from './constants';

const initialState = fromJS({
  hasLoaded: false,
  isEditingHotelProfile: false,
  hotelInfo: {},
});

function hotelProfileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOTEL_INFO_SUCCESS:
      return state.merge({
        isEditingHotelProfile: false,
        hotelInfo: action.info,
        hasLoaded: true,
      });
    case GET_HOTEL_INFO_FAIL:
      console.error('error getting hotel info.');
      return state;
    default:
      return state;
  }
}

export default hotelProfileReducer;
