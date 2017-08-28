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
  SET_ADD_MEMBER_OPTIONS,
  DELETE_EMPLOYEE_SUCCESS,
} from './constants';

const initialState = fromJS({
  hasLoaded: false,
  membersList: [],
  previewedMember: null,
  previewedMemberIndex: null,
  confirmationModalOptions: {
    shouldDisplay: false,
    modalPromptId: '',
  },
  addMemberModalOptions: {
    shouldDisplay: false,
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
      if (state.get('previewedMemberIndex') === action.index) {
        return state
          .set('previewedMember', null)
          .set('previewedMemberIndex', null);
      }
      const selectedMember = state.getIn(['membersList', action.index]);
      return state
        .set('previewedMember', selectedMember)
        .set('previewedMemberIndex', action.index);
    }
    case SET_CONFIRMATION_OPTIONS:
      return state.merge({
        confirmationModalOptions: action.options,
      });

    case SET_ADD_MEMBER_OPTIONS:
      return state.merge({
        addMemberModalOptions: action.options,
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

    case DELETE_EMPLOYEE_SUCCESS: {
      const membersList = state.get('membersList').toJS();
      const memberIdx = membersList.findIndex(
        member => member.id * 1 === action.employeeId
      );
      membersList.splice(memberIdx, 1);
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
