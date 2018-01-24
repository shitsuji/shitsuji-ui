import { combineEpics } from 'redux-observable';
import { loadUsersEpic, createUserEpic, deleteUserEpic, navigateToUsersOnSuccessEpic } from './UsersEpics';
import { loadUserDetailsEpic } from './UserDetailsEpics';
import { editUserEpic, navigateToUsersOnEditEpic } from './EditUserEpics';

export const usersEpics = combineEpics(
  loadUsersEpic,
  createUserEpic,
  deleteUserEpic,
  navigateToUsersOnSuccessEpic,
  loadUserDetailsEpic,
  editUserEpic,
  navigateToUsersOnEditEpic
);