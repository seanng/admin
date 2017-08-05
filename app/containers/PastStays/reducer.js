/*
 *
 * PastStays reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FETCH_CHARGES,
  FETCH_STAYS_SUCCESS,
  FETCH_CHARGES_SUCCESS,
  CLOSE_MODAL,
  HANDLE_INPUT_CHANGE,
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

    case HANDLE_INPUT_CHANGE:
      console.log('action.key', action.key, action.value);
      return state.set(action.key, action.value);

    default:
      return state;
  }
}

export default pastStaysReducer;
