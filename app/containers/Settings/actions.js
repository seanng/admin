/*
 *
 * Settings actions
 *
 */

import { INIT, EDIT_USER } from './constants';

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
