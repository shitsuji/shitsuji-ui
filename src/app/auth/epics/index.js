import { combineEpics } from 'redux-observable';
import { loginEpic, tokenEpic, removeTokenEpic } from './AuthEpics';

export const authEpics = combineEpics(
  loginEpic,
  tokenEpic,
  removeTokenEpic
);