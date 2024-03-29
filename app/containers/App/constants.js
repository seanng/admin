/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHECK_AUTH = 'H_IO_CHECK_AUTH';

export const DEFAULT_LOCALE = 'en';

export const SOCKET_CONNECTION_ESTABLISHED = 'SOCKET_CONNECTION_ESTABLISHED';

export const VALIDATE_TOKEN = 'app/app/VALIDATE_TOKEN';
export const INVALIDATE_TOKEN = 'app/app/INVALIDATE_TOKEN';
export const SET_BOTTOM_NAV_ITEMS = 'app/app/SET_BOTTOM_NAV_ITEMS';
export const LOGOUT = 'app/app/LOGOUT';
