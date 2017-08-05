/*
 *
 * PastStays actions
 *
 */

import {
  FETCH_STAYS,
  FETCH_CHARGES,
  CLOSE_MODAL,
  HANDLE_INPUT_CHANGE,
} from './constants';

export function fetchStays() {
  return {
    type: FETCH_STAYS,
  };
}

export function fetchCharges(stayId) {
  return {
    type: FETCH_CHARGES,
    stayId,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}

export function handleInputChange(key, value) {
  return {
    type: HANDLE_INPUT_CHANGE,
    key,
    value,
  };
}
