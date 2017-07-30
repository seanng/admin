/*
 *
 * PastStays reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FETCH_STAYS_SUCCESS,
  FETCH_CHARGES_SUCCESS,
  CLOSE_MODAL,
} from './constants';

const initialState = fromJS({
  hasLoaded: false,
  stays: [],
  charges: [],
  isModalOpen: false,
});

function pastStaysReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STAYS_SUCCESS:
      return state.merge({
        hasLoaded: true,
        stays: action.stays,
      });
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

    default:
      return state;
  }
}

export default pastStaysReducer;
