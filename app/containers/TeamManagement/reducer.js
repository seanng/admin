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
  SET_ADMIN_SUCCESS,
  SET_CONFIRMATION_OPTIONS,
} from './constants';

const initialState = fromJS({
  hasLoaded: false,
  membersList: [],
  previewedMember: null,
  confirmationModalOptions: {
    shouldDisplay: false,
    modalPromptId: '',
  },
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
    case SET_CONFIRMATION_OPTIONS:
      return state.merge({
        confirmationModalOptions: action.options,
      });

    case SET_ADMIN_SUCCESS: {
      const membersList = state.get('membersList').toJS();
      const memberIdx = membersList.findIndex(
        member => member.id * 1 === action.employeeId
      );
      membersList[memberIdx].adminLevel = 2;
      return state.merge({
        membersList,
        confirmationModalOptions: {
          shouldDisplay: false,
          modalPromptId: '',
        },
        previewedMember: membersList[memberIdx],
      });
    }

    default:
      return state;
  }
}

export default teamManagementReducer;
