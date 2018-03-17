/*
 *
 * Settings actions
 *
 */

import {
  DISPLAY_CONFIRM_UNDO,
  ERASE_EMPLOYEE_PHOTO,
  SAVE_EMPLOYEE_PROFILE,
} from './constants';

export function displayConfirmUndo(bool) {
  return {
    type: DISPLAY_CONFIRM_UNDO,
    bool,
  };
}

export function eraseEmployeePhoto(photo) {
  return {
    type: ERASE_EMPLOYEE_PHOTO,
    photo,
  };
}

export function saveEmployeeProfile(profile, shouldHandleImageBlob) {
  return {
    type: SAVE_EMPLOYEE_PROFILE,
    profile,
    shouldHandleImageBlob,
  };
}
