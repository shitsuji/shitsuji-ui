// @flow
import { UsersState, UserDetailsState } from './models';

export const USERS_PATH = '/users';
export const CREATE_USER_PATH = `${USERS_PATH}/create`;

export const USERS_INITIAL_STATE: UsersState = {
  pending: true,
  users: null
};

export const USER_DETAILS_INITIAL_STATE: UserDetailsState = {
  pending: true,
  user: null
};
