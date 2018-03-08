import { createSelector } from 'reselect';
import { isDirty } from 'redux-form/immutable';

/**
 * Direct selector to the settings state domain
 */
const selectSettingsDomain = () => state => state.get('settings');

/**
 * Direct selector to the form state domain
 */

export const selectIsFormDirty = () => state => isDirty('settings')(state);

export const selectFormDomain = () => state => state.get('form');

/**
 * Other specific selectors
 */

export const selectShouldDisplayConfirmationModal = () =>
  createSelector(selectSettingsDomain(), substate =>
    substate.get('shouldDisplayConfirmationModal')
  );

export const selectUserTemporary = () =>
  createSelector(selectSettingsDomain(), substate =>
    substate.get('userTemporary')
  );

/**
 * Default selector used by Settings
 */

const makeSelectSettings = () =>
  createSelector(selectSettingsDomain(), substate => substate.toJS());

export default makeSelectSettings;
