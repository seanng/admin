/*
 *
 * Global reducer
 *
 */

import { fromJS } from 'immutable';
import { INVALIDATE_TOKEN, SET_BOTTOM_NAV_ITEMS, LOGOUT } from './constants';
import { SUCCESS } from '../LoginPage/constants';

const mapPathToSection = {
  '/': 'dashboard',
  '/paststays': 'dashboard',
  '/hotelprofile': 'account',
  '/teammanagement': 'account',
};

const mapSectionToItems = {
  dashboard: [
    {
      name: 'Front Desk',
      path: '/',
    },
    {
      name: 'Past Stays',
      path: '/paststays',
    },
  ],
  account: [
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
  bottomNavItems: mapSectionToItems.dashboard,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BOTTOM_NAV_ITEMS: {
      const sectionKey = mapPathToSection[action.view];
      const bottomNavItems = mapSectionToItems[sectionKey];
      return state.merge({ bottomNavItems });
    }

    case INVALIDATE_TOKEN:
      return state.set('hasLoaded', true);

    case SUCCESS:
      window.localStorage.accessToken = action.token;
      return state.merge({
        hasLoaded: true,
        user: action.user,
      });

    case LOGOUT:
      delete window.localStorage.accessToken;
      return state.set('user', null);

    default:
      return state;
  }
}

export default appReducer;
