/*
 *
 * PastStays actions
 *
 */

import {
  FETCH_STAYS,
  FETCH_CHARGES,
  CLOSE_MODAL,
  CHANGE_INPUT,
  ADD_CHARGE,
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

export function changeInput(key, value) {
  return {
    type: CHANGE_INPUT,
    key,
    value,
  };
}

export function addCharge(charge) {
  return {
    type: ADD_CHARGE,
    charge,
  };
}
