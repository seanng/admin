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

export const selectActiveFilter = () =>
  createSelector(selectFrontDeskDomain(), substate =>
    substate.get('activeFilter')
  );

export const selectAddRoomInput = () =>
  createSelector(selectFrontDeskDomain(), substate =>
    substate.get('addRoomInput')
  );

export const selectShouldDisplayAddRoomModal = () =>
  createSelector(selectFrontDeskDomain(), substate =>
    substate.get('shouldDisplayAddRoomModal')
  );

export const selectShouldDisplayRoomOptionsModal = () =>
  createSelector(selectFrontDeskDomain(), substate =>
    substate.get('shouldDisplayRoomOptionsModal')
  );

export const selectActiveRoomStatus = () =>
  createSelector(selectFrontDeskDomain(), substate =>
    substate.get('activeRoomStatus')
  );

export const selectActiveRoomNumber = () =>
  createSelector(selectFrontDeskDomain(), substate =>
    substate.get('activeRoomNumber')
  );

export const selectActiveRoomGuest = () =>
  createSelector(selectFrontDeskDomain(), substate =>
    substate.get('activeRoomGuest')
  );

/**
 * Default selector used by FrontDesk
 */

const makeSelectFrontDesk = () =>
  createSelector(selectFrontDeskDomain(), substate => substate.toJS());

export default makeSelectFrontDesk;
