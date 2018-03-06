/*
 *
 * Settings reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INIT,
  EDIT_USER,
  RESET_USER_TEMPORARY,
  DISPLAY_CONFIRM_UNDO,
} from './constants';

const initialState = fromJS({
  hasLoaded: false,
  isDirty: false,
  userTemporary: {},
  shouldDisplayConfirmationModal: false,
});

function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return state.merge({
        hasLoaded: true,
        userTemporary: {
          ...action.user.toJS(),
          oldPassword: '',
          newPassword: '',
        },
      });

    case EDIT_USER:
      console.log('action? ', action.key, action.value);
      return state
        .set('isDirty', true)
        .setIn(['userTemporary', action.key], action.value);

    case RESET_USER_TEMPORARY:
      return state.merge({
        userTemporary: action.user,
        shouldDisplayConfirmationModal: false,
        isDirty: false,
      });

    case DISPLAY_CONFIRM_UNDO:
      return state.merge({
        shouldDisplayConfirmationModal: action.bool,
      });

    default:
      return state;
  }
}

export default settingsReducer;
