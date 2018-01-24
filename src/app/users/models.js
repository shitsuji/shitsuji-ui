// @flow
import { Record } from '../models';

export interface UserCreateData {
  login: string;
  password?: string;
}

export interface User extends UserCreateData, Record {
  createdAt: Date;
}

export interface UsersState {
  users: ?User[];
  pending: boolean;
}

export interface UserDetailsState {
  user: ?User;
  pending: boolean;
}