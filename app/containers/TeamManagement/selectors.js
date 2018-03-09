import { createSelector } from 'reselect';
import { isValid } from 'redux-form/immutable';

/**
 * Direct selector to the teamManagement state domain
 */
const selectTeamManagementDomain = () => state => state.get('teamManagement');

export const selectFormDomain = () => state => state.get('form');
export const selectIsFormValid = () => state => isValid('addMember')(state);

/**
 * Other specific selectors
 */

export const selectHasLoaded = () =>
  createSelector(selectTeamManagementDomain(), substate =>
    substate.get('hasLoaded')
  );

export const selectMembersList = () =>
  createSelector(selectTeamManagementDomain(), substate =>
    substate.get('membersList')
  );

export const selectPreviewedMember = () =>
  createSelector(selectTeamManagementDomain(), substate =>
    substate.get('previewedMember')
  );

export const selectConfirmationModalOptions = () =>
  createSelector(selectTeamManagementDomain(), substate =>
    substate.get('confirmationModalOptions')
  );

export const selectShouldDisplayAddMemberModal = () =>
  createSelector(selectTeamManagementDomain(), substate =>
    substate.get('shouldDisplayAddMemberModal')
  );

/**
 * Default selector used by TeamManagement
 */

const makeSelectTeamManagement = () =>
  createSelector(selectTeamManagementDomain(), substate => substate.toJS());

export default makeSelectTeamManagement;
export { selectTeamManagementDomain };
