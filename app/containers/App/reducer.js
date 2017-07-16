/*
 *
 * Global reducer
 *
 */

import { fromJS } from 'immutable';
import { INVALIDATE_TOKEN, SET_BOTTOM_NAV_ITEMS, LOGOUT } from './constants';
import { SUCCESS } from '../LoginPage/constants';

const mapViewToItems = {
  dashboard: [
    {
      name: 'Front Desk',
      path: '/',
    },
    {
      name: 'Previous Stays',
      path: '/previousstays',
    },
  ],
  account: [
    {
      name: 'Settings',
      path: '/settings',
    },
    {
      name: 'Hotel Profile',
      path: '/hotelprofile',
    },
    {
      name: 'Team Management',
      path: '/teammanagement',
    },
  ],
};

const initialState = fromJS({
  hasLoaded: false,
  user: null,
  bottomNavItems: mapViewToItems.dashboard,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BOTTOM_NAV_ITEMS: {
      const bottomNavItems = mapViewToItems[action.view];
      return state.merge({ bottomNavItems });
    }

    case INVALIDATE_TOKEN:
      return state.set('hasLoaded', true);

    case SUCCESS:
      window.localStorage.accessToken = action.token;
      return state.set('hasLoaded', true).set('user', action.user);

    case LOGOUT:
      delete window.localStorage.accessToken;
      return state.set('user', null);

    default:
      return state;
  }
}

export default appReducer;
