// @flow
import { AuthState } from './models';

export const TOKEN_KEY = 'shitsuji-token';
export const AUTH_PATH = '/auth';

export const AUTH_INITIAL_STATE: AuthState = {
  pending: false,
  token: localStorage.getItem(TOKEN_KEY),
  user: null
};
