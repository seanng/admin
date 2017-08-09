/*
 *
 * HotelProfile actions
 *
 */

import { GET_HOTEL_INFO } from './constants';

export function getHotelInfo(id) {
  return {
    type: GET_HOTEL_INFO,
    id,
  };
}
