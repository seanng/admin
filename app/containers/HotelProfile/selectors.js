import { createSelector } from 'reselect';

/**
 * Direct selector to the hotelProfile state domain
 */
const selectHotelProfileDomain = () => state => state.get('hotelProfile');

/**
 * Other specific selectors
 */

/**
 * Default selector used by HotelProfile
 */

export const selectHotelInfo = () =>
  createSelector(selectHotelProfileDomain(), substate =>
    substate.get('hotelInfo')
  );

const makeSelectHotelProfile = () =>
  createSelector(selectHotelProfileDomain(), substate => substate.toJS());

export default makeSelectHotelProfile;
export { selectHotelProfileDomain };
