/*
 *
 * TeamManagement reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  FETCH_EMPLOYEES,
  FETCH_EMPLOYEES_SUCCESS,
} from './constants';

const initialState = fromJS({
  hasLoaded: false,
  membersList: [],
});

function teamManagementReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_EMPLOYEES:
      return state.set('hasLoaded', false);
    case FETCH_EMPLOYEES_SUCCESS: {
      const membersList = action.employees;
      console.log('memberslist:', membersList);
      return state.merge({
        hasLoaded: true,
        membersList,
      });
    }
    default:
      return state;
  }
}

export default teamManagementReducer;
