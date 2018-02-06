import { combineEpics } from 'redux-observable';
import {
  loadUsersEpic,
  createUserEpic,
  deleteUserEpic,
  navigateToUsersOnSuccessEpic,
  createUserToastEpic,
  deleteUserToastEpic
} from './UsersEpics';
import { loadUserDetailsEpic } from './UserDetailsEpics';
import { editUserEpic, navigateToUsersOnEditEpic, editUserToastEpic } from './EditUserEpics';

export const usersEpics = combineEpics(
  loadUsersEpic,
  createUserEpic,
  deleteUserEpic,
  navigateToUsersOnSuccessEpic,
  loadUserDetailsEpic,
  editUserEpic,
  navigateToUsersOnEditEpic,
  editUserToastEpic,
  createUserToastEpic,
  deleteUserToastEpic
);