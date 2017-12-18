/*
 *
 * HotelProfile actions
 *
 */

import { GET_HOTEL_INFO, SET_EDITING_MODE } from './constants';

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
