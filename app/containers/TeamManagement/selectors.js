import { createSelector } from 'reselect';

/**
 * Direct selector to the teamManagement state domain
 */
const selectTeamManagementDomain = () => state => state.get('teamManagement');

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

/**
 * Default selector used by TeamManagement
 */

const makeSelectTeamManagement = () =>
  createSelector(selectTeamManagementDomain(), substate => substate.toJS());

export default makeSelectTeamManagement;
export { selectTeamManagementDomain };
