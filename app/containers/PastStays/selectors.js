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

export const selectStay = () =>
  createSelector(selectPastStaysDomain(), substate => substate.get('stay'));

export const selectServiceInput = () =>
  createSelector(selectPastStaysDomain(), substate =>
    substate.get('serviceInput')
  );

export const selectPriceInput = () =>
  createSelector(selectPastStaysDomain(), substate =>
    substate.get('priceInput')
  );

export const selectCharges = () =>
  createSelector(selectPastStaysDomain(), substate => substate.get('charges'));

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
