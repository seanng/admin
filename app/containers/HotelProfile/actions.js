/*
 *
 * HotelProfile actions
 *
 */

import {
  GET_HOTEL_INFO,
  SET_EDITING_MODE,
  REARRANGE_PHOTOS,
} from './constants';

export function getHotelInfo(id) {
  return {
    type: GET_HOTEL_INFO,
    id,
  };
}

export function setEditingMode(bool) {
  return {
    type: SET_EDITING_MODE,
    bool,
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
