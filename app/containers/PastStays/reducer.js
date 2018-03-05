/*
 *
 * PastStays reducer
 *
 */

import { fromJS, Map } from 'immutable';
import { SOCKET_CHECK_OUT } from 'containers/FrontDesk/constants';
import {
  FETCH_CHARGES,
  FETCH_STAYS_SUCCESS,
  FETCH_CHARGES_SUCCESS,
  CLOSE_MODAL,
  HANDLE_INPUT_CHANGE,
  ADD_CHARGE,
  SAVE_CHARGES_SUCCESS,
} from './constants';

const initialState = fromJS({
  hasLoaded: false,
  stay: {},
  stays: [],
  charges: [],
  isModalOpen: false,
  serviceInput: '',
  priceInput: '',
});

function pastStaysReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STAYS_SUCCESS: {
      const stays = action.stays.map(stay => ({
        id: stay.id,
        bookingTime: stay.bookingTime,
        checkInTime: stay.checkInTime,
        checkOutTime: stay.checkOutTime,
        costCurrency: stay.hotel.costCurrency,
        customerName: `${stay.customer.firstName} ${stay.customer.lastName}`,
        roomNumber: stay.roomNumber,
        roomCharge: stay.roomCharge,
        totalCharge: stay.totalCharge,
      }));
      return state.merge({
        hasLoaded: true,
        stays,
      });
    }

    case FETCH_CHARGES: {
      const stays = state.get('stays');
      const stayIndex = stays.findIndex(
        stay => stay.get('id') === action.stayId
      );
      return state.set('stay', stays.get(stayIndex));
    }

    case FETCH_CHARGES_SUCCESS: {
      return state.merge({
        isModalOpen: true,
        charges: action.charges,
      });
    }

    case CLOSE_MODAL:
      return state.set('isModalOpen', false);

    case HANDLE_INPUT_CHANGE:
      return state.set(action.key, action.value);

    case ADD_CHARGE:
      return state.update('charges', charges =>
        charges.set(charges.size, Map(action.charge))
      );

    case SAVE_CHARGES_SUCCESS: {
      const charges = action.updatedCharges.map(charge => {
        charge.updated = true;
        return charge;
      });
      const stays = state.get('stays').toJS();
      const idx = stays.findIndex(stay => stay.id === action.stayId);
      stays[idx].totalCharge = action.newTotal;
      return state.merge({ charges, stays, isModalOpen: false });
    }

    case SOCKET_CHECK_OUT:
      return state.update('stays', stays =>
        stays.set(stays.size, Map(action.data))
      );

    default:
      return state;
  }
}

export default pastStaysReducer;
