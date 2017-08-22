/*
 *
 * TeamManagement actions
 *
 */

import { FETCH_EMPLOYEES } from './constants';

export function getEmployees(hotelId) {
  return {
    type: FETCH_EMPLOYEES,
    hotelId,
  };
}
