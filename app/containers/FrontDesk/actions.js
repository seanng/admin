/*
 *
 * FrontDesk actions
 *
 */

import {
  FETCH_ROOMS,
  DELETE_ROOM,
  CHECK_IN,
  SET_FILTER,
  DISPLAY_ADD_ROOM_MODAL,
  DISPLAY_ROOM_OPTIONS_MODAL,
  HANDLE_INPUT_CHANGE,
  CREATE_ROOM,
  OPEN_ROOM_OPTIONS_MODAL,
} from './constants';

export function fetchRooms() {
  return {
    type: FETCH_ROOMS,
  };
}

export function deleteRoom(stayId) {
  return {
    type: DELETE_ROOM,
    stayId,
  };
}

export function checkIn(stayId, customerId) {
  return {
    type: CHECK_IN,
    stayId,
    customerId,
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

export function displayRoomOptionsModal(bool) {
  return {
    type: DISPLAY_ROOM_OPTIONS_MODAL,
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

export function openRoomOptionsModal(
  stayId,
  status,
  room,
  customerId,
  customerName,
  index
) {
  return {
    type: OPEN_ROOM_OPTIONS_MODAL,
    stayId,
    status,
    room,
    customerId,
    customerName,
    index,
  };
}
