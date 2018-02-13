/*
 *
 * HotelProfile actions
 *
 */

import {
  GET_HOTEL_INFO,
  SET_EDITING_MODE,
  REARRANGE_PHOTOS,
  CANCEL_EDITING_MODE,
  SAVE_HOTEL_PROFILE,
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

export function rearrangePhotos(dragIndex, hoverIndex, dragPhoto) {
  return {
    type: REARRANGE_PHOTOS,
    dragIndex,
    hoverIndex,
    dragPhoto,
  };
}
