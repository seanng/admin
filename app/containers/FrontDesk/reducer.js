/*
 *
 * FrontDesk reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_ERROR,
  MAKE_AVAILABLE_SUCCESS,
  MAKE_AVAILABLE_ERROR,
  DELETE_ROOM_ERROR,
  DELETE_ROOM_SUCCESS,
  CHECK_IN_SUCCESS,
  CHECK_IN_ERROR,
} from './constants';

const initialState = fromJS({
  rooms: [],
  hasLoaded: false,
});

function frontDeskReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ROOMS_ERROR:
      return state;
    case FETCH_ROOMS_SUCCESS:
      return state.merge({ rooms: action.rooms, hasLoaded: true });
    case MAKE_AVAILABLE_ERROR:
      return state;
    case MAKE_AVAILABLE_SUCCESS:
      return state.setIn(
        ['rooms', action.key],
        Map({
          roomNumber: action.roomNumber,
          employeeId: 123,
          status: 'Available',
          guestName: '( empty )',
        })
      );
    case DELETE_ROOM_ERROR:
      return state;
    case DELETE_ROOM_SUCCESS:
      return state.update('rooms', rooms =>
        rooms.filter(room => room.get('roomNumber') !== action.roomNumber)
      );
    case CHECK_IN_ERROR:
      return state;
    case CHECK_IN_SUCCESS: {
      const { roomNumber, status, checkInTime } = action.roomData;
      return state.update('rooms', rooms =>
        rooms.update(
          rooms.findIndex(room => room.get('roomNumber') === roomNumber),
          room => room.set('status', status).set('checkInTime', checkInTime)
        )
      );
    }

    default:
      return state;
  }
}

export default frontDeskReducer;
