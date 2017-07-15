import { createSelector } from 'reselect';

// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
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

const makeSelectGlobal = state => state.get('global');

// substates

const selectHasLoaded = () =>
  createSelector(makeSelectGlobal, substate => substate.get('hasLoaded'));

const selectUser = () =>
  createSelector(makeSelectGlobal, substate => substate.get('user'));

export { makeSelectLocationState, selectUser, selectHasLoaded };
