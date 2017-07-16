import {
  CHECK_AUTH,
  INVALIDATE_TOKEN,
  SET_BOTTOM_NAV_ITEMS,
  LOGOUT,
} from './constants';

export function checkAuth(token) {
  return {
    type: CHECK_AUTH,
    token,
  };
}

export function invalidateToken() {
  return {
    type: INVALIDATE_TOKEN,
  };
}

export function setBottomNavItems(view) {
  return {
    type: SET_BOTTOM_NAV_ITEMS,
    view,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
