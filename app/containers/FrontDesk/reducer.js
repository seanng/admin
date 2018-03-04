/*
 *
 * FrontDesk reducer
 *
 */

import { fromJS } from 'immutable';
import { mapToRoomStatus } from 'utils/helpers';
import {
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_ERROR,
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
  SOCKET_CREATE_BOOKING,
} from './constants';

const initialState = fromJS({
  rooms: [],
  hasLoaded: false,
  activeFilter: 'all',
  addRoomInput: '',
  shouldDisplayAddRoomModal: false,
  shouldDisplayRoomOptionsModal: false,
  activeRoomStatus: '',
  activeRoomCustomerId: '',
  activeRoomCustomerName: '',
  activeRoomNumber: '',
  activeRoomIndex: '',
  activeStayId: '',
});

function frontDeskReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ROOMS_ERROR:
      return state;
    case FETCH_ROOMS_SUCCESS: {
      const rooms = action.rooms.map(room => ({
        ...room,
        customerName: room.customer
          ? `${room.customer.firstName} ${room.customer.lastName}`
          : null,
        status: mapToRoomStatus(room.status),
      }));
      return state.merge({ rooms, hasLoaded: true });
    }
    case DELETE_ROOM_ERROR:
      return state;
    case DELETE_ROOM_SUCCESS:
      return state.update('rooms', rooms =>
        rooms.filter(room => room.get('id') !== action.id)
      );
    case CHECK_IN_ERROR:
      return state;
    case CHECK_IN_SUCCESS: {
      const { id, checkInTime, status } = action.data;
      return state
        .update('rooms', rooms =>
          rooms.update(rooms.findIndex(room => room.get('id') === id), room =>
            room.set('status', status).set('checkInTime', checkInTime)
          )
        )
        .set('shouldDisplayRoomOptionsModal', false);
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
        activeRoomCustomerId: action.customerId,
        activeRoomCustomerName: action.customerName,
        activeRoomNumber: action.room,
        activeRoomIndex: action.index,
        activeStayId: action.stayId,
        shouldDisplayRoomOptionsModal: true,
      });

    case HANDLE_INPUT_CHANGE:
      return state.set(action.key, action.value);

    case CREATE_ROOM_SUCCESS: {
      const rooms = state.get('rooms').toJS();
      const newRoom = {
        ...action.room,
        status: mapToRoomStatus(action.room.status),
      };
      rooms.push(newRoom);
      return state.merge({
        addRoomInput: '',
        shouldDisplayAddRoomModal: false,
        rooms,
      });
    }

    case SOCKET_CREATE_BOOKING: {
      return console.log('the booking: ', action.booking);
    }

    default:
      return state;
  }
}

export default frontDeskReducer;
