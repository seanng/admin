import { createSelector } from 'reselect';

// makeSelectLocationState expects a plain JS object for the routing state
export const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return state => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const selectGlobalDomain = () => state => state.get('global');

export const selectUser = () =>
  createSelector(selectGlobalDomain(), substate => substate.get('user'));

export const selectBottomNavItems = () =>
  createSelector(selectGlobalDomain(), substate =>
    substate.get('bottomNavItems')
  );

export const selectHasLoaded = () =>
  createSelector(selectGlobalDomain(), substate => substate.get('hasLoaded'));

export const selectHotelId = () =>
  createSelector(selectUser(), user => user.get('hotelId'));

const makeSelectGlobal = () =>
  createSelector(selectGlobalDomain(), substate => substate.toJS());

export default makeSelectGlobal;
