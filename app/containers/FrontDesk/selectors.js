import { createSelector } from 'reselect';

/**
 * Direct selector to the frontDesk state domain
 */
const selectFrontDeskDomain = () => state => state.get('frontDesk');

/**
 * Other specific selectors
 */

export const selectRooms = () =>
  createSelector(selectFrontDeskDomain(), substate => substate.get('rooms'));

export const selectHasLoaded = () =>
  createSelector(selectFrontDeskDomain(), substate =>
    substate.get('hasLoaded')
  );

/**
 * Default selector used by FrontDesk
 */

const makeSelectFrontDesk = () =>
  createSelector(selectFrontDeskDomain(), substate => substate.toJS());

export default makeSelectFrontDesk;
