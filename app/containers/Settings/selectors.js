import { createSelector } from 'reselect';
import { isDirty, isValid } from 'redux-form/immutable';

/**
 * Direct selector to the settings state domain
 */
const selectSettingsDomain = () => state => state.get('settings');

/**
 * Form selectors
 */

export const selectIsFormDirty = () => state => isDirty('settings')(state);
export const selectIsFormValid = () => state => isValid('settings')(state);
export const selectFormDomain = () => state => state.get('form');

/**
 * Other specific selectors
 */

export const selectShouldDisplayConfirmationModal = () =>
  createSelector(selectSettingsDomain(), substate =>
    substate.get('shouldDisplayConfirmationModal')
  );

/**
 * Default selector used by Settings
 */

const makeSelectSettings = () =>
  createSelector(selectSettingsDomain(), substate => substate.toJS());

export default makeSelectSettings;
