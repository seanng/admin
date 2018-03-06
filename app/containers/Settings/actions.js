/*
 *
 * Settings actions
 *
 */

import {
  INIT,
  EDIT_USER,
  RESET_USER_TEMPORARY,
  DISPLAY_CONFIRM_UNDO,
} from './constants';

export function init(user) {
  return {
    type: INIT,
    user,
  };
}

export function editUser(key, value) {
  return {
    type: EDIT_USER,
    key,
    value,
  };
}

export function resetUserTemporary(user) {
  return {
    type: RESET_USER_TEMPORARY,
    user,
  };
}

export function displayConfirmUndo(bool) {
  return {
    type: DISPLAY_CONFIRM_UNDO,
    bool,
  };
}
