/*
 *
 * PastStays reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  FETCH_CHARGES,
  FETCH_STAYS_SUCCESS,
  FETCH_CHARGES_SUCCESS,
  CLOSE_MODAL,
  CHANGE_INPUT,
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
    case FETCH_STAYS_SUCCESS:
      return state.merge({
        hasLoaded: true,
        stays: action.stays,
      });

    case FETCH_CHARGES: {
      const stays = state.get('stays');
      const stayIndex = stays.findIndex(
        stay => stay.get('id') === action.stayId
      );
      return state.set('stay', stays.get(stayIndex));
    }

    case FETCH_CHARGES_SUCCESS: {
      const charges = action.charges.map(charge => {
        charge.updated = true;
        return charge;
      });
      return state.merge({
        isModalOpen: true,
        charges,
      });
    }

    case CLOSE_MODAL:
      return state.set('isModalOpen', false);

    case CHANGE_INPUT:
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

    default:
      return state;
  }
}

export default pastStaysReducer;
