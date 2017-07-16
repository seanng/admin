/*
 *
 * LoginPage actions
 *
 */

import { LOG_IN, HANDLE_INPUT_CHANGE } from './constants';

export function logIn(info) {
  return {
    type: LOG_IN,
    info,
  };
}

export function handleInputChange(key, value) {
  return {
    type: HANDLE_INPUT_CHANGE,
    key,
    value,
  };
}
