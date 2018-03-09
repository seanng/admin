/*
 *
 * HotelProfile actions
 *
 */

import {
  GET_HOTEL_INFO,
  SET_EDITING_MODE,
  CANCEL_EDITING_MODE,
  SAVE_HOTEL_PROFILE,
  SELECT_AMENITY,
  TOGGLE_AMENITIES_MODAL,
} from './constants';

export function getHotelInfo(id) {
  return {
    type: GET_HOTEL_INFO,
    id,
  };
}

export function setEditingMode() {
  return {
    type: SET_EDITING_MODE,
  };
}

export function cancelEditingMode() {
  return {
    type: CANCEL_EDITING_MODE,
  };
}

export function saveHotelProfile(hotelInfo) {
  return {
    type: SAVE_HOTEL_PROFILE,
    hotelInfo,
  };
}

export function selectAmenity(amenity) {
  return {
    type: SELECT_AMENITY,
    amenity,
  };
}

export function toggleAmenitiesModal(shouldDisplay, amenities) {
  return {
    type: TOGGLE_AMENITIES_MODAL,
    shouldDisplay,
    amenities,
  };
}
