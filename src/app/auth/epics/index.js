import { combineEpics } from 'redux-observable';
import { loginEpic, tokenEpic, removeTokenEpic, authToastEpic } from './AuthEpics';

export const authEpics = combineEpics(
  loginEpic,
  tokenEpic,
  removeTokenEpic,
  authToastEpic
);