/*
 *
 * Settings actions
 *
 */

import {
  INIT,
  EDIT_USER,
  RESET_USER_TEMPORARY,
  DISPLAY_CONFIRM_DISCARD,
} from './constants';

export function init(user) {
  return {
    type: INIT,
    user,
  };
}

export function editUser(options) {
  return {
    type: EDIT_USER,
    options,
  };
}

export function resetUserTemporary(user) {
  return {
    type: RESET_USER_TEMPORARY,
    user,
  };
}

export function displayConfirmDiscard(bool) {
  return {
    type: DISPLAY_CONFIRM_DISCARD,
    bool,
  };
}
