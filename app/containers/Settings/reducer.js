/*
 *
 * Settings reducer
 *
 */

import { fromJS } from 'immutable';
import { DISPLAY_CONFIRM_UNDO } from './constants';

const initialState = fromJS({
  shouldDisplayConfirmationModal: false,
});

function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_CONFIRM_UNDO:
      return state.merge({
        shouldDisplayConfirmationModal: action.bool,
      });

    default:
      return state;
  }
}

export default settingsReducer;
