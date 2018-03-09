/*
 *
 * TeamManagement actions
 *
 */

import {
  FETCH_EMPLOYEES,
  SET_MEMBER_TO_PREVIEW,
  SET_ADMIN,
  SET_CONFIRMATION_OPTIONS,
  TOGGLE_ADD_MEMBER_MODAL,
  DELETE_EMPLOYEE,
  ADD_EMPLOYEE,
} from './constants';

export function getEmployees(hotelId) {
  return {
    type: FETCH_EMPLOYEES,
    hotelId,
  };
}

export function setMemberToPreview(index) {
  return {
    type: SET_MEMBER_TO_PREVIEW,
    index,
  };
}

export function setAdmin(employeeId) {
  return {
    type: SET_ADMIN,
    employeeId,
  };
}

export function deleteEmployee(employeeId) {
  return {
    type: DELETE_EMPLOYEE,
    employeeId,
  };
}

export function setConfirmationOptions(options) {
  return {
    type: SET_CONFIRMATION_OPTIONS,
    options,
  };
}

export function toggleAddMemberModal(shouldDisplay) {
  return {
    type: TOGGLE_ADD_MEMBER_MODAL,
    shouldDisplay,
  };
}

export function addEmployee(details, hotelId, userId) {
  return {
    type: ADD_EMPLOYEE,
    details,
    hotelId,
    userId,
  };
}
