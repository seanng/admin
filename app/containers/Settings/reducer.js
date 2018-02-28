/*
 *
 * Settings reducer
 *
 */

import { fromJS } from 'immutable';
import { INIT, EDIT_USER } from './constants';

const initialState = fromJS({
  hasLoaded: false,
  userTemporary: {},
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
      });

    default:
      return state;
  }
}

export default settingsReducer;
