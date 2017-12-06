import { CHECK_AUTH, INVALIDATE_TOKEN, LOGOUT } from './constants';

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

export function logout() {
  return {
    type: LOGOUT,
  };
}
