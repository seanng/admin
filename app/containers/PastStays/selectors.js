import { createSelector } from 'reselect';

/**
 * Direct selector to the pastStays state domain
 */
const selectPastStaysDomain = () => state => state.get('pastStays');

/**
 * Other specific selectors
 */

export const selectHasLoaded = () =>
  createSelector(selectPastStaysDomain(), substate =>
    substate.get('hasLoaded')
  );

export const selectStays = () =>
  createSelector(selectPastStaysDomain(), substate => substate.get('stays'));

export const selectIsModalOpen = () =>
  createSelector(selectPastStaysDomain(), substate =>
    substate.get('isModalOpen')
  );

/**
 * Default selector used by PastStays
 */

const makeSelectPastStays = () =>
  createSelector(selectPastStaysDomain(), substate => substate.toJS());

export default makeSelectPastStays;
