/*
 *
 * FrontDesk actions
 *
 */

import {
  FETCH_ROOMS,
  MAKE_AVAILABLE,
  DELETE_ROOM,
  CHECK_IN,
} from './constants';

export function fetchRooms() {
  return {
    type: FETCH_ROOMS,
  };
}

export function makeAvailable(roomNumber, key) {
  return {
    type: MAKE_AVAILABLE,
    roomNumber,
    key,
  };
}

export function deleteRoom(roomNumber) {
  return {
    type: DELETE_ROOM,
    roomNumber,
  };
}

export function checkIn(roomNumber) {
  return {
    type: CHECK_IN,
    roomNumber,
  };
}
