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
  CANCEL_EDITING_MODE,
  SAVE_HOTEL_PROFILE_SUCCESS,
  TOGGLE_AMENITIES_MODAL,
  SELECT_AMENITY,
} from './constants';

const initialState = fromJS({
  hasLoaded: false,
  isEditingMode: false,
  hotelInfo: {},
  selectedAmenities: [],
  isAmenitiesModalOpen: false,
});

function hotelProfileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOTEL_INFO_SUCCESS: {
      return state.merge({
        isEditingMode: false,
        hotelInfo: action.info,
        hasLoaded: true,
      });
    }
    case GET_HOTEL_INFO_FAIL:
      return state;

    case SET_EDITING_MODE:
      return state.merge({
        isEditingMode: true,
      });

    case CANCEL_EDITING_MODE:
      return state.merge({
        isEditingMode: false,
      });

    case SAVE_HOTEL_PROFILE_SUCCESS: {
      const { hotelInfo } = action;
      return state.merge({
        hotelInfo,
        isEditingMode: false,
        hasLoaded: true,
      });
    }

    case SELECT_AMENITY:
      return state.update('selectedAmenities', selectedAmenities => {
        const amenityIndex = selectedAmenities.indexOf(action.amenity);
        if (amenityIndex === -1) {
          return selectedAmenities.push(action.amenity);
        }
        return selectedAmenities.splice(amenityIndex, 1);
      });

    case TOGGLE_AMENITIES_MODAL:
      return state.merge({
        isAmenitiesModalOpen: action.shouldDisplay,
        selectedAmenities: action.amenities,
      });

    default:
      return state;
  }
}

export default hotelProfileReducer;
