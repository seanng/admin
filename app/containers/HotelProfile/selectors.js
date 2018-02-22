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

export const selectEditedHotelInfo = () =>
  createSelector(selectHotelProfileDomain(), substate =>
    substate.get('editedHotelInfo')
  );

export const selectHasLoaded = () =>
  createSelector(selectHotelProfileDomain(), substate =>
    substate.get('hasLoaded')
  );

export const selectIsEditingMode = () =>
  createSelector(selectHotelProfileDomain(), substate =>
    substate.get('isEditingMode')
  );

export const selectIsAmenitiesModalOpen = () =>
  createSelector(selectHotelProfileDomain(), substate =>
    substate.get('isAmenitiesModalOpen')
  );

export const selectSelectedAmenities = () =>
  createSelector(selectHotelProfileDomain(), substate =>
    substate.get('selectedAmenities')
  );

const makeSelectHotelProfile = () =>
  createSelector(selectHotelProfileDomain(), substate => substate.toJS());

export default makeSelectHotelProfile;
export { selectHotelProfileDomain };
