/*
 *
 * TeamManagement reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FETCH_EMPLOYEES,
  FETCH_EMPLOYEES_SUCCESS,
  SET_MEMBER_TO_PREVIEW,
  SET_ADMIN_SUCCESS,
  SET_CONFIRMATION_OPTIONS,
  DELETE_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_SUCCESS,
  TOGGLE_ADD_MEMBER_MODAL,
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
  shouldDisplayAddMemberModal: false,
});

function teamManagementReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return state.set('hasLoaded', false);

    case FETCH_EMPLOYEES_SUCCESS:
      return state.merge({
        hasLoaded: true,
        membersList: action.employees,
        previewedMemberIndex: 0,
        previewedMember: action.employees[0],
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

    case SET_ADMIN_SUCCESS: {
      const oldMembersList = state.get('membersList');
      const memberIdx = oldMembersList.findIndex(
        member => member.get('id') === action.employeeId
      );
      const membersList = oldMembersList.setIn([memberIdx, 'adminLevel'], 2);
      return state.merge({
        membersList,
        confirmationModalOptions: {
          shouldDisplay: false,
          modalPromptId: '',
        },
        previewedMember: membersList.get(memberIdx),
      });
    }

    case DELETE_EMPLOYEE_SUCCESS: {
      const oldMembersList = state.get('membersList');
      const getIndexOfId = member => member.get('id') === action.employeeId;
      const memberIdx = oldMembersList.findIndex(getIndexOfId);
      const membersList = oldMembersList.delete(memberIdx);
      return state.merge({
        membersList,
        confirmationModalOptions: {
          shouldDisplay: false,
          modalPromptId: '',
        },
        previewedMember: membersList.get(memberIdx),
      });
    }

    case TOGGLE_ADD_MEMBER_MODAL:
      return state.set('shouldDisplayAddMemberModal', action.shouldDisplay);

    case ADD_EMPLOYEE_SUCCESS: {
      return state.merge({
        addMemberModalOptions: {
          shouldDisplay: false,
        },
        membersList: action.employees,
      });
    }

    default:
      return state;
  }
}

export default teamManagementReducer;
