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
  DISPLAY_CONFIRM_DISCARD,
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
        userTemporary: action.user,
      });

    case EDIT_USER:
      return state.merge({
        userTemporary: action.options,
        isDirty: true,
      });

    case RESET_USER_TEMPORARY:
      return state.merge({
        userTemporary: action.user,
        shouldDisplayConfirmationModal: false,
        isDirty: false,
      });

    case DISPLAY_CONFIRM_DISCARD:
      return state.merge({
        shouldDisplayConfirmationModal: action.bool,
      });

    default:
      return state;
  }
}

export default settingsReducer;
