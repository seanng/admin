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
  SET_FILTER,
  DISPLAY_ADD_ROOM_MODAL,
  DISPLAY_ROOM_OPTIONS_MODAL,
  HANDLE_INPUT_CHANGE,
  CREATE_ROOM_SUCCESS,
  OPEN_ROOM_OPTIONS_MODAL,
} from './constants';

const initialState = fromJS({
  rooms: [],
  hasLoaded: false,
  activeFilter: 'all',
  addRoomInput: '',
  shouldDisplayAddRoomModal: false,
  shouldDisplayRoomOptionsModal: false,
  activeRoomStatus: '',
  activeRoomGuest: '',
  activeRoomNumber: '',
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
          status: 'available',
          guestName: ' - ',
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

    case SET_FILTER:
      return state.set('activeFilter', action.filter);

    case DISPLAY_ADD_ROOM_MODAL:
      return state.set('shouldDisplayAddRoomModal', action.bool);

    case DISPLAY_ROOM_OPTIONS_MODAL:
      return state.set('shouldDisplayRoomOptionsModal', action.bool);

    case OPEN_ROOM_OPTIONS_MODAL:
      return state.merge({
        activeRoomStatus: action.status,
        activeRoomGuest: action.guest,
        activeRoomNumber: action.room,
        shouldDisplayRoomOptionsModal: true,
      });

    case HANDLE_INPUT_CHANGE:
      return state.set(action.key, action.value);

    case CREATE_ROOM_SUCCESS: {
      const rooms = state.get('rooms').toJS();
      rooms.push(action.room);
      return state.merge({
        addRoomInput: '',
        shouldDisplayAddRoomModal: false,
        rooms,
      });
    }

    default:
      return state;
  }
}

export default frontDeskReducer;
