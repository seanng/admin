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
  ADD_CHARGE,
  SAVE_CHARGES,
} from './constants';

export function fetchStays(hotelId) {
  return {
    type: FETCH_STAYS,
    hotelId,
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

export function addCharge(charge) {
  return {
    type: ADD_CHARGE,
    charge,
  };
}

export function saveCharges(charges, newTotal, stayId) {
  return {
    type: SAVE_CHARGES,
    charges,
    newTotal,
    stayId,
  };
}
