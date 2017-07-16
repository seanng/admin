/*
 *
 * FrontDesk actions
 *
 */

import { FETCH_ROOMS } from './constants';

export function fetchRooms() {
  return {
    type: FETCH_ROOMS,
  };
}
