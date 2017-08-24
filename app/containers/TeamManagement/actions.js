/*
 *
 * TeamManagement actions
 *
 */

import { FETCH_EMPLOYEES, SET_MEMBER_TO_PREVIEW } from './constants';

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
