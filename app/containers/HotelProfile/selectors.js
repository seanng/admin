import { createSelector } from 'reselect';
import { isDirty, isValid } from 'redux-form/immutable';

/**
 * Direct selector to the hotelProfile state domain
 */
const selectHotelProfileDomain = () => state => state.get('hotelProfile');

/**
 * Form selectors
 */

export const selectIsFormDirty = () => state => isDirty('hotelProfile')(state);
export const selectIsFormValid = () => state => isValid('hotelProfile')(state);
export const selectFormDomain = () => state => state.get('form');

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
