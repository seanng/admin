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
  SET_FILTER,
  DISPLAY_ADD_ROOM_MODAL,
  HANDLE_INPUT_CHANGE,
  CREATE_ROOM,
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

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    filter,
  };
}

export function displayAddRoomModal(bool) {
  return {
    type: DISPLAY_ADD_ROOM_MODAL,
    bool,
  };
}

export function createRoom(roomNumber) {
  return {
    type: CREATE_ROOM,
    roomNumber,
  };
}

export function handleInputChange(key, value) {
  return {
    type: HANDLE_INPUT_CHANGE,
    key,
    value,
  };
}
