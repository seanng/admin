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
  SET_MEMBER_TO_PREVIEW,
} from './constants';

const initialState = fromJS({
  hasLoaded: false,
  membersList: [],
  previewedMember: {},
});

function teamManagementReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_EMPLOYEES:
      return state.set('hasLoaded', false);
    case FETCH_EMPLOYEES_SUCCESS:
      return state.merge({
        hasLoaded: true,
        membersList: action.employees,
      });
    case SET_MEMBER_TO_PREVIEW: {
      const selectedMember = state.getIn(['membersList', action.index]);
      return state.set('previewedMember', selectedMember);
    }

    default:
      return state;
  }
}

export default teamManagementReducer;
