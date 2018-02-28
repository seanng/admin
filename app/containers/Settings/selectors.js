import { createSelector } from 'reselect';

/**
 * Direct selector to the settings state domain
 */
const selectSettingsDomain = () => state => state.get('settings');

/**
 * Other specific selectors
 */

export const selectHasLoaded = () =>
  createSelector(selectSettingsDomain(), substate => substate.get('hasLoaded'));

export const selectIsDirty = () =>
  createSelector(selectSettingsDomain(), substate => substate.get('isDirty'));

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
