/*
 *
 * Settings actions
 *
 */

import { DISPLAY_CONFIRM_UNDO } from './constants';

export function displayConfirmUndo(bool) {
  return {
    type: DISPLAY_CONFIRM_UNDO,
    bool,
  };
}
