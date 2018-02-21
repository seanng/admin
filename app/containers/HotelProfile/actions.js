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
  DELETE_PHOTO,
  EDIT_HOTEL_INFO,
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

export function deletePhoto(index) {
  return {
    type: DELETE_PHOTO,
    index,
  };
}

export function editHotelInfo(key, value) {
  return {
    type: EDIT_HOTEL_INFO,
    key,
    value,
  };
}
