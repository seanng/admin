/*
 *
 * PastStays actions
 *
 */

import { FETCH_STAYS } from './constants';

export function fetchStays() {
  return {
    type: FETCH_STAYS,
  };
}
