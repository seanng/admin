import { createSelector } from 'reselect';
import { isValid } from 'redux-form/immutable';

/**
 * Direct selector to the loginPage state domain
 */
const selectLoginPageDomain = () => state => state.get('loginPage');

/**
 * Form selectors
 */

export const selectIsFormValid = () => state => isValid('login')(state);
export const selectFormDomain = () => state => state.get('form');

/**
 * Default selector used by LoginPage
 */

export const selectLoginErrorMsg = () =>
  createSelector(selectLoginPageDomain(), substate => substate.get('error'));

export { selectLoginPageDomain };
